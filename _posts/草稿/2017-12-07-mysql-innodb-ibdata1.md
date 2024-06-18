---
layout: post
title: ibdata1占用空间大-释放MySQL-ibdata1文件的空间
description: ibdata1占用空间大-释放MySQL-ibdata1文件的空间-innodb共享表空间转化为独立表空间
categories: ["MySQL"]
tags: [MySQL]
date: 2017-12-07
published: false
---

说明： mysql有多种存储引擎，比如MyISAM、InnoDB很常用。 如果用的InnoDB， 且使用mysql默认的配置文件，MySQL的数据都会存放在ibdata1文件中，经过一段时间此文件会变的非常大，占用大量磁盘空间。如何把mysql占用的空间释放出来。

mysql ibdata1存放数据，索引等，是MYSQL的最主要的数据。


## 备份数据库

备份全部数据库，执行命令`mysqldump  -uusername -ppassword  --all-databases > /backup/all.sql` 或者只备份需要的库。

## 删除数据库

drop database A;
drop database B;

## 停止数据库

service mysql stop 

## innodb共享表空间转化为独立表空间

mysql> show variables like '%per_table';  
+-----------------------+-------+  
| Variable_name         | Value |  
+-----------------------+-------+  
| innodb_file_per_table | OFF   |  
+-----------------------+-------+

修改/etc/mysql/my.cnf文件，增加下面配置，对每张表使用单独的innoDB文件
innodb_file_per_table = 1


## 删除原数据文件

删除原来的ibdata1文件及日志文件ib_logfile*，删除data目录下的应用数据库文件夹(mysql,test,information_schema数据库本身文件夹不要删除)

## 还原数据库

启动数据库服务service mysql start
还原全部数据库，执行命令`mysql -uusername -ppassword < /backup/all.sql`


