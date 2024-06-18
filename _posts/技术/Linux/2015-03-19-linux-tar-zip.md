---
layout: post
title: 打包/压缩目录
description: 打包/压缩目录
category: linux
tags: [linux]
date: 2015-03-19
---
##打包/压缩目录

范例一：将整个 /etc 目录下的文件全部打包成为 /tmp/etc.tar

	[root@linux ~]# tar -cvf /tmp/etc.tar /etc <==仅打包，不压缩！
	[root@linux ~]# tar -zcvf /tmp/etc.tar.gz /etc <==打包后，以 gzip 压缩
	[root@linux ~]# tar -jcvf /tmp/etc.tar.bz2 /etc <==打包后，以 bzip2 压缩

将 /tmp/etc.tar.gz 文件解压缩在 /usr/local/src 底下

	[root@linux ~]# cd /usr/local/src
	[root@linux src]# tar -zxvf /tmp/etc.tar.gz
