var getQueryParm =  function(name){
  var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
  if(result == null || result.length < 1){
  return "";
  }
  return decodeURI(result[1]);
}
//代码高亮
$(document).ready(function(){
  $('pre').addClass('prettyprint linenums'); //添加Google code Hight需要的class
  $.getScript('/public/js/prettify.js',function(){
      prettyPrint();
  });
})
//返回顶部
$(document).ready(function(){
  $(window).scroll(function(){
      if ($(document).scrollTop() > 200 ) 
          $('.goTop').show();
      else 
          $('.goTop').hide();
  });
  $('#goTop_btn').click(function(){
      $('html, body').animate({scrollTop: 0}, 600);
  });
})
//sitebar悬浮按钮事件
$(document).ready(function(){
  $("#sitebar-toggle-btn").click(function(event) {
    $(".sidebar").fadeToggle('50000');
    $(".main").fadeToggle('50000');
    $(this).toggleClass('active');
    $(this).find('i').toggleClass('fa-close').toggleClass('fa-search');
  });
})
//搜索框
$(document).ready(function(){
    $('#search input').bind({
      focus:function(){
        if (this.value == this.defaultValue){
          this.value="";
          $(this).css({"color":"#000","width":"150px"});
        }
      },
      blur:function(){
        if (this.value == ""){
          this.value = this.defaultValue;
          $(this).css({"color":"#999","width":"100px"});
        }
      }
    });
})
//搜索结果
$(document).ready(function(){
  $("#search-btn").click(function(event){
    var keywords = $('#search input').val();
    if(keywords==null) event.preventDefault();
    else {
      var item = '<li class="post-item"><div class="post-item-inner"><div class="search-post-item-date">@date</div><div class="post-item-title"><h3><a title="@title" href="@url">@title</a></h3></div><div class="search-post-item-tags">@tags</div></div></li>';
      $("#search-result").show();
      $(".search-posts").html('');
      var $search_result = $("#search-result").find('.search-result');
      $search_result.append('<span class="dotting"></span>');
      $.getJSON('/public/json/posts.json', function(json, jsonStatus) {
        if(jsonStatus!="success"){
          $(".search-posts").html("查询失败");
        }
        else{
          var preg_json = $.grep(json, function(n,i){
            var text = n.tags + " " +n.title;
            return text.match(keywords);
            //return text.match(/[p].+/);
          });
          $search_result.find('span').remove();
          $search_result.append("<span>["+preg_json.length+"]</span>");
          if(preg_json.length>0){
            $.each(preg_json, function(index, val) {
              var one = item.replace(/@tags/g,val.tags)
                            .replace(/@title/g,val.title)
                            .replace(eval("/"+keywords+"/g"),"<span class='underline'>"+keywords+"</span>")
                            .replace(/@date/g,val.date)
                            .replace(/@url/g,val.url);
              $(".search-posts").append(one);
            });
          }else{
            $(".search-posts").html("没有找到相关文章");
          }

        }
      });
    }
  });
  $('#search input').on('keydown', function(e) {
    if(!e) e = window.event;
    if((e.keyCode || e.which) == 13){$("#search-btn").trigger('click');}
  });
});
//
$(document).ready(function(){
  var ID = getQueryParm("TAG")||getQueryParm("CATE");
  var one = $("#"+ID).parent();
  one.show().siblings(".categories,.tags").hide();
})
//背景轮换
/*
var n=0;
function change_bg(){
  $("body").css('background','url("/public/images/bg'+n%12+'.jpg") no-repeat fixed 0 0 / 100% 100% #fff');
  n++;
}
$(document).ready(function(){
  n = Math.round(new Date().getMinutes()/5);
	change_bg();
	window.setInterval('change_bg()', 1000*60*5);	
})
*/


/*//切换版块
$(document).ready(function(){
  function animateBar($item,noAni){
    var spanLeft = $item.find('span').offset().left;
    var conLeft = $item.parent().offset().left;
    var left = spanLeft - conLeft;
    var width = $item.find('span').width() + 8;
    if(noAni){
    $('#cate_on').css({left:left,width:width})
    }else{
    $('#cate_on').stop().animate({left:left,width:width},300)
    }
  }
  var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
      if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
      }
      if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
      }
      timers[uniqueId] = setTimeout(callback, ms);
    };
  })();
  $('.nav li')
  .mouseenter(function(){
    animateBar($(this));
  })
  .mouseleave(function(){
    animateBar($('.nav .on'));
  });
  $(window).resize(function(e){
    waitForFinalEvent(function(){
      animateBar($('.nav .on'));
    })
  })
  animateBar($('.nav .on'),true);
});
//标签文章
$.ajax.async = false;
$.getJSON("/tag.json",
function(data) {
  $('.tags .y').each(function(index, el) {
    var tagstr = $(this).attr('tag');
    $('.tags .'+tagstr).empty();
    var content = "<a class=\"list_head\"><h3>文章列表</h3></a>";
    $.each(data,
    function(i, item) {
      $.each(item.tags,
      function(j, tag) {
        if (tag == tagstr) {
          content += "<a href=\"" + item.url + "\">" + item.title + "</a>";
        }
      });
    });
    $('.tags .'+tagstr).append(content);       
  })           
}) 
//左侧分类导航封顶
$(document).ready(function(){
  function fixed(id,position,top){
    var navH = $(id).offset().top;
    $(window).scroll(function(){
      var scroH = $(this).scrollTop();
      if(scroH>=navH){
        $(id).css({"position":"fixed","top":top});
      }else if(scroH<navH){
        $(id).css({"position":position,"top":top});
      }
    })
  }
  fixed("#home","static",0);     
})
//左侧切换
function toggle(index){
    index.toggleClass('on').parent().siblings('.x').toggle(500).children('a').removeClass('on');
    $('.'+index.attr('id')).toggle(500).siblings('.y').hide(500);
}
$(document).ready(function(){
    $('.x').on('click', 'a', function(){
      toggle($(this));
    });
})
//滚动条插件
$(document).ready(function(){
  $(".scrollContent").mCustomScrollbar({
  })        
})*/