---
layout: post
title: 递归时内存占用问题
description: 递归时内存占用问题
categories: ["php"]
tags: [PHP,递归,内存]
date: 2017-04-01
---

若有涉及到重复操作，尽量使用循环而非递归。
每一次递归调用都将过程在内存中复制一遍，如果有大数据的局部变量则会导致内存激增。
内存分配的图示：

![内存分配图示](/images/recursion-memory.jpg)


<!-- more -->

```
<?php
//递归10次内存测试
function test($j=0,$start){
	    $aa = str_repeat($j,2560000);
        echo (memory_get_usage()-$start)."\r\n";//依次输出：2560424 5120704 7680920 10241136 12801352 15361568 17921784 20482000 23042216 25602432 
        //结论：递归自身之前需要unset局部变量释放内存，否则会一直占据内存直到递归结束
        $j++;
        if($j<10) test($j,$start);
}

function test1($j=0,$start){
	$queue = array();
	array_push($queue, $j);
	while(count($queue)<10){
		$aa = str_repeat($j,2560000);
		echo (memory_get_usage()-$start)."\r\n";//依次输出：2560856 2561120 2561320 2561520 2561720 2561920 2562120 2562320 2562584 
		$j++;
		array_push($queue, $j);
	}
}

$start = memory_get_usage();
test(0,$start);
?>
```