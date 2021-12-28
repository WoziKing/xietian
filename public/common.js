<!--

window["PDV_AUTO_POSITION"] = [];
/**
* setBg
* 当页面内容动态变动时,重新调整各层及背景高度
*/
(function($){
	$.fn.setBg = function(){
		var getDrag = $('div.pdv_class');
		
		var r = {};
		getDrag.each(function(id) {
			var obj = this.id;

			if($("#s"+obj)[0].style.overflow=="visible"){
				
				//设置可溢出层的高度
				var o = $("#"+obj);
				var h = o.children()[0].offsetHeight;
				var d = h - o.height();
				if( d == 0 ) return;

				o.height(h);
				
				var ot = o.offset();
				ot.right = ot.left + o.width();
				ot.bottom = ot.top + o.height();

				$.each(window["PDV_AUTO_POSITION"], function(i, v){
					var o = $("#pdv_"+v);
					var ot2 = o.offset();
					ot2.right = ot2.left + o.width();
					//位置判断 该div必须在正下方 且碰触 
					if(ot.top < ot2.top && (ot.left <= ot2.right && ot.right >= ot2.left)) {
						//找到bottom值最大 且top最大的容器并记录
						if( !r[v] || (r[v][0] < ot.bottom || r[v][0] == ot.bottom && r[v][1] < ot.top)) {
							r[v] = [ot.bottom, ot.top, d];
						}
					}
				});
			}
		});
		for(var v in r) {
			if( r[v] ) {
				var o = $("#pdv_"+v);
				o.css("top", $.css(o[0], "top", true) + r[v][2]);
			}
		}

		//计算三个容器的高度

		var isAdminmenu=$("#adminmenu").is(":visible");
		var isAdminbar=$("#adminbar").is(":visible");
		var isAdminshowme=$("#adminbar_showme").is(":visible");
		var AT=0,AH=0;
		if(isAdminmenu==true){
			if(isAdminshowme==true){
				AT=0;
			}else{
				AT=32;
			}
		}

		if(isAdminbar==true){
			if(isAdminshowme==true){
				AT=0;
				AH=2;
			}else{
				AT=288;
				AH=2;
			}
		}

		var getObj = $('div.pdv_top');
		var th=0,h=0;
		getObj.each(function(id) {
			
			var obj = this.id;
			h=$("#"+obj).parents()[0].offsetTop + $("#"+obj).parents()[0].offsetHeight;
			th = th>h?th:h;
		});
		$("#top")[0].style.height = th + "px";
		$("#topex").css({height: th+AH+ "px",top:$("#top")[0].offsetTop+AT+"px"});

		

		var getObj = $('div.pdv_content');
		var ch=0,h=0;
		getObj.each(function(id) {
			var obj = this.id;

			h=$("#"+obj).parents()[0].offsetTop + $("#"+obj).parents()[0].offsetHeight;
			ch = ch>h?ch:h;
		});
		$("#content")[0].style.height = ch + "px";
		$("#contentex").css({height: ch +AH + "px",top:$("#content")[0].offsetTop+AT+"px"});


		var getObj = $('div.pdv_bottom');
		var bh=0,h=0;
		getObj.each(function(id) {
			var obj = this.id;
			h=$("#"+obj).parents()[0].offsetTop + $("#"+obj).parents()[0].offsetHeight;
			bh = bh>h?bh:h;
		});
		
		$("#bottom")[0].style.height = bh + "px";
		$("#bottomex").css({height: bh +AH + "px",top:$("#bottom")[0].offsetTop+AT+"px"});
		
		if($("#advsex").length>0 && $("#advsexDiv").length>0){
			AOF=$("#advsexDiv").offset();
			$("#advsex").css({top:AOF.top+AT-1+"px"});
		}

	};

	//当存在可溢出层时重新定义这些层的高度

	var getObj = $('div.pdv_class');
	getObj.each(function(id) {
		var obj = this.id;
		if($("#s"+obj)[0].style.overflow=="hidden"){
				//设置插件边框层的高度
				var borderH=$("#s"+obj)[0].offsetHeight;
				$("#s"+obj+">.pdv_border").outerHeight(borderH, true);
		}
	});


	//防底部溢出
	$(function(){ 
		$().setBg();
		var OST=0;
		$(window).on("scroll", function(){ 
			if((($(window).scrollTop()-OST)>=100 && OST<1) || ($(window).scrollTop()>=$(window).height() && OST<$(window).height()) || ($(window).scrollTop()>=($(document).height()-$(window).height()-50) && OST<($(document).height()-$(window).height()-50))){
				$().setBg();
				OST=$(window).scrollTop();
			}
			
		});
	});
	$(window).on("load", $().setBg);
	
})(jQuery);






