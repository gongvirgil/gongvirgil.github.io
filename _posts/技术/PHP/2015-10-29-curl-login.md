---
layout: post
title: curl模拟登陆
description: curl模拟登陆
category: 技术
tags: [php,curl]
date: 2015-10-29
---

用PHP开发模拟浏览器的应用,首选技术是CURL函数库。但是php官方提供的技术文档资料很少，相关的示例代码也很少。<!-- more -->

最 近由于项目需要，开发了一系列免费邮箱的导出用户自己联系人的功能，包括国内外知名邮 箱，163，sina，sohu,yahoo,hotmail,gmail,qq mail等。还开发了一些方便用户嵌入代码到各大博客，个人门户的应用。比如嵌入flash代码到Qzone，网易的blog，百度的个人门户等。

当然，最原始的技术手段是采用fsockopen函数，然后深入去学习http协议，写出标准的http头信息，也是可以完成开发的。不过麻烦的地方就出在标准。如果对http协议标准认识不深，经常会因碰到少了一个空格或者少了一个换行符号而debug很久。

OK， 还是进入正题。工欲善其事，必先利其器。要模拟浏览器访问网站，首选要学会观察浏览器是如何发送http报文的，以及网站服务器返回给浏览器 是什么样的内容。我推荐安装一个国外人开发的httpwatch的软件，最好搞个破解的版本，否则有些功能是使用不了的。这个软件安装完成之后是嵌入在 IE里的，启动Record，在地址栏输入网址后回车，它就会将浏览器和服务器之间的所有通讯扫描出来，让你一览无遗。关于这个软件的使用在本文不做介 绍。

模拟浏览器登陆应用开发，最关键的地方是突破登陆验证。CURL技术不只支持http，还支持https。区别就在多了一层SSL加密传输。如果是要登陆 https网站，php记得要支持openssl。还是先拿一个例子来分析。

    // 用户名
    $login = ‘username’;
    //密码
    $password = ‘password’;

    //163的用户登陆地址
    $url = “https://reg.163.com/logins.jsp”;

    //post 要提交的数据
    $fields = “verifycookie=1&style=16&product=mail163&username=”.$login.”&password=”.$password.”&selType=jy&remUser=&secure=on&%B5%C7%C2%BC%D3%CA%CF%E4=%B5%C7%C2%BC%D3%CA%CF%E4″;

    // 用来存放cookie的文件
    $cookie_file = dirname(__FILE__).”/cookie.txt”;

    // 启动一个CURL会话
    $ch = curl_init();

    // 要访问的地址
    curl_setopt($ch, CURLOPT_URL, $url);

    // 对认证证书来源的检查，0表示阻止对证书的合法性的检查。
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);

    // 从证书中检查SSL加密算法是否存在
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 1);

    //模拟用户使用的浏览器，在HTTP请求中包含一个”user-agent”头的字符串。
    curl_setopt($ch, CURLOPT_USERAGENT, “Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0)”);

    // 发送一个常规的POST请求，类型为：application/x-www-form-urlencoded，就像表单提交的一样。
    curl_setopt($ch, CURLOPT_POST, 1);

    //要传送的所有数据，如果要传送一个文件，需要一个@开头的文件名
    curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);

    //连接关闭以后，存放cookie信息的文件名称
    curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_file);

    // 包含cookie信息的文件名称，这个cookie文件可以是Netscape格式或者HTTP风格的header信息。
    curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_file);

    // 设置curl允许执行的最长秒数
    //curl_setopt($ch, CURLOPT_TIMEOUT, 6);

    // 获取的信息以文件流的形式返回，而不是直接输出。
    curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);

    // 执行操作
    $result = curl_exec($ch);

    if ($result == NULL) {
    echo “Error:
    “;
    echo curl_errno($ch) . ” – ” . curl_error($ch) . ”
    “;
    }

    // 关闭CURL会话
    curl_close($ch); 