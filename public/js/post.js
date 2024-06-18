$(document).ready(function(){
    //在文章中查找title并填充到div AnchorContent中
	$(".post-content").find("h1,h2,h3,h4,h5,h6").each(function(i,item){
	    var tag = $(item).get(0).localName;
	    $(item).attr("id","wow"+i);
	    $("#AnchorContent").append('<li><a class="new'+tag+' anchor-link" onclick="return false;" href="#" link="#wow'+i+'">'/*+(i+1)+" · "*/+$(this).text()+'</a></li>');
	});
	$(".anchor-link").click(function(){
	    $("html,body").animate({scrollTop: $($(this).attr("link")).offset().top}, 1000);
	});
    //文章页文章导航封顶
	function fixed(id,position,top){
		var navH = $(id).offset().top;
		$(window).scroll(function(){
		  var scroH = $(this).scrollTop();
		  if(scroH>=navH){
		    $(id).css({"position":"fixed","top":top});
		  }else if(scroH<navH){
		    $(id).css({"position":position,"top":"175px"});
		  }
		})
	}
  	fixed($(".post-anchor"),"absolute","50px");
	
	$("#AnchorContentToggle").click(function(){
		var obj = $(this).find('span');
	    var text = obj.html();
	    if(text=="-"){
	        obj.html("+");
	        $(this).attr({"title":"展开"});
	    }else{
	        obj.html("-");
	        $(this).attr({"title":"收起"});
	    }
	    $("#AnchorContent").toggle();
	});

})

    /*
$(document).ready(function() {
    $('pre').each(function(index, el) {
        $(this).addClass('c'+index);
        $($('#tools-html').html()).insertBefore('pre:eq('+index+')').find('.copy').attr('tag', 'c'+index);
        $($('#tools-html').html()).insertAfter('pre:eq('+index+')').find('.copy').attr('tag', 'c'+index);
    });

    function clipCallback(client) {
        client.setText($.trim(this.innerHTML));
        var pos = parent.position();
        var tester = $('#tester');
        tester.show().css({opacity:1,left:pos.left,top:pos.top}).stop().animate({
            opacity: 0,
            top: '-=20'
         },function(){
            $(this).hide();
         });
    }
    
    $('.copy').each(function(){
        var ol = $('ol', $('pre.'+$(this).attr('tag')) );
        var clip = new ZeroClipboard(ol, {moviePath: "/public/js/ZeroClipboard.swf"});
        clip.on('mousedown', clipCallback);
        
        if(navigator.userAgent.indexOf('Firefox') !=-1) {
            $(clip.htmlBridge).css('opacity',0);
        }
    });
});
    */


$(document).ready(function() {
   $(".donate-btn").on('click', function() {
        $(".donate-qr-code").toggle(1500);
   }); 
});