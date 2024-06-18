---
layout: post
title: 从Mysql某一表中随机读取n条数据的SQL查询语句 
description: 从Mysql某一表中随机读取n条数据的SQL查询语句
category: mysql
tags: [mysql]
date: 2015-11-26
---


若要在`i ≤ R ≤ j`这个范围得到一个随机整数R ，需要用到表达式 `FLOOR(i + RAND() * (j – i + 1))`。
例如， 若要在7 到 12 的范围（包括7和12）内得到一个随机整数, 可使用以下语句：

    SELECT FLOOR(7 + (RAND() * 6));

<!-- more -->

 

从 Mysql 表中随机读取数据不难，方法还挺多的，但是如果要考虑效率，得到一个快速的高效率的方法，那就不是一件简单的事情了（至少对我来说不简单）。

随机获得Mysql数据表的一条或多条记录有很多方法，下面我就以users（userId，userName，password……）表（有一百多万条记录）为例，对比讲解下几个方法效率问题：

    select * from      users order by rand() LIMIT 1

执行该sql语句，老半天没有反应，最后被迫手动停止执行，怎个伤人了得啊！后来我查了一下MYSQL手册，里面针对RAND()的提示大概意思就是，在 ORDER BY从句里面不能使用RAND()函数，因为这样会导致数据列被多次扫描，导致效率相当相当的低！效率不行，切忌使用！

    SELECT * FROM      users  AS t1  JOIN (SELECT ROUND(RAND() * ((SELECT MAX(userId)      FROM `users`)-(SELECT MIN(userId) FROM users))+(SELECT MIN(userId) FROM      users)) AS userId) AS t2 WHERE t1.userId >= t2.userId ORDER BY      t1.userId LIMIT 1

执行该sql语句，用时0.031s，效率没说的，相当的给力！心里那个爽啊，紧接着，我把`LIMIT 1`改为了`LIMIT 100` 随机取一百条记录，用时0.048，给力吧。可是就在此时问题出现了，发现结果好像不是随机的？为了验证结果，又执行了N次，真不是随机的， 问题出现在”ORDER BY t1.userId“这里，按userId排序了。随机取一条记录还是不错的选择，多条就不行了啊！

    SELECT * FROM      users WHERE userId >= ((SELECT MAX(userId) FROM users)-(SELECT      MIN(userId) FROM users)) * RAND() + (SELECT MIN(userId) FROM users)       LIMIT 1
    
执行该sql语句，用时0.039s，效率太给力了！接着我就把”LIMIT 1“改为了”LIMIT 10000“，用时0.063s。经过多次验证，哥对灯发誓，结果肯定是随机的！
    结论：随机取一条或多条记录，方法都不错！
    通过sql获得最大值和最小值，然后通过php的rand生成一个随机数randnum，再通过`SELECT * FROM users WHERE userId >= randnum LIMIT 1`，获得一条记录效率应该还可以，多条应该就不行了。

结论：方法1效率不行，切忌使用；随机获得一条记录，方法2是相当不错的选择，采用JOIN的语法比直接在WHERE中使用函数效率还是要高一些的，不过方法3也不错；随机获得多条记录，方法3没说的！

从Mysql某一表中随机读取n条数据的SQL查询语句其他相关资料

SQL语句先随机好ID序列，用 IN 查询（飘易推荐这个用法，IO开销小，速度最快）：

    $sql="SELECT MAX(id),MIN(id) FROM content";
    $result=mysql_query($sql,$conn);
    $yi=mysql_fetch_array($result);
    $idmax=$yi[0];
    $idmin=$yi[1];
    $idlist='';   
    for($i=1;$i<=20;$i++){   
    if($i==1){ $idlist=mt_rand($idmin,$idmax); }   
    else{ $idlist=$idlist.','.mt_rand($idmin,$idmax); }   
    } 
    $idlist2="id,".$idlist;
    $sql="select * from content where id in ($idlist) order by field($idlist2) LIMIT 0,12";
    $result=mysql_query($sql,$conn);
    $n=1;
    $rnds='';
    while($row=mysql_fetch_array($result)){
    $rnds=$rnds.$n.". <a href='show".$row['id']."-".strtolower(trim($row['title']))."'>".$row['title']."</a><br />\n";
    $n++;
    }

800万数据随机取一条的牛方法

    mysql> select FLOOR(id*rand()) from test_rand where id=(select MAX(id) from test
    _rand);
    +------------------+
    | FLOOR(id*rand()) |
    +------------------+
    | 5225551 |
    +------------------+
    1 row in set (0.00 sec)

语句简单，速度慢的方法  

    SELECT * FROM table_name ORDER BY rand() LIMIT 5;

语句复杂，速度快的方法  

    SELECT * FROM table_name AS r1 JOIN (SELECT ROUND(RAND() * (SELECT MAX(id) FROM table_name)) AS id) AS r2 WHERE r1.id >= r2.id ORDER BY r1.id ASC LIMIT 5;


cjc注: ... AS id) AS t2 这里的 id, 也许该换成id2, 后面 WHERE t1.id >= t2.id 改成  WHERE t1.id >= t2.id2