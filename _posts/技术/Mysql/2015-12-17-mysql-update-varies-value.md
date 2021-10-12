---
layout: post
title: mysql批量更新多条记录的不同值
description: mysql批量更新多条记录的不同值
category: mysql
tags: [mysql,update]
date: 2015-12-17
---

如果更新多条数据为不同的值，可能很多人会这样写：

    foreach ($display_order as $id => $ordinal) {
        $sql = "UPDATE categories SET display_order = $ordinal WHERE id = $id";
        mysql_query($sql);
    }

即是循环一条一条的更新记录。一条记录update一次，这样性能很差，也很容易造成阻塞。  
那么能不能一条sql语句实现批量更新呢？  
mysql并没有提供直接的方法来实现批量更新，但是可以用`case when`来实现。

    UPDATE mytable
        SET myfield = CASE id
            WHEN 1 THEN 'value'
            WHEN 2 THEN 'value'
            WHEN 3 THEN 'value'
        END
    WHERE id IN (1,2,3)

<!-- more -->
这里的where部分不影响代码的执行，但是会提高sql执行的效率。确保sql语句仅执行需要修改的行数，这里只有3条数据进行更新，而where子句确保只有3行数据执行。  

如果更新多个值的话，只需要稍加修改： 

    UPDATE categories
        SET display_order = CASE id
            WHEN 1 THEN 3
            WHEN 2 THEN 4
            WHEN 3 THEN 5
        END,
        title = CASE id
            WHEN 1 THEN 'New Title 1'
            WHEN 2 THEN 'New Title 2'
            WHEN 3 THEN 'New Title 3'
        END
    WHERE id IN (1,2,3)

在业务中运用，需要结合服务端语言，这里以php为例，构造这条mysql语句：

    $display_order = array(
        1 => 4,
        2 => 1,
        3 => 2,
        4 => 3,
        5 => 9,
        6 => 5,
        7 => 8,
        8 => 9
    );
     
    $ids = implode(',', array_keys($display_order));
    $sql = "UPDATE categories SET display_order = CASE id ";
    foreach ($display_order as $id => $ordinal) {
        $sql .= sprintf("WHEN %d THEN %d ", $id, $ordinal);
    }
    $sql .= "END WHERE id IN ($ids)";
    echo $sql; 