//刷新图形码
$(document).ready(function() {

	$("img#codeimg").click(function () { 
		$("img#codeimg")[0].src=PDV_RP+"codeimg.php?"+Math.round(Math.random()*1000000);
	 });

	$("#getImgCode").click(function () { 
		$("img#codeimg")[0].src=PDV_RP+"codeimg.php?"+Math.round(Math.random()*1000000);
	 });
});




//生成静态页，直接在html状态下生成静态页,在管理状态下,跳转到非静态
function BuildHtml(RP,ver,catchtime,i){
		
		$.ajax({
			type: "GET",
			url:"./index.php",
			data: i+".html&htmlversion="+ver+"&htmlcatchtime="+catchtime,
			success: function(msg){
				if(msg=="NOCATCH"){
					if(i=='index'){
						window.location='index.php';
					}else{
						window.location='./?'+i+'.html';
					}
				}
				
			}
		});
	
}


//模板内下拉菜单提交后选中
function selOption(selname,v){
	for(var i=0;i<selname.length;i++)
	{
		if(selname.options[i].value==v){
		selname.options[i].selected=true;
		}
	}
}


//获取弹出式登录框
(function($){
	$.fn.popLogin = function(act){
		
		//获取登录表单
		$.ajax({
			type: "POST",
			url:PDV_RP+"member/post.php",
			data: "act=getpoploginform&RP="+PDV_RP,
			success: function(msg){
				
				$('html').append(msg);
				$.blockUI({message: $('div#loginDialog'),css:{width:'300px'}}); 
				$('.pwClose').click(function() { 
					$.unblockUI(); 
					$('div#loginDialog').remove();
				     location.reload();					
				}); 

				$('img#zhuce').click(function() { 
					$.unblockUI(); 
					window.location=PDV_RP+"member/reg.php";
				}); 

				$("img#fmCodeImg").click(function () { 
					$("img#fmCodeImg")[0].src=PDV_RP+"codeimg.php?"+Math.round(Math.random()*1000000);
				 });

				 $('#LoginForm').submit(function(){ 

					$('#LoginForm').ajaxSubmit({
						target: 'div#loginnotice',
						url: PDV_RP+'post.php',
						success: function(msg) {
							
							if(msg=="OK" || msg.substr(0,2)=="OK"){
								$('div#loginnotice').hide();
								$.unblockUI(); 
								$('div#loginDialog').remove();
								if(act=="1"){
									$("div#notLogin").hide();
									$("div#isLogin").show();
									$("span#username").html(getCookie("MUSER"));
									location.reload();	
								}else if(act=="2"){
									window.location.reload();
								}else{
									$().alertwindow("会员登录成功","");
									location.reload();	
								}
								
							}else{
								$('div#loginnotice').show();
							}
						}
					}); 
			   
				return false; 

			 }); 


			}
		});

		
	};
})(jQuery);



