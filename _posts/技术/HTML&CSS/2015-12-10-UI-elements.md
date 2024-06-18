---
layout: post
title: 各种常见的UI元素
description: 各种常见的UI元素
categories: ['html','css']
tags: [html,css]
date: 2015-12-10
---

##按钮

####色块按钮

    <a class="btn">按钮</a>
    <style>
        .btn {background-color: #c2c2c2;color: #fff;border-radius: 3px; border: 1px solid transparent; border-radius: 4px; cursor: pointer; display: inline-block; font-size: 14px; font-weight: 400; line-height: 1.5; margin-bottom: 0; padding: 6px 12px; text-align: center; vertical-align: middle; white-space: nowrap; text-decoration: none; } 
        .btn:active,.btn:hover {background-color:#bababa; border-color:#bababa;}
    </style>

<!-- more -->
####线框按钮

    <a class="btn">按钮</a>
    <style>
        .btn {color: #c2c2c2;border-radius: 3px; border: 1px solid #c2c2c2; border-radius: 4px; cursor: pointer; display: inline-block; font-size: 14px; font-weight: 400; line-height: 1.5; margin-bottom: 0; padding: 6px 12px; text-align: center; vertical-align: middle; white-space: nowrap; text-decoration: none; }
        .btn:active,.btn:hover {background-color:#bababa; border-color:#bababa; color:#fff;}
    </style>

####3D按钮

    <a class="btn">按钮</a>
    <style>
        .btn {color: #c2c2c2;border-radius: 3px; border: 1px solid #c2c2c2; box-shadow: 0 0 0 #c2c2c2 inset, 0 5px 0 0 #c2c2c2, 0 10px 5px #999; border-radius: 4px; cursor: pointer; display: inline-block; font-size: 14px; font-weight: 400; line-height: 1.5; margin-bottom: 0; padding: 6px 12px; text-align: center; vertical-align: middle; white-space: nowrap; text-decoration: none; }
        .btn:active,.btn:hover {background-color:#bababa; border-color:#bababa; color:#fff;} 
    </style>

####按钮组

    <div class="btn-group">
        <a class="btn btn-left">左</a>
        <a class="btn">中</a>
        <a class="btn active">中</a>
        <a class="btn">中</a>
        <a class="btn btn-right">右</a>
    </div>
    <style>
        .btn-group>.btn {background: #fff none repeat scroll 0 0; border: 1px solid #e7eaec;cursor: pointer; display: inline-block; font-size: 14px; font-weight: 400; line-height: 1.5; margin-left: -1px; padding: 6px 12px; text-align: center; float: left; position: relative;vertical-align: middle; white-space: nowrap;text-decoration: none;}
        .btn-group>.btn:active, .UI-btn-group>.btn:hover {z-index:2;border-color: #d2d2d2;}
        .btn-group>.btn.active{z-index:2;border-color: #d2d2d2;box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15) inset;}
        .btn-group>.btn.btn-left {border-bottom-left-radius: 4px; border-top-left-radius: 4px; margin-left:0;}
        .btn-group>.btn.btn-right {border-bottom-right-radius: 4px; border-top-right-radius: 4px;}
    </style>



##选项卡

####横向选项卡切换

    <div class="tabs">
        <ul class="tabs-nav">
            <li class="active"><a>第一个选项卡</a></li>
            <li><a>第二个选项卡</a></li>
        </ul>
        <div class="tabs-content">
            <div class="tab tab-1 active">
                <div class="tab-body">内容1</div>
            </div>
            <div class="tab tab-2">
                <div class="tab-body">内容2</div>
            </div>
        </div>
    </div>
    <style>
        .tabs{background-color: #f3f3f3;}
        .tabs>.tabs-nav {border-bottom: 1px solid #e7eaec; display: table; margin-bottom: 0; padding-left: 0;}
        .tabs>.tabs-nav>li {display: block; float: left; margin-bottom: -1px;}
        .tabs>.tabs-nav>li>a {border: 1px solid transparent; border-radius: 4px 4px 0 0; color: #a7b1c2; cursor: pointer; display: block; font-weight: 600; line-height: 1.5; margin-right: 2px; padding: 10px 20px 10px 25px; text-decoration: none;}
        .tabs>.tabs-nav>li.active>a {background-color: #fff; border-color: #e7eaec transparent #e7eaec #e7eaec; border-width: 1px; color: #555; cursor: default;}
        .tabs>.tabs-content>.tab {display: none;}
        .tabs>.tabs-content>.tab.active {display: block;}
        .tabs>.tabs-content>.tab>.UI-tab-body {background: #fff none repeat scroll 0 0; border-color: transparent #e7eaec #e7eaec; border-radius: 2px; border-style: solid; border-width: 1px; padding: 20px;}
    </style>
    <script>
        $(document).ready(function(){
            $('.tabs-nav').on('click', 'li>a:not(".active")', function(){
                $(this).parent('li').addClass('active').siblings('li').removeClass('active');
                $('.tab.tab-'+($(this).parent('li').index()+1)).addClass('active').siblings('.tab').removeClass('active');
            });
        });
    </script>

####竖向选项卡切换


    <div class="vertical-tabs">
        <ul class="tabs-nav">
            <li class="active"><a>第一个选项卡</a></li>
            <li><a>第二个选项卡</a></li>
        </ul>
        <div class="tabs-content">
            <div class="tab tab-1 active">
                <div class="tab-body">内容1</div>
            </div>
            <div class="tab tab-2">
                <div class="tab-body">内容2</div>
            </div>
        </div>
    </div>
    <style>
        .vertical-tabs {background-color: #f3f3f3;}
        .vertical-tabs>.tabs-nav {width: 20%;float: left;padding-left: 0;}
        .vertical-tabs>.tabs-nav>li {position: relative;display: block;margin-right: -1px;background: rgba(0, 0, 0, 0) none repeat scroll 0 0;}
        .vertical-tabs>.tabs-nav>li>a {border: 1px solid transparent; border-radius: 4px 0 0 4px; color: #a7b1c2; cursor: pointer; display: block; font-weight: 600; line-height: 1.5; margin-bottom: 3px; min-width: 74px; padding: 10px 20px 10px 25px; text-decoration: none;}
        .vertical-tabs>.tabs-nav>li.active>a {background-color: #fff; border-color: #e7eaec transparent #e7eaec #e7eaec; border-width: 1px; color: #555; cursor: default;}
        .vertical-tabs>.tabs-content>.tab {display: none;}
        .vertical-tabs>.tabs-content>.tab.active {display: block;}
        .vertical-tabs>.tabs-content>.tab>.tab-body {background: #fff none repeat scroll 0 0; border: 1px solid #e7eaec; border-radius: 2px; margin-left: 20%; padding: 20px; width: 80%;}
    </style>
    <script>
        $(document).ready(function(){
            $('.tabs-nav').on('click', 'li>a:not(".active")', function(){
                $(this).parent('li').addClass('active').siblings('li').removeClass('active');
                $('.tab.tab-'+($(this).parent('li').index()+1)).addClass('active').siblings('.tab').removeClass('active');
            });
        });
    </script>


##面板

####Bootstrap面板


    <div class="panel">
        <div class="panel-heading">默认面板</div>
        <div class="panel-body">
            <p></p>
        </div>
    </div>
    <style>
        .panel {background-color: #fff; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 20px;width: 45%;float: left;margin-right: 2%;}
        .panel>.panel-heading {border-bottom: 1px solid transparent;border-top-left-radius: 3px; border-top-right-radius: 3px; padding: 10px 15px; background-color: #ddd; border-color: #ddd; color: #333;}
        .panel>.panel-body{padding: 15px;}
        .panel>.panel-body>p {margin: 0 0 10px;}
    </style>


####折叠面板

    <div class="collapse-panels">
        <div class="collapse-panel">
            <div class="collapse-panel-heading"><h5 class="collapse-panel-title"><a>标题#1</a></h5></div>
            <div class="collapse-panel-body">内容#1</div>
        </div>
        <div class="collapse-panel">
            <div class="collapse-panel-heading"><h5 class="collapse-panel-title"><a>标题#2</a></h5></div>
            <div class="collapse-panel-body">内容#2</div>
        </div>
        <div class="collapse-panel">
            <div class="collapse-panel-heading"><h5 class="collapse-panel-title"><a>标题#3</a></h5></div>
            <div class="collapse-panel-body">内容#3</div>
        </div>
    </div>
    <style>
        .collapse-panels>.collapse-panel { background-color: #fff; border: 1px solid #ddd; border-radius: 4px; margin-top: 5px;}
        .collapse-panels>.collapse-panel>.collapse-panel-heading{background-color: #f5f5f5; border-bottom: 1px solid #ddd; border-top-left-radius: 3px; border-top-right-radius: 3px; color: #333; padding: 10px 15px;}
        .collapse-panels>.collapse-panel>.collapse-panel-heading>.collapse-panel-title{font-size: 13px; margin-bottom: 0; margin-top: 5px;}
        .collapse-panels>.collapse-panel>.collapse-panel-heading>.collapse-panel-title>a{cursor: pointer; text-decoration: none;} 
        .collapse-panels>.collapse-panel>.collapse-panel-body{border-top-color: #ddd; display: none; padding: 15px;}
    </style>
    <script>
        $(document).ready(function() {
            $('.collapse-panels>.collapse-panel>.collapse-panel-heading>.collapse-panel-title').on('click', 'a', function() {
                $(this).parents('.collapse-panel').find('.collapse-panel-body').toggle('slow')
                $(this).parents('.collapse-panel').siblings('.collapse-panel').find('.collapse-panel-body').hide('slow');
            });
        });
    </script>


#END