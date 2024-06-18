---
layout: post
title: 【laravel学习笔记】二、路由、控制器及视图简介 
description: 路由、控制器及视图简介
category: php
tags: [laravel,笔记]
date: 2015-09-11
---

##路由
Laravel应用的 大多数路由都将在 **app/Http/routes.php** 中定义，大多数基本的 Laravel 路由都只接受一个 URI 和 一个 `闭包(Closure)` 参数。下面是一个简单的GET路由：

    Route::get('/', 'WelcomeController@index');

* `Route` : 声明一个路由
* `get` : 定义一个GET路由，除`get`外，还有`post`、`put`、`delete`路由;
* `/` : URL路径
* `WelcomeController@index` : 控制器@方法

该路由是用户访问根目录 `/` 时，执行控制器`WelcomeController`中的`index`方法。

##控制器
上面路由调用控制器 **app/Http/Controllers/WelcomeController.php**中的`index()`方法：

    <?php
    namespace App\Http\Controllers;
    class WelcomeController extends Controller
    {
        public function index(){
            return view('welcome');
        }
    }