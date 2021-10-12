---
layout: post
title: 简单实用的PHP函数
description: 收集一些简单实用的PHP函数
category: php
tags: [PHP,函数]
date: 2015-10-10
---

###对象到数组转换
    
    function objToArr($obj){
        if(!is_object($obj) && !is_array($obj)) {
            return $obj;
        }
        $arr = array();
        foreach($obj as $k => $v){
            $arr[$k] = $this->objToArr($v);
        }
        return $arr;
    }

###json到php数组转换

    function simple_json_parser($json){
        $json = str_replace("{","",str_replace("}","", $json));
        $jsonValue = explode(",", $json);
        $arr = array();
        foreach($jsonValue as $v){
            $jValue = explode(":", $v);
            $arr[str_replace('"',"", $jValue[0])] = (str_replace('"', "", $jValue[1]));
        }
        return $arr;
    }

<!-- more -->
###curl 实现 GET / POST

    function oauth_http($method,$header,$url,$data){
        $method = $method ? $method : 'get';
        if( $method == 'get') {
            $ch = curl_init ();
            curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
            curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, TRUE );
            curl_setopt ( $ch, CURLOPT_URL, $url );
            $result = curl_exec ( $ch );
            curl_close ( $ch );
            return $result;
        } elseif ( $method == 'post' ) {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
            curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, TRUE );
            curl_setopt ( $ch, CURLOPT_POST, TRUE );
            curl_setopt ( $ch, CURLOPT_POSTFIELDS, $data );
            curl_setopt ( $ch, CURLOPT_URL, $url );
            curl_setopt ( $ch, CURLOPT_SSL_VERIFYPEER, FALSE);
            $ret = curl_exec ( $ch );
            curl_close ( $ch );
            return $ret;
        }
    }

###获取链接内容(不存在file_get_contents() 时使用curl方法)

    function get_url_contents($url)
    {
        if (ini_get("allow_url_fopen") == "1")
            return file_get_contents($url);
     
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_URL, $url);
        $result =  curl_exec($ch);
        curl_close($ch);
     
        return $result;
    }

    