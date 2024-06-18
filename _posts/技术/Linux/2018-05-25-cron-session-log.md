---
layout: post
title: session opened/closed for user root by (uid=0)
description: session opened/closed for user root by (uid=0)
categories: ["Linux"]
tags: [Linux,Cron]
date: 2018-05-25
---

服务器出现大量这种日志使得 `/var/` 目录占用磁盘空间巨大：

```
# tail -f /var/log/auth.log
May 25 14:40:01 1204developer CRON[2191]: pam_unix(cron:session): session opened for user www-data by (uid=0)
May 25 14:40:01 1204developer CRON[2193]: pam_unix(cron:session): session opened for user www-data by (uid=0)
May 25 14:40:01 1204developer CRON[2192]: pam_unix(cron:session): session opened for user www-data by (uid=0)
May 25 14:40:01 1204developer CRON[2192]: pam_unix(cron:session): session closed for user www-data
May 25 14:40:01 1204developer CRON[2190]: pam_unix(cron:session): session closed for user www-data
May 25 14:40:01 1204developer CRON[2191]: pam_unix(cron:session): session closed for user www-data
May 25 14:41:01 1204developer CRON[2189]: pam_unix(cron:session): session closed for user smmsp
May 25 14:41:01 1204developer CRON[12928]: pam_unix(cron:session): session opened for user www-data by (uid=0)
May 25 14:41:02 1204developer CRON[12928]: pam_unix(cron:session): session closed for user www-data
May 25 14:41:09 1204developer CRON[2193]: pam_unix(cron:session): session closed for user www-data
```

<!-- more -->

解决方案：

* 进入到目录 `/etc/pam.d`
* 打开文件 `common-session-noninteractive`
* 找到这一行

```
session required        pam_unix.so
```

* 在这行上方，添加如下一行

```
session     [success=1 default=ignore] pam_succeed_if.so service in cron quiet use_uid
```

* 保存后，使用命令 `service cron restart` 重启 `crond`

http://languor.us/cron-pam-unix-cron-session-session-opened-closed-user-root-uid0

> 原文出处：[Cron: pam_unix (cron:session): session opened/closed for user root by (uid=0)](http://languor.us/cron-pam-unix-cron-session-session-opened-closed-user-root-uid0)