---
layout: post
title: PHP代码之使用匿名函数
description: PHP代码之使用匿名函数
categories: ["php"]
tags: [php]
date: 2017-07-17
---

匿名函数（`Anonymous functions`），也叫闭包函数（`closures`），允许 临时创建一个没有指定名称的函数。最经常用作回调函数（`callback`）参数的值。当然，也有其它应用的情况。

匿名函数目前是通过`Closure`类来实现的。 

闭包函数也可以作为变量的值来使用。PHP 会自动把此种表达式转换成内置类`Closure`的对象实例。把一个`closure`对象赋值给一个变量的方式与普通变量赋值的语法是一样的，最后也要加上分号。

闭包可以从父作用域中继承变量。 任何此类变量都应该用`use`语言结构传递进去。 `PHP 7.1`起，不能传入此类变量：`superglobals`、 `$this` 或者和参数重名。
这些变量都必须在函数或类的头部声明。 从父作用域中继承变量与使用全局变量是不同的。全局变量存在于一个全局的范围，无论当前在执行的是哪个函数。而 闭包的父作用域是定义该闭包的函数（不一定是调用它的函数）。

<!-- more -->

## 构建函数或方法内部的代码块

假如我们有一段逻辑，在一个函数或者方法里我们需要格式化数据,但是这个格式化数据的代码片段出现了多次，如果我们直接写可能会想下面这样：

	function doSomething(...) {
	    ...
	    // 格式化代码段
	    ...
	    ...
	    // 格式化代码段[重复的代码]
	    ...
	}

我相信大多数的人应该不会像上面这么写，可能都会像下面这样：

	function doSomething(...) {
	    ...
	    format(...);
	    ...
	    format(...);
	    ...
	}
	// 再声明一个格式花代码的函数或方法
	function format() {
	    // 格式化代码段
	    ...
	}

上面这样的写法没有任何的问题，最小单元化我们的代码片段，但是如果这个format函数或者方法只是doSomething使用呢？我通常会向下面这么写，为什么？因为我认为在这种上下文的环境中format和doSomething的一个子集。

	function doSomething() {
	    ...
	    $package = function (...) use (...) {　// 同样use后面的参数也可以传引用
	        // 格式化代码段
	        ...
	    };
	    ...
	    package(...);
	    ...
	    package(...);
	    ...
	}

## 实现类的【懒加载】和实现设计模式的【最少知道原则】

假如有下面这段代码：

	class One
	{
	    private $instance;
	    // 类One内部依赖了类Two
	    // 不符合设计模式的最少知道原则
	    public function __construct()
	    {  
	        $this->intance = new Two();
	    }
	    public function doSomething()
	    {
	        if (...) {
	            // 如果某种情况调用类Two的实例方法
	            $this->instance->do(...);
	        }
	        ...
	    }
	}
	...
	$instance = new One();
	$instance->doSomething();
	...

上面的写法有什么问题？

* 不符合设计模式的最少知道原则,类One内部直接依赖了类Two
* 类Two的实例不是所有的上下文都会用到，所以浪费了资源，有人说搞个单例，但是解决不了实例化了不用的尴尬

所以我们使用匿名函数解决上面的问题，下面我们这么改写：

	class One
	{
	    private $closure;
	    public function __construct(Closure $closure)
	    {  
	        $this->closure = $closure;
	    }
	    public function doSomething()
	    {
	        if (...) {
	            // 用的时候再实例化
	            // 实现懒加载
	            $instance = $this->closure();
	            $instance->do(...)
	        }
	        ...
	    }
	}
	...
	$instance = new One(function () {
	    // 类One内部外部依赖了类Two
	    return new Two();
	});
	$instance->doSomething();
	...