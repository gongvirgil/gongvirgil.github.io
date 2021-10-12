---
layout: post
title: 常用的jQuery小技巧
description: 常用的jQuery小技巧
category: jQuery
tags: [jQuery]
date: 2015-10-21
---
　1. 如何创建嵌套的过滤器

    //允许你减少集合中的匹配元素的过滤器，  
    //只剩下那些与给定的选择器匹配的部分。在这种情况下，  
    //查询删除了任何没（:not）有（:has）  
    //包含class为“selected”（.selected）的子节点。  
    .filter(":not(:has(.selected))") 
<!-- more -->
　　2. 如何重用元素搜索

    var allItems = $("div.item");  
    var keepList = $("div#container1 div.item");  
    //现在你可以继续使用这些jQuery对象来工作了。例如，  
    //基于复选框裁剪“keep list”，复选框的名称  
    //符合
    <DIV>class names:x
    $(formToLookAt + " input:checked").each(function() {  
        keepList = keepList.filter("." + $(this).attr("name"));  
    });  
    </DIV> 

　　3. 任何使用has()来检查某个元素是否包含某个类或是元素

    //jQuery 1.4.*包含了对这一has方法的支持。该方法找出  
    //某个元素是否包含了其他另一个元素类或是其他任何的  
    //你正在查找并要在其之上进行操作的东东。  
    $("input").has(".email").addClass("email_icon"); 

    　　4. 如何使用jQuery来切换样式表

    //找出你希望切换的媒体类型（media-type），然后把href设置成新的样式表。  
  

　　5. 如何限制选择范围（基于优化目的）

    //尽可能使用标签名来作为类名的前缀，  
    //这样jQuery就不需要花费更多的时间来搜索  
    //你想要的元素。还要记住的一点是，  
    //针对于你的页面上的元素的操作越具体化，  
    //就越能降低执行和搜索的时间。  
    var in_stock = $('#shopping_cart_items input.is_in_stock');
    <ul id="shopping_cart_items">
     <li><input type="radio" value="Item-X" name="item" class="is_in_stock" />Item X</li>
     <li><input type="radio" value="Item-Y" name="item" class="3-5_days" />Item Y</li>
     <li><input type="radio" value="Item-Z" name="item" class="unknown" />Item Z</li>
    </ul> 

　　6. 如何正确地使用ToggleClass

    //切换（toggle）类允许你根据某个类的  
    //是否存在来添加或是删除该类。  
    //这种情况下有些开发者使用：  
    a.hasClass('blueButton') ? a.removeClass('blueButton') : a.addClass('blueButton');
    //toggleClass允许你使用下面的语句来很容易地做到这一点  
    a.toggleClass('blueButton'); 

　　7. 如何设置IE特有的功能

    if ($.browser.msie) {
     // Internet Explorer其实不那么好用  
    } 

　　8. 如何使用jQuery来代替一个元素

    $('#thatdiv').replaceWith('fnuh'); 

　　9. 如何验证某个元素是否为空

    if ($('#keks').html()) {
     //什么都没有找到;  
    } 

　　10. 如何从一个未排序的集合中找出某个元素的索引号

    $("ul > li").click(function () {
     var index = $(this).prevAll().length;
    }); 

　　11. 如何把函数绑定到事件上

    $('#foo').bind('click', function () {
     alert('User clicked on "foo."');
    }); 

　　12. 如何追加或是添加html到元素中

      $('#lal').append('sometext'); 

　　13. 在创建元素时，如何使用对象字面量（literal）来定义属性

var e = $("", { href: "#", class: "a-class another-class", title: "..." }); 

　　14. 如何使用多个属性来进行过滤

//在使用许多相类似的有着不同类型的input元素时，  
//这种基于精确度的方法很有用  
var elements = $('#someid input[type=sometype][value=somevalue]').get(); 

　　15. 如何使用jQuery来预加载图像

    jQuery.preloadImages = function () {
     for (var i = 0; i < arguments.length; i++) {
         $("<img />").attr('src', arguments[i]);
     }
    };
    //用法  
    $.preloadImages('image1.gif', '/path/to/image2.png', 'some/image3.jpg'); 

　　16. 如何为任何与选择器相匹配的元素设置事件处理程序

    $('button.someClass').live('click', someFunction);
    //注意，在jQuery 1.4.2中，delegate和undelegate选项  
    //被引入代替live，因为它们提供了更好的上下文支持  
    //例如，就table来说，以前你会用  
    //.live()  
    $("table").each(function () {
     $("td", this).live("hover", function () {
         $(this).toggleClass("hover");
     });
    });
    //现在用  
    $("table").delegate("td", "hover", function () {
     $(this).toggleClass("hover");
    }); 

