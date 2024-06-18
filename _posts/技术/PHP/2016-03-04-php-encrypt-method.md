---
layout: post
title: 几种常见的PHP加密算法
description: 几种常见的PHP加密算法
category: php
tags: [PHP,encrypt]
date: 2016-03-04
---

##Discuz authcode

    <?php
        /** 
         * $string 明文或密文
         * $operation 加密ENCODE或解密DECODE
         * $key 密钥
         * $expiry 密钥有效期
         */
        function authcode($string, $operation = 'DECODE', $key = '', $expiry = 0) {
            // 动态密匙长度，相同的明文会生成不同密文就是依靠动态密匙
            // 加入随机密钥，可以令密文无任何规律，即便是原文和密钥完全相同，加密结果也会每次不同，增大破解难度。
            // 取值越大，密文变动规律越大，密文变化 = 16 的 $ckey_length 次方
            // 当此值为 0 时，则不产生随机密钥
            $ckey_length = 4;
            // 密匙
            // $GLOBALS['discuz_auth_key'] 这里可以根据自己的需要修改
            $key = md5($key ? $key : $GLOBALS['discuz_auth_key']);
            // 密匙a会参与加解密
            $keya = md5(substr($key, 0, 16));
            // 密匙b会用来做数据完整性验证
            $keyb = md5(substr($key, 16, 16));
            // 密匙c用于变化生成的密文
            $keyc = $ckey_length ? ($operation == 'DECODE' ? substr($string, 0, $ckey_length) : substr(md5(microtime()) , -$ckey_length)) : '';
            // 参与运算的密匙
            $cryptkey = $keya . md5($keya . $keyc);
            $key_length = strlen($cryptkey);
            // 明文，前10位用来保存时间戳，解密时验证数据有效性，10到26位用来保存$keyb(密匙b)，解密时会通过这个密匙验证数据完整性
            // 如果是解码的话，会从第$ckey_length位开始，因为密文前$ckey_length位保存 动态密匙，以保证解密正确
            $string = $operation == 'DECODE' ? base64_decode(substr($string, $ckey_length)) : sprintf('%010d', $expiry ? $expiry + time() : 0) . substr(md5($string . $keyb) , 0, 16) . $string;
            $string_length = strlen($string);
            $result = '';
            $box = range(0, 255);
            $rndkey = array();
            // 产生密匙簿
            for ($i = 0; $i <= 255; $i++) {
                $rndkey[$i] = ord($cryptkey[$i % $key_length]);
            }
            // 用固定的算法，打乱密匙簿，增加随机性，好像很复杂，实际上并不会增加密文的强度
            for ($j = $i = 0; $i < 256; $i++) {
                $j = ($j + $box[$i] + $rndkey[$i]) % 256;
                $tmp = $box[$i];
                $box[$i] = $box[$j];
                $box[$j] = $tmp;
            }
            // 核心加解密部分
            for ($a = $j = $i = 0; $i < $string_length; $i++) {
                $a = ($a + 1) % 256;
                $j = ($j + $box[$a]) % 256;
                $tmp = $box[$a];
                $box[$a] = $box[$j];
                $box[$j] = $tmp;
                // 从密匙簿得出密匙进行异或，再转成字符
                $result.= chr(ord($string[$i]) ^ ($box[($box[$a] + $box[$j]) % 256]));
            }
            if ($operation == 'DECODE') {
                // substr($result, 0, 10) == 0 验证数据有效性
                // substr($result, 0, 10) - time() > 0 验证数据有效性
                // substr($result, 10, 16) == substr(md5(substr($result, 26).$keyb), 0, 16) 验证数据完整性
                // 验证数据有效性，请看未加密明文的格式
                if ((substr($result, 0, 10) == 0 || substr($result, 0, 10) - time() > 0) && substr($result, 10, 16) == substr(md5(substr($result, 26) . $keyb) , 0, 16)) {
                    return substr($result, 26);
                } else {
                    return '';
                }
            } else {
                // 把动态密匙保存在密文里，这也是为什么同样的明文，生产不同密文后能解密的原因
                // 因为加密后的密文可能是一些特殊字符，复制过程可能会丢失，所以用base64编码
                return $keyc . str_replace('=', '', base64_encode($result));
            }
        }
        $a = "www.test.com";
        $b = authcode($a, "ENCODE", "abc123");
        echo $b . "<br/>";
        echo authcode($b, "DECODE", "abc123");
    ?>

