---
layout: post
title: PHP设置定时任务的实现方法
description: PHP设置定时任务的实现方法
category: PHP
tags: [php,定时任务]
date: 2015-12-25
---

定时运行任务对于一个网站来说，是一个比较重要的任务，比如定时发布文档，定时清理垃圾信息等，现在的网站大多数都是采用PHP动态语言开发的，而对于PHP的实现决定了它没有Java和.Net这种AppServer的概念，而http协议是一个无状态的协议，PHP只能被用户触发，被调用，调用后会自动退出内存，没有常驻内存。
<!-- more -->
如果非要PHP去设置定时任务， 可以有以下三个方法：

##1、用户触发定时

通过挂载到网页里面，判断当前的时间，然后运行PHP代码，缺点是每一次加载网页，都需要加载这个PHP页面，而对于人气不旺的网站，这样的延时可能会更加的严重，毕竟是用户的HTTP请求去触发这个PHP代码的运行，Discuz!论坛程序是判断在00:00之后，第一个用户访问请求去执行定时的PHP代码。

##2、常驻内存运行

PHP是可以常驻内存运行程序的，下面的这段代码，可以在当前文件夹下，生成一个test.txt，并每隔20秒，往里面写入一个时间戳，无论客户端是否关闭浏览器。

    <?php
    ignore_user_abort(true);
    set_time_limit(0);
    function write_txt(){
        if(!file_exists("test.txt")){
            $fp = fopen("test.txt","wb");
            fclose($fp);
        }
        $str = file_get_contents(’test.txt’);
        $str .= "\r\n".date("H:i:s");
        $fp = fopen("test.txt","wb");
        fwrite($fp,$str);
        fclose($fp);
    }
    function do_cron(){
        usleep(20000000);
        write_txt();
    }
    while(1){
        do_cron();
    }
    ?>

###关键的两个函数

ignore_user_abort(true)，这个函数的作用是，无论客户端是否关闭浏览器，下面的代码都将得到执行。

set_time_limit(0)，这个函数的作用是，取消PHP文件的执行时间，如果没有这个函数的话，默认PHP的执行时间是30秒，也就是说30秒后，这个文件就会从内存中删除。

另外usleep函数是在PHP5.0后的版本中加入的函数，支持Windows操作系统，设置代码运行的时间，单位是毫秒(MS)。

###如何停止定时

但是当我执行脚本的时候，即使我关闭了浏览器，我根本就没法去停止这段程序了，所以你需要一个执行脚本的开关，你可以用外部文件引入的方法来实现，在while循环的时候，include开关变量即可。那么就可以这样实现：

建立外部引入变量文件 switch.php 内容如下：

    <?php
    return 1;//1执行脚本 0退出执行脚本
    ?>

这个脚本只是测试可行，具体效率应该不高，对于lamp，你完全可以使用crontab 来实现。

##3、服务器定时任务

服务器定时任务需要你是独立的服务器，或者是VPS，总之就是对系统的配置有足够的权限，虚拟空间就不要折腾这个方法了，因为你没有权限。

###Windows平台

在 Windows 平台下您可以将cli\php.exe 和 .php 文件的双击属性相关联，您也可以编写一个批处理文件来用 PHP 执行脚本。我们把写好的程序放在一个目录下如 E:\web\mail.php 。

然后写一个windows批处理文件内容如下：

    @D:\php\cli\php.exe E:\web\mail.php >d:\php\cli\sendmail.log

Pause
那个 D:\php\cli\php.exe 是我的PHP安装文件所在目录。Php.exe 就是windows PHP命令行模式的程序。

好的，我们保存这个文件为 mail.bat 然后的windows中的计划任务中添加一个任务，让操作系统在某个时间来运行这个批处理文件。

###Unix平台

如果您使用 Unix 系统，您需要在您的 PHP 脚本的最前面加上一行特殊的代码，使得它能够被执行，这样系统就能知道用什么样的程序要运行该脚本。为 Unix 系统增加的第一行代码不会影响该脚本在 Windows 下的运行，因此您也可以用该方法编写跨平台的脚本程序。

###在Crontab中使用PHP执行脚本

就像在Crontab中调用普通的shell脚本一样（具体Crontab用法），使用PHP程序来调用PHP脚本，每一小时执行 myscript.php 如下：

    # crontab -e

    00 * * * * /usr/local/bin/php /home/john/myscript.php

/usr/local/bin/php为PHP程序的路径。

###在Crontab中使用URL执行脚本

如果你的PHP脚本可以通过URL触发，你可以使用 lynx 或 curl 或 wget 来配置你的Crontab。

下面的例子是使用Lynx文本浏览器访问URL来每小时执行PHP脚本。Lynx文本浏览器默认使用对话方式打开URL。但是，像下面的，我们在lynx命令行中使用-dump选项来把URL的输出转换来标准输出。

    00 * * * * lynx -dump http://www.uedsc.net/myscript.php

下面的例子是使用 CURL 访问URL来每5分执行PHP脚本。Curl默认在标准输出显示输出。使用 "curl -o" 选项，你也可以把脚本的输出转储到临时文件。

    */5 * * * * /usr/bin/curl -o temp.txt http://www.uedsc.net/myscript.php

下面的例子是使用WGET访问URL来每10分执行PHP脚本。-q 选项表示安静模式。"-O temp.txt" 表示输出会发送到临时文件。

    */10 * * * * /usr/bin/wget -q -O temp.txt http://www.uedsc.net/myscript.php


> 原文地址：[详解PHP设置定时任务的实现方法](http://www.uedsc.com/php-timing-task.html)