　　17. 如何找到一个已经被选中的option元素

    $('#someElement').find('option:selected'); 

　　18. 如何隐藏一个包含了某个值文本的元素

    $("p.value:contains('thetextvalue')").hide(); 

　　19. 如果自动滚动到页面中的某区域

      jQuery.fn.autoscroll = function(selector) {  
       $('html,body').animate(  
           {scrollTop: $(selector).offset().top},  
           500  
       };  
      }  
      //然后像这样来滚动到你希望去到的class/area上。  
      $('.area_name').autoscroll();  

　　20. 如何检测各种浏览器

    if( $.browser.safari)  //检测Safari
    if ($.browser.msie && $.browser.version > 6 )//检测IE6及之后版本
    if ($.browser.msie && $.browser.version <= 6 )  //检测IE6及之前版本
    if ($.browser.mozilla && $.browser.version >= '1.8' )   //检测FireFox 2及之后版本 

　　21. 如何替换串中的词

      var el = $('#id');    
      el.html(el.html().replace(/word/ig, '')); 

　　22. 如何禁用右键单击上下文菜单

      $(document).bind('contextmenu', function (e) {
       return false;
      }); 

　　23. 如何定义一个定制的选择器

$.expr[':'].mycustomselector = function(element, index, meta, stack){  
 // element- 一个DOM元素  
 // index – 栈中的当前循环索引  
 // meta – 有关选择器的元数据  
 // stack – 要循环的所有元素的栈  
 // 如果包含了当前元素就返回true  
 // 如果不包含当前元素就返回false };  
 // 定制选择器的用法：  
 $('.someClasses:test').doSomething(); 

　　24. 如何检查某个元素是否存在

if ($('#someDiv').length) {
 //你妹，终于找到了
} 

　　25. 如何使用jQuery来检测右键和左键的鼠标单击两种情况

$("#someelement").live('click', function (e) {
 if ((!$.browser.msie && e.button == 0) || ($.browser.msie && e.button == 1)) {
     alert("Left Mouse Button Clicked");
 } else if (e.button == 2) {
     alert("Right Mouse Button Clicked");
 }
}); 

　　26. 如何显示或是删除input域中的默认值

//这段代码展示了在用户未输入值时，  
//如何在文本类型的input域中保留  
//一个默认值  
wap_val = [];
$(".swap").each(function (i) {
 wap_val[i] = $(this).val();
 $(this).focusin(function () {
     if ($(this).val() == swap_val[i]) {
 $(this).val("");
     }
 }).focusout(function () {
     if ($.trim($(this).val()) == "") {
 $(this).val(swap_val[i]);
     }
 });
}); 

　　27. 如何在一段时间之后自动隐藏或关闭元素（支持1.4版本）

//这是1.3.2中我们使用setTimeout来实现的方式  
setTimeout(function () {
 $('.mydiv').hide('blind', {}, 500)
}, 5000);
//而这是在1.4中可以使用delay()这一功能来实现的方式（这很像是休眠）  
$(".mydiv").delay(5000).hide('blind', {}, 500); 

　　28. 如何把已创建的元素动态地添加到DOM中

var newDiv = $('');
newDiv.attr('id', 'myNewDiv').appendTo('body'); 

　　29. 如何限制“Text-Area”域中的字符的个数

jQuery.fn.maxLength = function (max) {
 this.each(function () {
     var type = this.tagName.toLowerCase();
     var inputType = this.type ? this.type.toLowerCase() : null;
     if (type == "input" && inputType == "text" || inputType == "password") {
 this.maxLength = max;
     }
     else if (type == "textarea") {
 this.onkeypress = function (e) {
  var ob = e || event;
  var keyCode = ob.keyCode;
  var hasSelection = document.selection
      ? document.selection.createRange().text.length > 0
      : this.selectionStart != this.selectionEnd;
  return !(this.value.length >= max
      && (keyCode > 50 || keyCode == 32 || keyCode == 0 || keyCode == 13)
      && !ob.ctrlKey && !ob.altKey && !hasSelection);
 };
 this.onkeyup = function () {
  if (this.value.length > max) {
      this.value = this.value.substring(0, max);
  }
 };
     }
 });
};
//用法  
$('#mytextarea').maxLength(500); 

　　30. 如何为函数创建一个基本的测试

//把测试单独放在模块中  
module("Module B");
test("some other test", function () {
 //指明测试内部预期有多少要运行的断言  
 expect(2);
 //一个比较断言，相当于JUnit的assertEquals  
 equals(true, false, "failing test");
 equals(true, true, "passing test");
}); 

　　31. 如何在jQuery中克隆一个元素

var cloned = $('#somediv').clone(); 

　　32. 在jQuery中如何测试某个元素是否可见

if ($(element).is(':visible') == 'true') {
 //该元素是可见的  
} 

　　33. 如何把一个元素放在屏幕的中心位置

jQuery.fn.center = function () {
 this.css('position', 'absolute');
 this.css('top', ($(window).height() - this.height()) 
       / +$(window).scrollTop() + 'px');
 this.css('left', ($(window).width() - this.width()) 
       / 2 + $(window).scrollLeft() + 'px');
 return this;
}
//这样来使用上面的函数：  
$(element).center(); 

　　34. 如何把有着某个特定名称的所有元素的值都放到一个数组中

var arrInputValues = new Array();
$("input[name='table[]']").each(function () {
 arrInputValues.push($(this).val());
}); 

　　35. 如何从元素中除去HTML

(function ($) {
 $.fn.stripHtml = function () {
     var regexp = /<("[^"]*"|'[^']*'|[^'">])*>/gi;
     this.each(function () {
 $(this).html($(this).html().replace(regexp, ""));
     });
     return $(this);
 }
})(jQuery);
//用法：  
$('p').stripHtml(); 

