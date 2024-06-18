---
layout: post
title: 执行系统命令的函数
description: css笔记
categories: ["css"]
tags: [css,笔记]
date: 2015-12-06
---
system, exec, passthru, shell_exec 这4个函数可用于执行系统命令。每个的行为都有细微差别。问题在于, 当在共享主机中, 某些函数可能被选择性的禁用. 大多数新手趋于每次首先检查哪个函数可用, 然而再使用它。更好的方案是封成函数一个可跨平台的函数。
<!-- more -->

    /** 
    Method to execute a command in the terminal  
    Uses :
    1. system
    2. passthru     
    3. exec
    4. shell_exec
    */
    function terminal($command){
        //system
        if(function_exists('system')){
            ob_start();
            system($command , $return_var);
            $output = ob_get_contents();
            ob_end_clean();
        }
        //passthru
        else if(function_exists('passthru')){
            ob_start();
            passthru($command , $return_var);
            $output = ob_get_contents();
            ob_end_clean();
        }
        //exec
        else if(function_exists('exec')){
            exec($command , $output , $return_var);
            $output = implode("\n" , $output);
        }
        //shell_exec
        else if(function_exists('shell_exec')){
            $output = shell_exec($command) ;
        }
        else{
            $output = 'Command execution not possible on this system';
            $return_var = 1;
        }
        return array('output' => $output , 'status' => $return_var);
    }
    terminal('ls');

上面的函数將运行shell命令, 只要有一个系统函数可用, 这保持了代码的一致性。