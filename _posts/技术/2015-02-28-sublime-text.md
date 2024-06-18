---
layout: post
title: Sublime Text Snippets(代码片段)功能
description: Sublime Text Snippets(代码片段)功能
categories: ["软件"]
tags: ['sublime','work','code','soft']
date: 2015-02-28
---
我们在编写代码的时候，总会遇到一些需要反复使用的代码片段。这时候就需要反复的复制和黏贴，大大影响效率。我们利用`Sublime Text`的snippet功能，就能很好的解决这一问题。通俗的讲，就是把我们常用的代码分别保存起啦，然后通过插件的形式来反复调用。
<!-- more -->
创建方法：Tools > New Snippet
弹出如下示例代码：

    <snippet>
         <content><![CDATA[
    Hello, ${1:this} is a ${2:snippet}.
    ]]></content>
         <!-- Optional: Set a tabTrigger to define how to trigger the snippet -->
         <!-- <tabTrigger>hello</tabTrigger> -->
         <!-- Optional: Set a scope to limit where the snippet will trigger -->
         <!-- <scope>source.python</scope> -->
    </snippet>

完整的结构和说明：

    <snippet>
        <content><![CDATA[ 你需要插入的代码片段${1:name} ]]></content>
        <!-- 可选：快捷键，利用Tab自动补全代码的功能 -->
        <tabTrigger>html5</tabTrigger>
        <!-- 可选：使用范围，不填写代表对所有文件有效。附：source.css和test.html分别对应不同文件。 -->
        <scope>source.python</scope>
        <!-- 可选：在snippet菜单中的显示说明（支持中文）。如果不定义，菜单则显示当前文件的文件名。 -->
        <description>My Fancy Snippet</description>
    </snippet>

${1:name}表示代码插入后，光标所停留的位置，可同时插入多个。其中:name为自定义参数（可选）。
${2}表示代码插入后，按Tab键，光标会根据顺序跳转到相应位置（以此类推）。

现在，你应该有了个大致的了解。那我们就开始自己动手编写一个实例：

    <snippet>
         <content>
         <![CDATA[
            <!doctype html> 
            <html> 
            <head> 
                <meta charset="utf-8"> 
                <title>${1}</title> 
            </head>
            <body>
                <h1>${1}</h1>
                Hello, ${2:this} is a ${3:snippet}.
            </body>
            </html>
         ]]>
         </content>
         <tabTrigger>html5</tabTrigger>
         <description>html5框架代码段</description>
         <scope>text.html</scope>
    </snippet>

创建完毕以后，保存在\Packages\User目录下（例win7下：`C:\Users\[用户]\AppData\Roaming\Sublime Text 2\Packages\User\html5.sublime-snippet`  ），文件命名为html5，后缀名`.sublime-snippet`。

此时我们打开一个html文件，输入html5，再按Tab键，刚才我们所编写的代码段，就插入了进来。并且此时的光标停留在我们所标记的${1}位置处，如果我们再按下Tab，那么光标就跳转到${2}的位置。由于我们在scope中定义了仅在html文件中使用，所以此时如果我们打开的是css或其他格式的文件，那将无法插入代码段。

补充：除了利用快捷键Tab出代码之外，我们还能通过菜单来加载，打开Tools > Snippet，选择Snippet: custom-footer。如果你没有定义description，那此时便会看到以我们文件名为命名的Snippet: html5选项。
