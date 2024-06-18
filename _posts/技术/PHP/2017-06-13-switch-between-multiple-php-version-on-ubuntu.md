---
layout: post
title: Ubuntu上在多个PHP版本之间切换
description: Ubuntu上在多个PHP版本之间切换
categories: ["php"]
tags: [PHP,Ubuntu]
date: 2017-06-13
---

在您的系统上，如果您已安装了多个版本的PHP（例如PHP 7.1和PHP 5.6两者）。 PHP 7.1作为Apache和CLI的默认PHP运行。对于任何需求，您需要使用PHP 5.6。然后你不需要删除php 7.1。你可以简单地切换php版本为默认用于Apache和命令行。

例如，您的服务器安装了PHP 7.1和PHP 5.6两个版本。现在下面的例子将帮助你在两个版本之间切换。

<!-- more -->

## 从PHP 5.6 => PHP 7.1

默认PHP 5.6在您的系统上设置，您需要切换到PHP 7.1。

### Apache： –

```
$ sudo a2dismod php5.6
$ sudo a2enmod php7.1
$ sudo service apache2 restart
```

### 命令行：-

```
$ update-alternatives --set php /usr/bin/php7.1
```

## 从PHP 7.1 => PHP 5.6

默认PHP 7.1在您的系统上设置，您需要切换到PHP 5.6。

### Apache： –

```
$ sudo a2dismod php7.1
$ sudo a2enmod php5.6
$ sudo service apache2 restart
```

### 命令行：-

```
$ sudo update-alternatives --set php /usr/bin/php5.6
```

> 原文地址：[如何在Ubuntu上在多个PHP版本之间切换](https://www.howtoing.com/switch-between-multiple-php-version-on-ubuntu/)

