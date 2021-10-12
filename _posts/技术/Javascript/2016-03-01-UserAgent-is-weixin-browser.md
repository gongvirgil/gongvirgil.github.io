---
layout: post
title: 微信内置浏览器UserAgent的判断
description: 微信内置浏览器UserAgent的判断
category: 技术
tags: [微信,UserAgent]
date: 2016-03-01
---

通过微信分享的URL链接都将通过微信内置的浏览器打开，那么如何区别判断是否是微信内置浏览器呢，很简单。

微信Android UA

	mozilla/5.0 (linux; u; android 4.1.2; zh-cn; mi-one plus build/jzo54k) applewebkit/534.30 (khtml, like gecko) version/4.0 mobile safari/534.30 micromessenger/5.0.1.352

微信iPhone UA

	mozilla/5.0 (iphone; cpu iphone os 5_1_1 like mac os x) applewebkit/534.46 (khtml, like gecko) mobile/9b206 micromessenger/5.0

微信的 User Agent 都有`micromessenger`字符串标示，通过判断是否含有这个字符串就OK了。

JS判断是否是微信内置的浏览器

	function isWeixinBrowser(){
	    var ua = navigator.userAgent.toLowerCase();
	    return (/micromessenger/.test(ua)) ? true : false ;
	}