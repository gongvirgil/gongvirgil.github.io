---
layout: post
title: 面试中遇到的一些问题总结
description: 面试中遇到的一些问题总结
categories: ["[技术]"]
tags: [面试,技术,Web]
date: 2016-03-30
---

## Linux 常用的一些命令

### cd

### ls

### grep

### find

### cp/mv/rm

### ps

### kill

### file

### tar

### cat

### chgrp/chown/chmod

### vim

### time

### df

## mysql 数据库的索引认知

[http://www.tuicool.com/articles/ZRN3qu](http://www.tuicool.com/articles/ZRN3qu)

## PHP的MVC实现原理分析

	MVC三个字母的含义：

	M：Model 模型，负责数据库操作。
	V：View 视图，负责调用Model调取数据，再调用模板，展示出最终效果。
	C：Controller 控制器，程序的入口，决定改调用哪个View，并告诉View该做什么。

　　下面是一个超级简单的MVC结构实现：

	Controller.php

	include 'Model.php';
	include 'View.php';

	class Controller {
	    private $model     = '';
	    private $view     = '';
	    
	    public function Controller(){
	        $this->model    =    new Model();
	        $this->view        =    new View();
	    }
	    
	    public function doAction( $method = 'defaultMethod', $params = array() ){
	        if( empty($method) ){
	            $this->defaultMethod();
	        }else if( method_exists($this, $method) ){
	            call_user_func(array($this, $method), $params);
	        }else{
	            $this->nonexisting_method();
	        }
	    }
	    
	    public function link_page($name = ''){
	        $links = $this->model->getLinks();
	        $this->view->display($links);
	        
	        $result = $this->model->getResult($name);
	        $this->view->display($result);
	    }
	    
	    public function defaultMethod(){
	        $this->br();
	        echo "This is the default method. ";
	    }
	    
	    public function nonexisting_method(){
	        $this->br();
	        echo "This is the noexisting method. ";
	    }
	    
	    public function br(){
	        echo "<br />";
	    }
	}


	$controller = new Controller();
	$controller->doAction('link_page', 'b');
	$controller->doAction();

	Model.php

	class Model {
	    private $database = array(
	        "a"    =>    "hello world",
	        "b"    =>    "ok well done",
	        "c"    =>    "good bye",
	    );
	    
	    //@TODO connect the database
	    
	    //run the query and get the result
	    public function getResult($name){
	        if( empty($name) ){
	            return FALSE;
	        }
	        
	        if( in_array($name, array_keys( $this->database ) ) ){
	            return $this->database[$name];
	        }
	    }

	    public function getLinks(){
	        $links = "<a href='#'>Link A</a>&nbsp;&nbsp;";
	        $links.= "<a href='#'>Link B</a>&nbsp;&nbsp;";
	        $links.= "<a href='#'>Link C</a>&nbsp;&nbsp;";
	        
	        return $links;
	    }
	}


	View.php

	class View {
	    
	    public function display($output){
	//        ob_start();
	        
	        echo $output;
	    }
	    
	}

[http://www.jb51.net/article/49498.htm](http://www.jb51.net/article/49498.htm)

## thinkPHP框架的优劣


