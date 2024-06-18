---
layout: post
title: Composer错误：exceeded the timeout of 300 seconds
description: Composer错误：exceeded the timeout of 300 seconds
categories: ["Composer"]
tags: [Composer]
date: 2017-06-23
---

Symfony2在使用Composer安装phpunit的时候遇到下面的错误：

	[Symfony\Component\Process\Exception\ProcessTimedOutException]                                                                                                                                                                                                             
	The process "git clone --no-checkout 'https://github.com/sebastianbergmann/phpunit.git' '/home/cxl/tp5-project/vendor/phpunit/phpunit' && cd '/home/cxl/tp5-project/vendor/phpunit/phpunit' && git remote add composer 'https://github.com/sebastianbergmann/phpunit.git'  
	&& git fetch composer" exceeded the timeout of 300 seconds. 

解决方案：增加COMPOSER_PROCESS_TIMEOUT，执行命令如下：

	//查看默认超时时间
	composer config --list
	//设置超时时间
	composer config -g process-timeout 600
	//清除缓存
	composer clear-cache
