---
layout: post
title: Linux下执行shell提示错误syntax error:unexpected end of file
description: Linux下执行shell提示错误syntax error:unexpected end of file
categories: ["技术"]
tags: [shell,Linux]
date: 2016-11-01
---

因为开发环境是虚拟机Linux系统，开发时映射到Windows系统，所以在Windows系统下编辑的shell脚本，在执行时发现提示错误`syntax error:unexpected end of file`。

原因是DOS下文件和Linux下文件格式差异。DOS下的断行标志是\r\n，对应十六进制为`0D 0A`。而Unix下的断行标志是`\n`，十六进制为`0A`。

换句话说，在Windows系统下，换行用的两个符号：回车`\r`、换行`\n`，在Linux下只有一个`\n`。

DOS格式的文本文件在Linux下，有时候vi打开时行尾会显示`^M`，当然也有可能看不到，但是在vi界面会在下方显示该文件格式，如`"test.txt" [dos] 9L, 113C`，可以看出该文件是DOS格式。

## 解决方法

在Linux下vi编辑执行如下命令即可：

	vi test.txt
	:set fileformat=unix
	:wq