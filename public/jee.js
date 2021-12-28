
//轮播
(function($){
	$.fn.jeeLb = function(i){
		setTimeout("$('.jee-lb').jeeLbx(0)",500);
	};

	$.fn.jeeLbx = function(i){
		if(this.attr('jee-lb-s')=='0'){
			return false;
		}
		var intId,w,wi,h,r=0,jee=this,b=this.children(':first'),g=b.find('img'),s=b.children(),n=s.length-1;
		var d=parseInt(this.attr('jee-lb-d')) || 2000;
		var f=parseInt(this.attr('jee-lb-f')) || 500;
		var p=parseInt(this.attr('jee-lb-p')) || '';
		var a=parseInt(this.attr('jee-lb-a')) || '';
		//var hw=parseInt(this.attr('jee-lb-hw')*1)/100 || '0.42';
		var hw=parseInt(this.attr('jee-lb-hw'));
		var c=this.attr('jee-lb-c') || '';
		var e=this.attr('jee-lb-e') || 'fade';
		var k=this.attr('jee-lb-k') || 'swing';
		var bp=this.children('.jee-lb-p');
		var ba=this.children('.jee-lb-a');
		

		this.css({width:Math.ceil($('body').width())+'px',height:hw+'px'});

		if(i>n){i=0}
		var x=i+1;
		var o=s.slice(i,x);

		b.css({margin:0,border:0,padding:0,width:this.width(),height:this.height()});
		s.css({display:'block',border:0,padding:0,margin:0,opacity:1,width:this.width(),height:this.height()});
		g.css({display:'block',border:0,padding:0,margin:0,opacity:1,width:this.width(),height:this.height()});

		
		//焦点按钮
		if(p==''){
			bp.empty().hide();
		}else{
			var pc="jee-p"+p,pn="jee-p"+p+"-n",zx;
			bp.show().empty();
			for(z=0;z<s.length;z++){
				zx=z+1;
				bp.append("<p class='"+pc+"'>"+zx+"</p>");
			}
			switch(c){
				case 'r':
					bp.css({left:'',right:'25px',bottom:'20px'});
				break;
				case 'l':
					bp.css({right:'',left:'25px',bottom:'20px'});
				break;
				default:
					bp.css({right:'',left:Math.ceil((this.width()-bp.width())/2),bottom:Math.ceil(this.height()/30)+10+'px'});
				break;
			}
			
			if(parseInt(p)<30){bp.children().empty()}
			bp.children().slice(i,x).addClass(pn);
			bp.children().click(function(){
				clearInterval(jee.data('intId'));
				i=bp.children().index($(this));
				jee.jeeLbx(i);
			});
		}
		
		//箭头
		if(a==''){
			ba.empty().hide();
		}else{
			var al="jee-a"+a+"-l",ar="jee-a"+a+"-r";
			ba.show().empty();
			ba.append("<p class='"+al+"'></p><p class='"+ar+"'></p>");
			ba.css({width:this.width(),top:Math.ceil((this.height()-ba.height())/2)})
			ba.children('.'+al).click(function(){
				clearInterval(jee.data('intId'));
				if(i==0){i=n}else{i=i-1}
				jee.jeeLbx(i);
			});
			ba.children('.'+ar).click(function(){
				clearInterval(jee.data('intId'));
				if(i>=n){i=0}else{i=i+1}
				jee.jeeLbx(i);
			});
			/*
			this.on("swipeleft",function(){
			  ba.children('.'+al).trigger('click');
			});

			this.on("swiperight",function(){
			  ba.children('.'+ar).trigger('click');
			});
			*/

		}



		//初始化
		switch(e){
			case 'scrollleft':
				s.css({float:'left'});
				b.css({width:this.width()*(n+1)});
				s.show();
				w=o.width();
				if(i==0){b.children(':first').appendTo(b);b.css({marginLeft:0})}else{wi=w*i;b.css({marginLeft:-wi})}
			break;
			case 'scroll':
				s.css({float:'left'});
				b.css({width:this.width()*(n+1)});
				s.show();
				w=o.width();
				if(i==0){b.css({marginLeft:0})}else{wi=w*i;b.css({marginLeft:-wi})}
				if(i>=n){r=1}
			break;
			case 'slideup':
				s.css({float:''});
				h=o.height();
				s.show();
				g.show();
				s.css({height:0});
				s.find('img').css({height:0});
				o.css({height:h});
			break;
			case 'slidedown':
				s.css({float:''});
				h=o.height();
				s.show();
				g.show();
				s.css({height:0});
				s.find('img').css({height:0});
				o.css({height:h});
			break;
			default:
				s.css({float:''});
				s.hide();
				o.show();
			break;
		}
		
		m(this);

		function m(jee){
			intId=setInterval(function(){
				switch(e){
					case 'fade':
						o.fadeOut(f);
						if(i==n){i=0}else{i++}
						x=i+1;
						o=s.slice(i,x);
						o.fadeIn(f*2);
						bp.children().removeClass(pn);
						bp.children().slice(i,x).addClass(pn);
					break;
					case 'slideup':
						if(o.is('img')){o.prependTo(b);o.animate({height:0,opacity:'0'},f);}else{o.prependTo(b);o.animate({height:0,opacity:'0'},f);o.find('img').animate({height:0},f);}
						if(i==n){i=0}else{i++}
						x=i+1;
						o=s.slice(i,x);
						if(o.is('img')){o.animate({height:h,opacity:'1'},f,k);}else{o.animate({height:h,opacity:'1'},f);o.find('img').animate({height:h},f,k);}
						bp.children().removeClass(pn);
						bp.children().slice(i,x).addClass(pn);
					break;
					case 'slidedown':
						if(o.is('img')){o.appendTo(b);o.animate({height:0,opacity:'0'},f);}else{o.appendTo(b);o.animate({height:0,opacity:'0'},f);o.find('img').animate({height:0},f);}
						if(i==n){i=0}else{i++}
						x=i+1;
						o=s.slice(i,x);
						if(o.is('img')){o.animate({height:h,opacity:'1'},f,k);}else{o.animate({height:h,opacity:'1'},f);o.find('img').animate({height:h},f,k);}
						bp.children().removeClass(pn);
						bp.children().slice(i,x).addClass(pn);
					break;
					case 'scrollleft':
						b.animate({
							marginLeft: Math.ceil(parseInt(b.css('margin-left')))-w
						},f,k,function(){
								if(Math.abs(parseInt(b.css("margin-left"))) >= w){
									b.children(':first').appendTo(b);
									b.css('margin-left', 0);
								}
						});
						if(i==n){i=0}else{i++}
						x=i+1;
						bp.children().removeClass(pn);
						bp.children().slice(i,x).addClass(pn);
					break;
					case 'scroll':
						if(r==1){
							b.animate({marginLeft:Math.ceil(parseInt(b.css('margin-left')))+w},f,k);
							i--;
						}else{
							b.animate({marginLeft:Math.ceil(parseInt(b.css('margin-left')))-w},f,k);
							i++;
						}
						if(i==n){r=1};
						if(i==0){r=0};
						x=i+1;
						bp.children().removeClass(pn);
						bp.children().slice(i,x).addClass(pn);
					break;
					default:
						o.hide();
						if(i==n){i=0}else{i++}
						x=i+1;
						o=s.slice(i,x);
						o.show();
						bp.children().removeClass(pn);
						bp.children().slice(i,x).addClass(pn);
					break;
				}
			}, d);
			jee.data('intId',intId);
		}
		
	}

})(jQuery);

//加载首页和轮播
$(document).ready(function(){
		if($('.jee-lb').attr('jee-lb-s')=='1'){   //轮播是否显示
			if($('.jee-lb').length>0){$('.jee-lb').jeeLb(0)}
		}else{
			$('.jee-lb').hide();
		}
	
});