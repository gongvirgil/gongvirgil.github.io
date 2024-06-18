---
layout: post
title: win10下80端口被PID为4的System占用问题
description: Windows10下80端口被PID为4的System占用导致Apache无法启动的分析与解决方案
categories: ["软件"]
tags: [软件,win10]
date: 2015-12-16
---

###Windows10下80端口被PID为4的System占用导致Apache无法启动的分析与解决方案

用命令 `netstat -ano|findstr 80` 来查看一下到底是哪个程序占用了80端口，如图所示端口查找的结果：

system进程占用80端口

![system进程占用80端口][p1]
[p1]: /images/1.png "system进程占用80端口"

![system进程占用80端口][p2]
[p2]: /images/2.png "system进程占用80端口"  

<!-- more -->
<br>
使用命令  `netsh http show servicestate` 查看一下当前的http服务状态

![当前的http服务状态][p3]
[p3]: /images/3.png "当前的http服务状态"

<br>
可以看到，80端口被一个DefaultAppPool的东西占用了，如果用过IIS的童鞋，这时候肯定一定想到了原因，这里我们依然要接着往下找原因，图中可以看出控制器进程ID为1600，那么就 就继续查看一下1600进程是什么鬼，进入任务管理器，找到PID1600的进程，右键转到服务，可以看到当前的进程所在的服务，如图所示：

![PID1600进程][p4]
[p4]: /images/4.png "PID1600进程"

![PID1600进程所在的服务][p5]
[p5]: /images/5.png "PID1600进程所在的服务"

<br>
看到图中的服务，这里原因也就找到了，IIS的World Wid Web Publishing Service 万维网服务的问题。

###解决方案

![解决方案][p6]
[p6]: /images/6.png "解决方案"