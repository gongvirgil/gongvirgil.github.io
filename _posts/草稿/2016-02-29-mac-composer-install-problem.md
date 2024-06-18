---
layout: post
title: Mac下安装composer遇到的问题
description: Mac下安装composer遇到的问题
categories: ["技术"]
tags: [composer,Mac,OS X]
date: 2016-02-29
---

##安装composer

	cd /usr/local/bin
	curl -sS https://getcomposer.org/installer | php

执行发现失败了，提示如下：

	Some settings on your machine may cause stability issues with Composer.
	If you encounter issues, try to change the following:

	The OpenSSL library (0.9.8zc) used by PHP does not support TLSv1.2 or TLSv1.1.
	If possible you should upgrade OpenSSL to version 1.0.1 or above.

	Downloading...
	Could not create file /usr/local/bin/composer.phar: fopen(/usr/local/bin/composer.phar): failed to open stream: Permission denied
	Download failed: fopen(/usr/local/bin/composer.phar): failed to open stream: Permission denied
	fwrite() expects parameter 1 to be resource, boolean given

原来是Composer 依赖于 PHP，