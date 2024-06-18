---
layout: post
title: 解决Ubuntu远程连接mysql连不上的问题 
description: 解决Ubuntu远程连接mysql连不上的问题
categories: ["mysql"]
tags: [mysql]
date: 2016-11-22
---

原因：Ubuntu竟然在mysql的配置文件中默认绑定了本机。

解决方案：果断给注释掉。编辑配置文件`/etc/mysql/my.cnf`，注释掉里边的`bind-address`配置项。

	# Instead of skip-networking the default is now to listen only on
	# localhost which is more compatible and is not less secure.
	bind-address = 127.0.0.1

重启mysql

	service mysql restart