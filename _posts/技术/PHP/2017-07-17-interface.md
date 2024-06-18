---
layout: post
title: PHP类的接口`interface`
description: PHP类的接口`interface`
categories: ["php"]
tags: [php]
date: 2017-07-17
---

PHP类是单继承，也就是不支持多继承，当一个类需要多个类的功能时，继承就无能为力了，为此 PHP 引入了类的接口技术。

如果一个抽象类里面的所有方法都是抽象方法，且没有声明变量，而且接口里面所有的成员都是`public`权限的，那么这种特殊的抽象类就叫`接口`。

接口使用关键字`interface`来定义，并使用关键字`implements`来实现接口中的方法，且必须完全实现。

<!-- more -->

例子：

    <?php
    //定义接口
    interface User{
        function getDiscount();
        function getUserType();
    }
    //VIP用户 接口实现
    class VipUser implements User{
        // VIP 用户折扣系数
        private $discount = 0.8;
        function getDiscount() {
            return $this->discount;
        }
        function getUserType() {
            return "VIP用户";
        }
    }
    class Goods{
        var $price = 100;
        var $vc;
        //定义 User 接口类型参数，这时并不知道是什么用户
        function run(User $vc){
            $this->vc = $vc;
            $discount = $this->vc->getDiscount();
    	$usertype = $this->vc->getUserType();
            echo $usertype."商品价格：".$this->price*$discount;
        }
    }

    $display = new Goods();
    $display ->run(new VipUser);	//可以是更多其他用户类型
    ?>

运行该例子，输出：

VIP用户商品价格：80 元 

该例子演示了一个 PHP 接口的简单应用。该例子中，User 接口实现用户的折扣，而在 VipUser 类里面实现了具体的折扣系数。最后商品类 Goods 根据 User 接口来实现不同的用户报价。

该例子仅限于演示 PHP 接口的用法，不涉及其科学与否。

实现多个接口

PHP也可以在继承一个类的时候同时实现多个接口：

    class 子类 extends 父类 implemtns 接口1, 接口2, ...
    {
        ......
    }

抽象类和接口的区别

接口是特殊的抽象类，也可以看做是一个模型的规范。接口与抽象类大致区别如下：

一个子类如果 implements 一个接口，就必须实现接口中的所有方法（不管是否需要）；如果是继承一个抽象类，只需要实现需要的方法即可。
如果一个接口中定义的方法名改变了，那么所有实现此接口的子类需要同步更新方法名；而抽象类中如果方法名改变了，其子类对应的方法名将不受影响，只是变成了一个新的方法而已（相对老的方法实现）。
抽象类只能单继承，当一个子类需要实现的功能需要继承自多个父类时，就必须使用接口。
