---
layout: post
title: 根据ip查询所在地
description: 根据ip查询所在地
category: PHP
tags: [php,ip]
date: 2015-12-25
---

##获取IP地址

    <?php
    function get_client_ip(){
        if (isset($_SERVER)) {
            if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
                $realip = $_SERVER['HTTP_X_FORWARDED_FOR'];
            } elseif (isset($_SERVER['HTTP_CLIENT_IP'])) {
                $realip = $_SERVER['HTTP_CLIENT_IP'];
            } else {
                $realip = $_SERVER['REMOTE_ADDR'];
            }
        } else {
            if (getenv("HTTP_X_FORWARDED_FOR")) {
                $realip = getenv( "HTTP_X_FORWARDED_FOR");
            } elseif (getenv("HTTP_CLIENT_IP")) {
                $realip = getenv("HTTP_CLIENT_IP");
            } else {
                $realip = getenv("REMOTE_ADDR");
            }
        }
        return $realip;
    }

    echo $ip = get_client_ip();
    ?>

<!-- more -->
##根据ip查询所在地

###新浪接口

    <?php
    $res0 = file_get_contents("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=$ip");
    $res0 = json_decode($res0,true);
    print_r($res0);
    echo "<br/>";
    ?>

###淘宝接口

    <?php
    $res1 = file_get_contents("http://ip.taobao.com/service/getIpInfo.php?ip=$ip");
    $res1 = json_decode($res1,true);
    print_r($res1);
    echo "<br/>";
    ?>

###百度接口

    <?php 
    $getIp=$_SERVER["REMOTE_ADDR"];
    echo 'IP:',$getIp;
    echo '<br/>';
    $content = file_get_contents("http://api.map.baidu.com/location/ip?ak=7IZ6fgGEGohCrRKUE9Rj4TSQ&ip={$getIp}&coor=bd09ll");
    $json = json_decode($content);
    echo 'log:',$json->{'content'}->{'point'}->{'x'};//按层级关系提取经度数据
    echo '<br/>';
    echo 'lat:',$json->{'content'}->{'point'}->{'y'};//按层级关系提取纬度数据
    echo '<br/>';
    print $json->{'content'}->{'address'};//按层级关系提取address数据
    ?>