---
layout: post
title: 一行代码，浏览器变临时编辑器
description: 一行代码，浏览器变临时编辑器
categories: ["技术"]
tags: [浏览器,编辑器]
date: 2015-12-01
---

这是 Jose 在CoderWall 分享的一个[小技巧](https://coderwall.com/p/lhsrcq/one-line-browser-notepad)：在浏览器地址栏中输入下面这行代码，回车即可把浏览器变临时编辑器。
    
    data:text/html, <html contenteditable>

<!-- more -->
代码高亮编辑器

    data:text/html, <style type="text/css">#e{position:absolute;top:0;right:0;bottom:0;left:0;}</style><div id="e"></div><script src="http://d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js" type="text/javascript" charset="utf-8"></script><script>var e=ace.edit("e");e.setTheme("ace/theme/monokai");e.getSession().setMode("ace/mode/ruby");</script>
    改造成支持其他语言语法高亮的，可把 ace/mode/ruby 替换为：

    Python -> ace/mode/python
    C/C++ -> ace/mode/c_cpp
    Javscript -> ace/mode/javascript
    Java -> ace/mode/java
    Scala -> ace/mode/scala
    Markdown -> ace/mode/markdown
    CoffeeScript -> ace/mode/coffee
    其他……

    jakeonrails 语法高亮风格用的是 monokai。
    如果需要换成其他风格，，可把 ace/theme/monokai 替换为：

    Eclipse -> ace/theme/eclipse
    TextMate -> ace/theme/textmate
    其他……