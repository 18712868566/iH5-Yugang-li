(function(){
	var now = { row:0, col:0 }, last = { row:0, col:0};
	const towards = { up:1, right:2, down:3, left:4};
	var maxRow=6;
	var isAnimating = false;
	
	s=window.innerHeight/500;
	ss=250*(1-s);
	
	$('.wrap').css('-webkit-transform','scale('+s+','+s+') translate(0px,-'+ss+'px)');
	var ImageLoader={
		sources:[],
		index:0,
		startLoad:function(){
			var self=this;
			var img=new Image();
			function loadComplete(){
				self.index++;
				if(self.index<self.sources.length){
					var img=new Image();
					img.onload=img.onerror=loadComplete;
					img.src=self.sources[self.index];
				}else{
					self.allLoadOK();
				}
			}
			img.onload=img.onerror=loadComplete;
			img.src=self.sources[self.index];
		},
	};
	
	function imgsLoadComplete(){
		if (isAnimating) return;
		last.row = now.row;
		last.col = now.col;
		if (last.row != maxRow) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}	
	};
	
	ImageLoader.sources=["imgs/page1_bg.jpg","imgs/page1_logo.png","imgs/page1_txt_bottom.png","imgs/page2_bg.jpg","imgs/page2_date.png","imgs/page2_txt1.png","imgs/page2_zhaojun.png","imgs/page3_bg.jpg","imgs/page3_chuangzuo.png","imgs/page3_daxing.png","imgs/page3_en_txt.png","imgs/page3_left1.jpg","imgs/page3_left2.jpg","imgs/page3_left3.jpg","imgs/page3_right1.jpg","imgs/page3_right2.jpg","imgs/page3_right3.jpg","imgs/page4_bg.jpg","imgs/page4_enter.png","imgs/page4_txt.png","imgs/page5_bai.png","imgs/page5_bg.jpg","imgs/page5_photo.jpg","imgs/page5_txt.png","imgs/page6_txt.png","imgs/page_1_txt.png","imgs/page6_bg.jpg"];
	
	for(var i=1;i<14;i++){
		var fname=i;
		if(i<10){
			fname="0"+i;
		}
		ImageLoader.sources.push("dingzhuang/"+fname+".jpg");
	}
	ImageLoader.allLoadOK=imgsLoadComplete;
	ImageLoader.startLoad();
	
	$("#img_enter").bind("click",function(){
		if(now.row!=4){
			return;
		}
		
		if (isAnimating) return;
		last.row = now.row;
		last.col = now.col;
		if (last.row==4 && last.col<14) { now.row = last.row; now.col = last.col+1; pageMove(towards.left);}
	});
	
	document.addEventListener('touchmove',function(event){
		event.preventDefault(); 
	},false);
	
	
	$(document).swipeUp(function(){
		if (isAnimating) return;
		last.row = now.row;
		last.col = now.col;
		if (last.row != maxRow) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}	
	});

	$(document).swipeDown(function(){
		if (isAnimating) return;
		last.row = now.row;
		last.col = now.col;
		if (last.row!=1) { now.row = last.row-1; now.col = 1; pageMove(towards.down);}	
	});
	
	function swipeLeft(){
		if(now.row!=4){
			return;
		}
		if (isAnimating) return;
		last.row = now.row;
		last.col = now.col;
		if (last.row==4) { 
			if(last.col<13){
				now.row = last.row; 
				now.col = last.col+1; 
				pageMove(towards.left);
			}else if(last.col==13){
				//最后一张跳转到第一幅
				now.row = last.row;
				now.col = 1;
				pageMove(towards.left);
			}
		}
	}
	$(document).swipeLeft(swipeLeft);
	function swipeRight(){
		if(now.row!=4){
			return;
		}
		if (isAnimating) return;
		last.row = now.row;
		last.col = now.col;
		if (last.row==4 && last.col>1) { now.row = last.row; now.col -= 1; pageMove(towards.right);}
	}
	$(document).swipeRight(swipeRight);

	function pageMove(tw){
		var lastPage = ".page-"+last.row+"-"+last.col,
			nowPage = ".page-"+now.row+"-"+now.col;
		
		switch(tw) {
			case towards.up:
				outClass = 'pt-page-moveToTop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case towards.right:
				outClass = 'pt-page-moveToRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case towards.down:
				outClass = 'pt-page-moveToBottom';
				inClass = 'pt-page-moveFromTop';
				break;
			case towards.left:
				outClass = 'pt-page-moveToLeft';
				inClass = 'pt-page-moveFromRight';
				break;
		}
		isAnimating = true;
		$(nowPage).removeClass("hide");
		
		$(lastPage).addClass(outClass);
		$(nowPage).addClass(inClass);
		
		setTimeout(function(){
			$(lastPage).removeClass('page-current');
			$(lastPage).removeClass(outClass);
			$(lastPage).addClass("hide");
			$(lastPage).find("img").addClass("hide");
			
			$(nowPage).addClass('page-current');
			$(nowPage).removeClass(inClass);
			$(nowPage).find("img").removeClass("hide");
			
			isAnimating = false;
		},600);
	}
	var pageW=$(document).width();
	var w=pageW/6;
	if(pageW==320){
		w=58;
	}
	$(".p6w").css({"width":w+"px"});
	$(".page-3-1").find(".img_4").css({"margin-left":"-"+w+"px"});
	$(".page-3-1").find(".img_5").css({"margin-left":"-"+(w*2)+"px"});
	$(".page-3-1").find(".img_6").css({"margin-left":"-"+(w*3)+"px"});
	$(".page-3-1").find(".img_8").css({"margin-left":(w)+"px"});
	$(".page-3-1").find(".img_9").css({"margin-left":(w*2)+"px"});
	$("#my_zhaojun").css({"width":$(document).width()+"px"});
	$("img[src='imgs/turn_left.png']").bind("click",swipeRight);
	$("img[src='imgs/turn_right.png']").bind("click",swipeLeft);
	var playing=true;
	$("#music_icon").bind("click",function(){
		if(playing){
			$(this).find(".icon-audio-off").removeClass("hide");
			$(this).find(".icon-audio-on").addClass("hide");
			document.getElementById("audio").pause();
			playing=false;
		}else{
			$(this).find(".icon-audio-off").addClass("hide");
			$(this).find(".icon-audio-on").removeClass("hide");
			document.getElementById("audio").play();
			playing=true;
		}
	});
	var w1=$(document).width();
	if(w1>360){
		$("#zhaoun_png").css({"width":w1+"px","margin-left":"-"+(w1/2)+"px"});
	}
})();