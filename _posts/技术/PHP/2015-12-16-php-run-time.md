---
layout: post
title: PHP调试执行时间
description: PHP调试执行时间
category: PHP
tags: [php,调试]
date: 2015-12-16
---

##获取一行或一段代码的执行时间

通常使用microtime函数获取代码前后的微秒时间数再比较两个值的时间差，但这种方法很有局限制，不能大范围的应用，而且每次都需要书写很多代码，适合于简单的调试。具体请查看PHP手册详细说明。代码如下：

    <?php
    function microtime_float(){    
        list($usec, $sec) = explode(" ", microtime());    
        return ((float)$usec + (float)$sec);
    } 
    $time_start = microtime_float(); 
    usleep(100); 
    $time_end = microtime_float();
    $time = $time_end - $time_start; 
    echo "Did nothing in $time seconds\n";
    ?>

<!-- more -->

###microtime (PHP 3, PHP 4, PHP 5)

microtime -- 返回当前 Unix 时间戳和微秒数
说明
mixed microtime ( [bool get_as_float] )

microtime() 当前 Unix 时间戳以及微秒数。本函数仅在支持 gettimeofday() 系统调用的操作系统下可用。
如果调用时不带可选参数，本函数以 "msec sec" 的格式返回一个字符串，其中 sec 是自 Unix 纪元（0:00:00 January 1, 1970 GMT）起到现在的秒数，msec 是微秒部分。字符串的两部分都是以秒为单位返回的。

如果给出了 get_as_float 参数并且其值等价于 TRUE，microtime() 将返回一个浮点数。

注意: get_as_float 参数是 PHP 5.0.0 新加的。