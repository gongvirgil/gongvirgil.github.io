---
layout: post
title: 使用PHP+Zend_Search_Lucene做全站中文搜索引擎
description: 使用PHP+Zend_Search_Lucene做全站中文搜索引擎
category: PHP
tags: [Zend_Search_Lucene,搜索引擎,Blog]
date: 2015-12-01
---
## 1.概述

Zend_Search_Lucene是一个完全基于PHP5的通用文本搜索引擎，它将索引存储在文件系统中，不需要数据库服务器。
## 2. 安装Zend_Lucene

可以从这里下载:     [http://www.zend.com/community/downloads](http://www.zend.com/community/downloads)

也可以参考这篇文章：[http://nonfu.me/p/4650.html](http://nonfu.me/p/4650.html) 的下载目录去下载Zend Framework导入。

找到Zend文件夹下的Search目录，所需要的文件都在里面了。
<!-- more -->
## 3.创建索引

下面是创建索引的示例:

    <?php
        require_once 'Zend/Search/Lucene.php';
        $articlesData = array(
            0=>array('id'=>1,'title'=>'test','content'=>'this is a test'),
            1=>array('id'=>2,'title'=>'test php','content'=>'this is a php test'),
            2=>array('id'=>3,'title'=>'test yii','content'=>'this is a yii test'),
            3=>array('id'=>4,'title'=>'test lucene','content'=>'this is a lucene test'),
            4=>array('id'=>5,'title'=>'测试','content'=>'这是一个简单的搜索测试'),
            5=>array('id'=>6,'title'=>'测一个小试','content'=>'我们进行一个小测验吧'),
            6=>array('id'=>6,'title'=>'白色的马','content'=>'白色的小马驹')
        );
        $index = new Zend_Search_Lucene('/path/to/index',true);
        $doc = new Zend_Search_Lucene_Document();
        foreach ($articlesData as $article) {
            $doc->addField(Zend_Search_Lucene_Field::keyword('id',$article['id'],'UTF-8'));
            $doc->addField(Zend_Search_Lucene_Field::Text('title',$article['title'],'UTF-8'));
            $doc->addField(Zend_Search_Lucene_Field::keyword('content',$article['content'],'UTF-8'));
            $index->addDocument($doc);
            $index->commit();
            $index->optimize();
        }
        echo '索引创建成功！';

在实际案例中，索引数据应该来自数据库，在上面的示例中，我们的所有索引数据都可以用数据库查询的结果来替代。
## 4.搜索索引数据

创建索引之后我们就可以通过下面的代码来搜索了:

    $index = new Zend_Search_Lucene('/path/to/index');
    $keywords = "test";
    //echo "Index包含{$index->count()}条结果<br>";
    $query = Zend_Search_Lucene_Search_QueryParser::parse($keywords,'utf-8');
    $hits = $index->find($query);
    foreach($hits as $hit){
        echo $hit->id.'.';
        echo $hit->title.'<br>';
        echo $hit->content;
        echo "<br><br>";
    }

如果你想要支持多语言的文本搜索，我们可以设置属性lan的值，然后通过lan来显示不同语言的文本搜索结果。
## 5.删除及更新索引

如果你想要更新索引，首先我们必须通过keywords找到索引所在的位置，然后删除它，之后我们需要添加一个新的文档，下面是一个更新索引的示例代码，我们删除PID为1的产品并且更新描述信息.

    <?php

        require_once('Zend/Search/Lucene.php');
        $index = new Zend_Search_Lucene('index');

        //需要被更新的新数据
        $productNewData =array(
            "PID"=>1,
            "url"=>"http://nonfu.me",
            "productName"=>"icultivator",
            "Description"=>"update icultivator Description",
            "lan"=>"en");

        $keywords="PID:1";

        $hits = $index->find($keywords);

        //删除PID:1的索引
        foreach ($hits as $hit)
        {
            echo 'PID: '.$hit->PID .'has been deleted <br>';
            $index->delete($hit->id);
        }

        $index->commit();

        //添加新数据到索引
        $doc = new Zend_Search_Lucene_Document();
        $doc->addField(Zend_Search_Lucene_Field::keyword('PID', $productNewData['PID'], 'UTF-8'));
        $doc->addField(Zend_Search_Lucene_Field::Text('url', $productNewData['url'], 'UTF-8'));
        $doc->addField(Zend_Search_Lucene_Field::Text('productName', $productNewData['productName'], 'UTF-8'));
        $doc->addField(Zend_Search_Lucene_Field::Text('Description', $productNewData['Description'], 'UTF-8'));
        $doc->addField(Zend_Search_Lucene_Field::unIndexed('lan', $productNewData['lan'], 'UTF-8'));
        $index->addDocument($doc);
        $index->commit();
        $index->optimize();

## 6.搜索中文索引

默认情况下，lucene 只支持英文文本搜索，但是在本项目中，我们需要搜素英文及中文的文本，因此我们必须要改变Lucene的默认分析器。

下面的代码是Lucene默认分析器的扩展:

    <?php

    //文件名称:chinese.php
    require_once 'Zend/Search/Lucene/Analysis/Analyzer.php';
    require_once 'Zend/Search/Lucene/Analysis/Analyzer/Common.php';
    class CN_Lucene_Analyzer extends Zend_Search_Lucene_Analysis_Analyzer_Common
    {
        private $_position;
        private $_cnStopWords = array( );

        public function setCnStopWords( $cnStopWords )
        { 
            $this->_cnStopWords = $cnStopWords;
        }

        /**
         * Reset token stream
         */
        public function reset()
        {
            $this->_position = 0;
            $search = array(",", "/", "\\", ".", ";", ":", "\"", "!", "~", "`", "^", "(", ")", "?", "-", "'", "<", ">", "$", "&", "%", "#", "@", "+","=", "{", "}", "[", "]", "：", "）", "（", "．", "。", "，", "！", "；", "“", "”", "‘", "’", "［", "］", "、", "—", "　", "《", "》", "－", "…", "【","】", "？", "￥" );

            $this->_input = str_replace( $search, '', $this->_input );
            $this->_input = str_replace( $this->_cnStopWords, ' ', $this->_input );
        }

        /**
         * Tokenization stream API
         * Get next token
         * Returns null at the end of stream
         *
         * @return Zend_Search_Lucene_Analysis_Token|null
         */
        public function nextToken()
        {
            if ($this->_input === null)
            {
                return null;
            }
            $len = strlen($this->_input);
            //print "Old string：".$this->_input."<br />";
            while ($this->_position < $len)
            {
                // Delete space at the begining
                while ($this->_position < $len &&$this->_input[$this->_position]==' ' )
                {
                    $this->_position++;
                }

                $termStartPosition = $this->_position;
                $temp_char = $this->_input[$this->_position];
                $isCnWord = false;

                if(ord($temp_char)>127)
                {
                   $i = 0;
                   while( $this->_position < $len && ord( $this->_input[$this->_position] )>127 )
                   {
                       $this->_position = $this->_position + 3;
                       $i ++;
                       if($i==2)
                       {
                           $isCnWord = true;
                           break;
                       }
                   }

                   if($i==1) continue;
                }
                else{
                   while ($this->_position < $len && ctype_alnum( $this->_input[$this->_position] ))
                   {
                      $this->_position++;
                   }

                   //echo $this->_position.":".$this->_input[$this->_position-1]."\n";
                }

               if ($this->_position == $termStartPosition)
               {
                   $this->_position++;
                   continue;
               }

               $tmp_str = substr($this->_input, $termStartPosition, $this->_position - $termStartPosition);
               $token = new Zend_Search_Lucene_Analysis_Token( $tmp_str, $termStartPosition,$this->_position );
               $token = $this->normalize($token);

               if($isCnWord)
               {
                  $this->_position = $this->_position - 3;
               }

               if ($token !== null)
               {
                  return $token;
               }
            }

           return null;
        }
    }

在chinese.php的帮助下我们就可以在项目中进行中文搜索了。而且我们必须要在上述代码中添加如下两行代码.

require_once 'chinese.php';
Zend_Search_Lucene_Analysis_Analyzer::setDefault(new CN_Lucene_Analyzer());

即：

zen_lucene

修改上述搜素文本代码中的搜索文本即可进行中文搜索了，不过我感觉其中文分词效果并不是很好。