　　36. 如何使用closest来取得父元素

$('#searchBox').closest('div'); 

　　37. 如何使用Firebug和Firefox来记录jQuery事件日志

// 允许链式日志记录  
// 用法：  
$('#someDiv').hide().log('div hidden').addClass('someClass');
jQuery.log = jQuery.fn.log = function (msg) {
 if (console) {
     console.log("%s: %o", msg, this);
 }
 return this;
}; 

　　38. 如何强制在弹出窗口中打开链接

jQuery('a.popup').live('click', function () {
 newwindow = window.open($(this).attr('href'), '', 'height=200,width=150');
 if (window.focus) {
     newwindow.focus();
 }
 return false;
}); 

　　39. 如何强制在新的选项卡中打开链接

jQuery('a.newTab').live('click', function () {
 newwindow = window.open($(this).href);
 jQuery(this).target = "_blank";
 return false;
}); 

　　40. 在jQuery中如何使用.siblings()来选择同辈元素

// 不这样做  
$('#nav li').click(function () {
 $('#nav li').removeClass('active');
 $(this).addClass('active');
});
//替代做法是  
$('#nav li').click(function () {
 $(this).addClass('active').siblings().removeClass('active');
}); 

　　41. 如何切换页面上的所有复选框

var tog = false;
// 或者为true，如果它们在加载时为被选中状态的话  
$('a').click(function () {
 $("input[type=checkbox]").attr("checked", !tog);
 tog = !tog;
}); 

　　42. 如何基于一些输入文本来过滤一个元素列表

//如果元素的值和输入的文本相匹配的话  
//该元素将被返回  
$('.someClass').filter(function () {
 return $(this).attr('value') == $('input#someId').val();
}) 

　　43. 如何获得鼠标垫光标位置x和y

$(document).ready(function () {
 $(document).mousemove(function (e) {
     $('#XY').html("X Axis : " + e.pageX + " | Y Axis " + e.pageY);
 });
}); 

　　44. 如何把整个的列表元素（List Element，LI）变成可点击的

$("ul li").click(function () {
 window.location = $(this).find("a").attr("href");
 return false;
});
<ul>
 <li><a href="#">Link 1</a></li>
 <li><a href="#">Link 2</a></li>
 <li><a href="#">Link 3</a></li>
 <li><a href="#">Link 4</a></li>
</ul> 

　　45. 如何使用jQuery来解析XML（基本的例子）

function parseXml(xml) {
 //找到每个Tutorial并打印出author  
 $(xml).find("Tutorial").each(function () {
     $("#output").append($(this).attr("author") + "");
 });
} 

　　46. 如何检查图像是否已经被完全加载进来

$('#theImage').attr('src', 'image.jpg').load(function () {
 alert('This Image Has Been Loaded');
}); 

　　47. 如何使用jQuery来为事件指定命名空间

//事件可以这样绑定命名空间  
$('input').bind('blur.validation', function (e) {
 // ...  
});
//data方法也接受命名空间  
$('input').data('validation.isValid', true); 

　　48. 如何检查cookie是否启用

