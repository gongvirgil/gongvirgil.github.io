---
layout: post
title: Ajax跨域请求带上cookies
description: Ajax跨域请求带上cookies
categories: ["技术"]
tags: [Ajax,cookies,domain]
date: 2016-05-11
---

### 跨域允许

远端设置 Access-Control-Allow-Origin "*"

### Ajax请求跨域带上cookies

本地设置 withCredentials = true;
远端设置 Access-Control-Allow-Credentials true


Access-Control-Allow-Credentials 为 true 时，Access-Control-Allow-Origin不能同时为 *，不然会报跨错误，需要单独配置跨域准许。

** jQuery中Ajax写法： **
```
	$.ajax({
	   url: a_cross_domain_url,
	   xhrFields: {
	      withCredentials: true
	   }
	});
```