<!-- more -->
##简单对称加密算法

    <?php
        /** 
         * 简单对称加密算法之加密
         * @param String $string 需要加密的字串
         * @param String $skey 加密EKY
         * @author Anyon Zou <zoujingli@qq.com>
         * @date 2013-08-13 19:30
         * @update 2014-10-10 10:10
         * @return String
         */
        function encode($string = '', $skey = 'cxphp') {
            $strArr = str_split(base64_encode($string));
            $strCount = count($strArr);
            foreach (str_split($skey) as $key => $value) $key < $strCount && $strArr[$key].= $value;
            return str_replace(array(
                '=',
                '+',
                '/'
            ) , array(
                'O0O0O',
                'o000o',
                'oo00o'
            ) , join('', $strArr));
        }
        /** 
         * 简单对称加密算法之解密
         * @param String $string 需要解密的字串
         * @param String $skey 解密KEY
         * @author Anyon Zou <zoujingli@qq.com>
         * @date 2013-08-13 19:30
         * @update 2014-10-10 10:10
         * @return String
         */
        function decode($string = '', $skey = 'cxphp') {
            $strArr = str_split(str_replace(array(
                'O0O0O',
                'o000o',
                'oo00o'
            ) , array(
                '=',
                '+',
                '/'
            ) , $string) , 2);
            $strCount = count($strArr);
            foreach (str_split($skey) as $key => $value) $key <= $strCount && isset($strArr[$key]) && $strArr[$key][1] === $value && $strArr[$key] = $strArr[$key][0];
            return base64_decode(join('', $strArr));
        }
        echo '<pre>';
        $str = '56,15123365247,54,四大古典风格';
        echo "string : " . $str . " <br />";
        echo "encode : " . ($enstring = encode($str)) . '<br />';
        echo "decode : " . decode($enstring);
    ?>

##DES加密解密

    <?php
        class DES {
            public $key;
            public $iv; //偏移量
            function __construct($key, $iv = 0) {
                $this->key = $key;
                if ($iv == 0) {
                    $this->iv = $key;
                } else {
                    $this->iv = $iv;
                }
            }
            //加密
            function encrypt($str) {
                $size = mcrypt_get_block_size(MCRYPT_DES, MCRYPT_MODE_CBC);
                $str = $this->pkcs5Pad($str, $size);
                $data = mcrypt_cbc(MCRYPT_DES, $this->key, $str, MCRYPT_ENCRYPT, $this->iv);
                //$data=strtoupper(bin2hex($data)); //返回大写十六进制字符串
                return base64_encode($data);
            }
            //解密
            function decrypt($str) {
                $str = base64_decode($str);
                //$strBin = $this->hex2bin( strtolower($str));
                $str = mcrypt_cbc(MCRYPT_DES, $this->key, $str, MCRYPT_DECRYPT, $this->iv);
                $str = $this->pkcs5Unpad($str);
                return $str;
            }
            function hex2bin($hexData) {
                $binData = "";
                for ($i = 0; $i < strlen($hexData); $i+= 2) {
                    $binData.= chr(hexdec(substr($hexData, $i, 2)));
                }
                return $binData;
            }
            function pkcs5Pad($text, $blocksize) {
                $pad = $blocksize - (strlen($text) % $blocksize);
                return $text . str_repeat(chr($pad) , $pad);
            }
            function pkcs5Unpad($text) {
                $pad = ord($text{strlen($text) - 1});
                if ($pad > strlen($text)) return false;
                if (strspn($text, chr($pad) , strlen($text) - $pad) != $pad) return false;
                return substr($text, 0, -1 * $pad);
            }
        }
        $str = 'abc';
        $key = '12345678'; //8位内
        $crypt = new DES($key);
        $mstr = $crypt->encrypt($str);
        $str = $crypt->decrypt($mstr);
        echo $str . ' <=> ' . $mstr;
    ?>

##PHP hexXbin

    <?php
        function hexXbin($data, $types = false) {
            if (!is_string($data)) return 0;
            if ($types === false) {
                $len = strlen($data);
                if ($len % 2) {
                    return 0;
                } else if (strspn($data, '0123456789abcdefABCDEF') != $len) {
                    return 0;
                }
                return pack('H*', $data);
            } else {
                return bin2hex($data);
            }
        }
        echo $t = hexXbin('XN中国人(  ADｄｗｅｒｅ)zQ4MzUwOTcy==', true);
        echo '<br />';
        echo hexXbin($t);
    ?>