//图片自适应,参数fitType=fill为填充式，fitType=auto为横竖排列自适应
(function($){
	$.fn.picFit = function(fitType){

		$("div.picFit").each(function(){
			var maxHeight,maxWidth,accMax,MT,ML;
			maxHeight=parseInt($(this).css("height"));
			maxWidth=parseInt($(this).css("width"));
			accMax=maxWidth/maxHeight;
			
			var imgs = $(this).find("img");
				
			if(fitType=="auto"){
				$.w.imageScale(imgs, maxWidth, maxHeight)
			}else if(fitType=="fill"){
				$.w.loadImage(imgs, null, function(w,h){
					var p = w/h;
					if(p<=accMax){
						w = maxWidth;
						h = maxWidth/p;
						MT = (maxHeight-h)/2 + "px";
						$(this).css({marginTop:MT});
					}else{
						w = maxHeight*p;
						h = maxHeight;
						ML = (maxWidth-w)/2 + "px";
						$(this).css({marginLeft:ML});
					}
					$(this).css({width: w, height: h});
				});
			}else{
				imgs.css({width:maxWidth+"px",height:maxHeight+"px"});
			}


		});

	};

})(jQuery);



//分组标签切换
(function($){
	$.fn.switchLable = function(pdvid,lables,roll){
		
		
		//排版状态下无效
		if(getCookie("PLUSADMIN")=="SET"){return false}

		//pdvid未定义无效
		if(pdvid==""){return false}

		//获取标签的样式名称
		var GBL=$("ul#gblable_"+pdvid).children();
		var CLN=GBL[0].className;
		var CUR=CLN+"_current";
		var R,S;

		
		//清空标签,获取被控层编号,决定标签数量
		$("ul#gblable_"+pdvid).empty();
		$("#pdv_"+pdvid).css({zIndex:32});
		$("#pdv_"+pdvid)[0].title="";

		var strAry=lables.split(",");
		for(i=0;i<strAry.length;i++){
			if(strAry[i]=="" || parseInt(strAry[i])==NaN){return false}
			if($("#pdv_"+strAry[i])[0] && strAry[i]!=pdvid){
				if(i==0){
					$("#pdv_"+strAry[i]).css({zIndex:99});
					$("ul#gblable_"+pdvid).append("<li id='GBLLIST_"+i+"' class='"+CUR+"'>"+$("#pdv_"+strAry[i])[0].title+"</li>");
				}else{
					$("#pdv_"+strAry[i]).css({zIndex:31});
					$("ul#gblable_"+pdvid).append("<li id='GBLLIST_"+i+"' class='"+CLN+"'>"+$("#pdv_"+strAry[i])[0].title+"</li>");
				}
			}
			
		}
		
		R=$("ul#gblable_"+pdvid).children();
		S=R.size();
		
		
		if(roll=="click"){
			R.click(function(){
				R.each(function(){
					$(this)[0].className=CLN;
					$("#pdv_"+strAry[this.id.substr(8)]).hide();
				});
				$(this)[0].className=CUR;
				$("#pdv_"+strAry[this.id.substr(8)]).show();
				$("#pdv_"+strAry[this.id.substr(8)]).css({zIndex:99});
				
			});	
		}else{
			R.mouseover(function(){
				R.each(function(){
					$(this)[0].className=CLN;
					$("#pdv_"+strAry[this.id.substr(8)]).hide();
				});
				$(this)[0].className=CUR;
				$("#pdv_"+strAry[this.id.substr(8)]).show();
				$("#pdv_"+strAry[this.id.substr(8)]).css({zIndex:99});
			});	
		}

		//自动播放
		if(roll=="auto"){
			setInterval(function(){
				var nextId=0;
				R.each(function(id){
					if($(this)[0].className==CUR){
						nextId=id+1;
						if(nextId>=S){
							nextId=0;
						}
					}
					$(this)[0].className=CLN;
					$("#pdv_"+strAry[this.id.substr(8)]).hide();
				});
				R[nextId].className=CUR;
				$("#pdv_"+strAry[R[nextId].id.substr(8)]).show();
				$("#pdv_"+strAry[R[nextId].id.substr(8)]).css({zIndex:99});

			}, 5000);
		}
		

	};

})(jQuery);


-->