var dt = new Date();
dt.setSeconds(dt.getSeconds() + 60);
document.cookie = "cookietest=1; expires=" + dt.toGMTString();
var cookiesEnabled = document.cookie.indexOf("cookietest=") != -1;
if (!cookiesEnabled) {
 //没有启用cookie  
} 

　　49. 如何让cookie过期

var date = new Date();
date.setTime(date.getTime() + (x * 60 * 1000));
$.cookie('example', 'foo', { expires: date }); 

　　50. 如何使用一个可点击的链接来替换页面中任何的URL

$.fn.replaceUrl = function () {
 var regexp = 
     /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
 this.each(function () {
     $(this).html(
 $(this).html().replace(regexp, '<a href="$1">$1</a>')
     );
 });
 return $(this);
}
//用法　  
$('p').replaceUrl(); 


Tip15：Jquery触发回车事件  
        $(function () {  
            $('#target').bind('keyup', function (event) {  
                if (event.keyCode == 13) {  
                    alert("Hello~");  
                }  
            });  
        });   
-----------------------------------------------------------------  
 Tip14：获得select 的值  
　　jquery可以像获取textbox值一样获取select的值：$('select').val();  
-----------------------------------------------------------------  
Tip13：复制文本  
　　使用  window.clipboardData.setData('text', text); 可以将text文本放到系统剪贴板中，实现文本的复制功能。但是，这个方法只被IE所支持。Google Chrome 和Foxfire都不支持。所以，在使用时应先判断浏览器是否支持：if (window.clipboardData) {    window.clipboardData.setData('text', text); }  
-----------------------------------------------------------------  
Tip12：选择文本  
　　对于input或者textarea的文本选择，jquery提供了一个简单的函数完成：select()，在调用它的时候，需要确保文本框可见，并且已经获得焦点。       　　$("#txtSample").focus().select();　　//现货的焦点，然后选择文本  
-----------------------------------------------------------------  
Tip11：鼠标事件  
　　mouseover 和 mouseout、   mouseenter 和  mouseleave；这两组事件都是鼠标移入和移出元素时触发的，他们的最大区别是：   mouseover 和 mouseout是冒泡的，如果鼠标移动到它们的子元素，同样会触发该事件，而   mouseenter 和  mouseleave是不会冒泡的。       　　这个区别很重要！  
-----------------------------------------------------------------  
Tip10：页面跳转  
使用js直接对window.location.href 赋一个URL字符串值即可实现跳转。  
window.location.href = 'a.html';  
-----------------------------------------------------------------  
Tip9：jQuery对象的扩展  
$.extend(target,prop1,propN)：用一个或多个其他对象来扩展一个对象，返回这个被扩展的对象。这是jquery实现的继承方式。例如：  
　　$.extend(settings, options);  
合并settings和options，并将合并结果返回settings中，相当于options继承setting并将继承结果保存在 setting中。  
　　var settings = $.extend({}, defaults, options);  
合并defaults和options，并将合并结果返回到setting中而不覆盖default内容。可以有多个参数（合并多项并返回）  
-----------------------------------------------------------------  
Tip8：jQuery删除数组中的项  
如Tip7中所说，使用$.grep()方法删除数组中的元素。  
var array = ['a', 'b', 'c'];   
$.grap(array, function(value, index){return value=='b';}, true);  
上面的代码将删除数组array中的元素'b'。  
-----------------------------------------------------------------  
Tip7：jQuery数组的处理  
$.each(obj, fn);  
　　对obj进行遍历，obj为要遍历的数组或对象；fn为处理函数，可选的参数为索引和内容，例如var fn = function(index, content){}；如果需要结束遍历，请返回false，其它的返回值将会被忽略。  
　　该方法可以用来处理JSON数据对象。  
$.inArray(obj, array);  
　　判断数组array中是否包含obj对象，如果存在，返回对应的下标，如果不存在，返回-1；  
$.map(array, fn);  
　　将一个数组中的元素转换到另一个数组中。array为需要转换的数组，fn为处理函数；这个方法的返回值是一个经过处理后的新数组。  
$.merge(array1, array2);  
　　合并两个数组；将数组array2中的内容复制到array1中，并将结果返回。merge方法不会去除重复，需要使用 $.unique()去除重复。  
$.unique(array);  
　　去除数组array中的重复项。  
$.grep(array, fn, [invert]);  
　　过滤数组中的元素；该方法对数组array中的每一个对象都调用fn方法；  
　　invert 可选参数；如果 "invert" 为 false 或未设置，则函数返回数组中由过滤函数返回 true 的元素，当"invert" 为 true，则返回过滤函数中返回 false 的元素集。  
　　该方法常用来删除数组中的元素  
-----------------------------------------------------------------  
Tip6：去除string开头和结尾的空格  
js中没有提供trim函数供我们去掉字符串两段的空字符，jQuery中扩展了这一功能：  
$.trim(str)：删除字符串两端的空白字符。  
如：$.trim(" hello, how are you? "); //返回"hello,how are you? "  
-----------------------------------------------------------------  
Tip5：添加事件和移除事件  
为一个jQuery对象添加事件是很方便的事情：  
$('#btn').click(fn);  
$('#btn').bind('click', fn);  
jQuery提供了为一个对象的事件提供多个处理函数的机制，我们添加了一个click事件处理方法后，还可以继续添加，而不会覆盖先前的处理方法。  
当调用unbind方法时移除绑定的事件订阅：  
$('#btn').unbind();　　　　//将会移除所有的事件订阅  
$('#btn').unbind('click')　　//将会移除click事件的订阅  
-----------------------------------------------------------------  
Tip4：扩展需要的功能  
jQuery提供了extend方法让我们来扩展自己需要的功能。例如：  
$.extend({  
　　sum: function(num1, num2){return num1+num2; },  
}); //为jquery扩展了sum方法  
  
