---
layout: post
title: 自动检测程序正常运行，遇故障则重启服务
description: 自动检测程序正常运行，遇故障则重启服务
category: Linux
tags: [linux,shell]
date: 2015-12-29
---
在某些情况下，如系统负载过大server无法申请到内存而挂掉、server底层发生段错误、server占用内存过大被内核Kill，或者被某些程序误杀。那server将无法提供服务，导致业务中断，公司收入出现损失。

有一个非常有效并且常用的方案是crontab重启监控。

原理是每1分钟执行一次shell脚本，检测server的进程是否存活，如果存在则跳过。如果发现主进程已经挂掉，则执行restart逻辑，先kill掉所有残留的子进程，然后重新启动Server。
<!-- more -->

在系统的crontab中加入：

    * * * * * /data/script/check_server.sh

/data/script/check_server.sh：

    #!/usr/bin/bash
    cmd="/application/php/bin/php /data/www/filter/http_server.php"
    count=`ps aux |grep "$cmd" | grep -v "grep" | wc -l`
     
    echo $count
    if [ $count -lt 1 ]; then
    ps aux |grep "$cmd" | grep -v "grep"| awk '{print $2}'|xargs kill -9
    sleep 2
    $cmd
    echo "restart "$(date +%Y-%m-%d_%H:%M:%S) >/data/log/restart.log
    fi

> 原文作者：[松鼠先生](http://blog.41ms.com/post/42.html)

> 原文地址：[无人值守，检测程序正常运行，遇故障则重启服务](http://blog.41ms.com/post/42.html)