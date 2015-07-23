/**
 * 基于zepto.js 主要是为了兼容移动端
 * 利用canvas模拟刮刮卡
 * @version 1.0.1
 * @description 快速生成刮刮卡
 * @author hzhongyang@crop.netease.com
 * */

(function(factory){
	if (typeof define === 'function' && define.amd) {
        // AMD. Register as a module.
        define('scrollText', ['zepto'], factory);
    } else if(typeof define === 'function' && define.amd){
    	// CMD. Register as a module.
    	module.exports = factory;
    }else {
        // Browser globals
        factory(Zepto);
    }
}(function($){
	var ScratchCard = function(el, options){
		var that = this;
			that.$el = $(el);
			that.options = $.extend({},ScratchCard.defaults,options);
			that.START_EVT;
			that.MOVE_EVT;
			that.END_EVT;
			that.hasTouch = false;
			that.mousedown = false;
			that.lastPoint = {x:0,y:0};
		//init
		that.init();	
	};
	//options for setting by outer and by default
	ScratchCard.defaults = {
		penColor:'#fff',
		penWidth:25,
		bgcolor:'#000',
		font:'800 20px Microsoft Yahei',
		fontColor:'#fff',
		fillText:'刮开刮刮卡，看看中了多少钱！',
		percentage: 30,
		imageUrl:'',
		hasOpened:false,
		jsonp:false,
		imageJsonpUrl:'',
		canvasWidth:'400',
		canvasHeight:'400',
		setPrize:$.noop
	};
	
	//init
	ScratchCard.prototype.init = function(){
		this.setEvent();
		this.setCanvas();
	};
	
	//画图片并且新建canvas
	ScratchCard.prototype.setCanvas = function(imageUrl){
		var that = this;
		var $canvas = $('<canvas class="j-canvas"></canvas>').css({
			'width':'100%',
			'height':'100%'
		});
		that.$el.empty().append($canvas);
		//如果是图片如果是跨域的方式请求，我们将采用jsonp的形式获取克隆一个图片
		if(that.options.jsonp){
			that.getImageByJsonp(that.options.imageJsonpUrl, that.callback);
		}else{
			that.drawColor();
		}
		that.bindEvent(that.START_EVT,that.MOVE_EVT,that.END_EVT);
	};
	
	//通过jsonp的形式来获取图片base64
	ScratchCard.prototype.getImageByJsonp = function(imageJsonpUrl,cb){
		var script = document.createElement('script');
			script.setAttrbute('type','test/javascript');
			script.src = imageJsonpUrl+'?callback='+cb;
			document.body.appendChild(script);
	};
	
	//获取图片的回调函数
	ScratchCard.prototype.callback = function(data){
		var that = this;
		var img = new Image();
		image.src = data.image;
		img.onload = function(){
			var $cvs = that.$el.find('.j-canvas'),
				ctx = $cvs[0].getContext('2d');
			ctx.drawImage(img,0,0,that.options.canvasWidth,that.options.canvasHeight);	
		};
	};
	
	//直接通过color来进行画图
	ScratchCard.prototype.drawColor = function(){
		var	$cvs = this.$el.find('.j-canvas'),
			ctx = $cvs[0].getContext('2d'),
			that = this;
		ctx.fillStyle = that.options.bgcolor;
		ctx.fillRect(0,0,that.options.canvasWidth,that.options.canvasHeight);
		ctx.beginPath();
		ctx.font = that.options.font;
		ctx.textAlign = 'start';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = that.options.fontColor;
//        ctx.globalCompositeOperation = "source-over";
        ctx.fillText(that.options.fillText,that.options.canvasWidth*0.05,that.options.canvasHeight*0.2,that.options.canvasWidth*0.9);
	};
	
	//bind event
	ScratchCard.prototype.bindEvent = function(START_EVT,MOVE_EVT,END_EVT){
		var $cvs = this.$el.find('.j-canvas'),
			that = this;
		$cvs.on(START_EVT,function(e){
			that.touchHandle(e);
		});
		$cvs.on(MOVE_EVT,function(e){
			that.touchHandle(e);		
		});
		$cvs.on(END_EVT,function(e){
			that.touchHandle(e);
		});
	};
	
	//判断环境 pc或者移动端
	ScratchCard.prototype.setEvent = function(){
		var userAgentInfo = navigator.userAgent,
	       Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"), 
	       flag = true,
	       len = Agents.length,
	       that = this;
		   for(var v = 0; v < len; v++) {  
		      if(userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
		   } 
		   that.START_EVT = flag? 'mousedown':'touchstart';
		   that.MOVE_EVT = flag? 'mousemove':'touchmove';
		   that.END_EVT = flag? 'mouseup':'touchend';
		   that.hasTouch = !flag;
	};
	
	//进行touch事件的处理
	ScratchCard.prototype.touchHandle = function(e){
		var that = this;
		e.preventDefault();
		switch (e.type) {
			case that.START_EVT:
				that.mousedown = true;
				that.savePoint();
				break;
			case that.MOVE_EVT:
				that.moveHandle(e);
				break;
			case that.END_EVT:
				that.mousedown = false;
				break;
		}
	};
	
	//保存START_EVT的point
	ScratchCard.prototype.savePoint = function(){
		var $cvs = this.$el.find('.j-canvas'),
		ctx = $cvs[0].getContext('2d'),
		that = this;
		if(that.mousedown){
			// e.changedTouches 表示最后发生触摸的列表
			if(event.changedTouches){
				event=event.changedTouches[event.changedTouches.length-1];
			}
			var posX = (event.clientX + document.body.scrollLeft|| event.pageX) - ($cvs.offset().left || 0),
				posY = (event.clientY + document.body.scrollTop|| event.pageY) - ($cvs.offset().top || 0);
			that.lastPoint.x = posX;
			that.lastPoint.y = posY;
			console.log(posX +'|'+ posY);
		}
	};
	
	//划线的函数
	ScratchCard.prototype.moveHandle = function(event){
		var $cvs = this.$el.find('.j-canvas'),
			ctx = $cvs[0].getContext('2d'),
			that = this;
		ctx.globalCompositeOperation = "destination-out";
		if(that.mousedown){
			// e.changedTouches 表示最后发生触摸的列表
			if(event.changedTouches){
				event=event.changedTouches[event.changedTouches.length-1];
			}
			var posX = (event.clientX + document.body.scrollLeft|| event.pageX) - ($cvs.offset().left || 0),
				posY = (event.clientY + document.body.scrollTop|| event.pageY) - ($cvs.offset().top || 0);
			ctx.beginPath();
			ctx.strokeStyle = that.options.penColor;
	        ctx.lineWidth = that.options.penWidth;
	        console.log('lastPoint:'+that.lastPoint.x + '|'+ that.lastPoint.y);
	        ctx.moveTo(that.lastPoint.x,that.lastPoint.y);
	        ctx.lineTo(posX,posY);
	        console.log('currentPoint:'+posX + '|'+ posY);
//	        ctx.fill(); 
	        ctx.stroke(); 
	        that.lastPoint.x = posX;
	        that.lastPoint.y = posY;
		}
		if(that.removeAll()){
			$cvs.remove();
			that.setPrize();
		}
	};
	//转换背景颜色工具函数
	ScratchCard.prototype.color2rgb = function(color){
		var that = this,
			mcolor = color || that.options.bgcolor;
		var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
			mcolor = mcolor.toLowerCase();
			var len = mcolor.length;
			if(mcolor && reg.test(mcolor)){
				//如果颜色是#fff这种形式，那么我们需要将其转化成#ffffff,然后在将其转化成rgb三原色
				var newColor = '#';
				if(len == 4){
					for(var i =1; i<len; i++){
						newColor += mcolor[i] +''+ mcolor[i];
					}
					mcolor = newColor;
				}
				//将6位的颜色转换成rgb
				len = mcolor.length;
				var rgb = [];
				for(var i=1;i<len;i+=2){
					rgb.push(parseInt("0x"+mcolor.slice(i,i+2)));
				}
				return {
					R:rgb[0],
					G:rgb[1],
					B:rgb[2]
				}
			}else{
				return mcolor;
			}
	};
	//判断游戏结束并将结果进行显示
	ScratchCard.prototype.removeAll = function(){
		var $cvs = this.$el.find('.j-canvas'),
			ctx = $cvs[0].getContext('2d'),
			that = this;
		var imgData = ctx.getImageData(0,0,that.options.canvasWidth,that.options.canvasHeight).data,
			totalArea = $cvs.width() * $cvs.height(),
			RGB = that.color2rgb(),
			unClearArea = 0;
		for(var i = 0, len = imgData.length; i < len; i += 4) {
	        if (imgData[i] === RGB.R && imgData[i + 1] === RGB.G && imgData[i + 2] === RGB.B) {
	          unClearArea ++;
	        }
	    }
		if( unClearArea / totalArea <= that.options.percentage/100) {
	        return true;
	     } else{
	        return false;
	     }
	     return true;
	};
	
	//设置奖品的接口
	ScratchCard.prototype.setPrize = function(){
//		this.options.setPrize.call(this,this.$el);
	};
	
	//reset canvas
	ScratchCard.prototype.reset = function(){
		this.init();
	};
	
	$.fn.scratchCard = function(args, options){
		return this.each(function(){
			var $this = $(this);
			data = $this.data('scratchcard');
			if(!data){
				$this.data('scratchcard',new ScratchCard(this,options));
			   if(typeof args === 'string'){
			     $this.data('scratchcard')[args](options);
			   	}
			}else if(typeof args ==='string'){
				data[args](options);
			}
		});
	};
}));