使用扩展的方法（通过“$.方法名”调用）：  
alert($.sum(10, 20));  
-----------------------------------------------------------------  
Tip3：获取jQuery对象集合中的一项  
　　对于获取的元素集合，获取其中的某一项（通过索引指定）可以使用eq或get(n)方法或者索引号获取，要注意，eq返回的是jquery对象，而 get(n)和索引返回的是dom元素对象。对于jquery对象只能使用jquery的方法，而dom对象只能使用dom的方法，如要获取第三个<div>元素的内容。有如下两种方法：  
　　$("div").eq(2).html(); 　　　　 //调用jquery对象的方法  
　　$("div").get(2).innerHTML; 　　//调用dom的方法属性  
-----------------------------------------------------------------  
Tip2：jQuery对象和Dom的转换  
Dom对象可以通过$(dom)转换为jQuery对象；例如：  
　　$(document.getElementById('#myDiv'))  
jQuery对象本身是一个索引，可以通过下标得到Dom对象；也可以使用方法get()获取Dom对象；例如：  
　　$("div")[0];　　　　//获取第一个Dom对象  
　　$("div").get(0);　　//同样获取第一个Dom对象  
-----------------------------------------------------------------  
Tip1：在独立的js文件中智能感知  
在js文件的开头添加：/// <reference path="jquery-1.3.2-vsdoc2.js" />  
  
  
1) 检查IE是否是版本6   
    
   
if ( (jQuery.browser.msie) && (parseInt(jQuery.browser.version) < 7) ) {    
    $('body').prepend('<div class="warning">You are using an old version of Internet Explorer which is not supported.  Please upgrade your browser in order to view this website.</div>');    
}    
  
  
2) 打开一个打印的窗口   
   
   
[url=#]Print this page[/url]    
$('a.print').click(function(){    
    window.print();    
    return false;    
});    
  
  
3 禁止表单使用回车键   
    
   
$("#form").keypress(function(e) {    
  if (e.which == 13) {    
    return false;    
  }    
});    
  
  
4 全选和反选checkbox   
   
   
 <div class="options">    
    [list]    
        [*][url=#]Select All[/url]    
    
        [*][url=#]Reset All[/url]    
    
    [/list]    
    
    <input type="checkbox" id="option1" /><label for="option1">Option 1</label>    
    <input type="checkbox" id="option2" /><label for="option2">Option 2</label>    
    <input type="checkbox" id="option3" /><label for="option3">Option 3</label>    
    <input type="checkbox" id="option4" /><label for="option4">Option 4</label>    
</div>    
$('.select-all').live('click', function(){    
    $(this).closest('.options').find('input[type=checkbox]').attr('checked', true);    
    return false;    
});    
    
$('.reset-all').live('click', function(){    
    $(this).closest('.options').find('input[type=checkbox]').attr('checked', false);    
    return false;    
});    
  
  
5 平均分各个列   
  有的时候,需要在表格中让各个列等分,可以这样   
   
var max_height = 0;    
$("div.col").each(function(){    
    if ($(this).height() > max_height) { max_height = $(this).height(); }    
});    
$("div.col").height(max_height);    
  
  
6 将所有的连接用新建窗口打开   
    
   
$('a[@rel$='external']').click(function(){    
     this.target = "_blank";    
});