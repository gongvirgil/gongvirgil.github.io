---
layout: post
title: php获取文件夹下所有文件，包含子文件夹
description: php获取文件夹下所有文件，包含子文件夹
category: PHP
tags: [php,文件夹]
date: 2015-12-17
---

    /**
     * 获取文件夹下所有文件
     * @param $directory 需要获取的文件夹
     * @param bool $recursive 是否递归获取子文件夹
     * @return array
     */
    function directoryToArray($directory, $recursive = false) {
        $array_items = array();
        if(!is_dir($directory)) return "$directory folder does not exist";
        if ($handle = opendir($directory)) {
            while (false !== ($file = readdir($handle))) {
                if ($file != "." && $file != "..") {
                    if (is_dir($directory. "/" . $file)) {
                        if($recursive) {
                            $array_items = array_merge($array_items, directoryToArray($directory. "/" . $file, $recursive));
                        }
                        $file = $directory . "/" . $file;
                        $array_items[] = preg_replace("/\/\//si", "/", $file);
                    } else {
                        $file = $directory . "/" . $file;
                        $array_items[] = preg_replace("/\/\//si", "/", $file);
                    }
                }
            }
            closedir($handle);
        }
        return $array_items;
    }

    //调用
    $files = directoryToArray('../project/353438199e',true);
    var_dump($files);

php5.3新增了一些新的方法来实现，如`RecursiveIteratorIterator` 、`scandir`。