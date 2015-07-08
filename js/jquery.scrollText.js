/**
 * @author hzhongyang@corp.netease.com
 * @description scrollText
 * 
 */
(function(factory){
	if (typeof define === 'function' && define.amd) {
        // AMD. Register as a module.
        define('scrollText', ['jquery'], factory);
    } else if(typeof define === 'function' && define.amd){
    	// CMD. Register as a module.
    	module.exports = factory;
    }else {
        // Browser globals
        factory(jQuery);
    }
}(function($){
	var ScrollText = function(element,options){
		var that = this;
		this.$el = $(element);
		this.options = $.extend({}, ScrollText.defaults, options);
		//设置定时器
		this.timer = '';
		this.speed = options.speed || ScrollText.defaults.speed;
		//init 
		this.init();
		//event
		this.$el.on({
			mouseenter:function(){
				that.mouseIn();
			},
			mouseleave:function(){
				that.mouseOut();
			},
			mouseOver:function(){
				that.mouseIn();
			}
		});
	};
	
	ScrollText.defaults = {
		content:'',
		speed:'1000',
		ajaxUrl:'',
		lineHeight:'20px',
		scrollStop:false,
		direction :'up'
	};
	
	ScrollText.prototype.init = function(){
		var that = this;
		that.setContent();
		that.autoScroll();
	};
	
	ScrollText.prototype.setContent = function(content){
		var that = this,
			ul = $('<ul />',{
				'class':'g-list',
				'css':{
					'line-height':that.lineHeight,
					'position':'relative',
					'list-style':'none'
				}
			}),
			html = '';
		if(that.options.ajaxUrl){
			$.ajax({
				url:that.options.ajaxUrl,
				type:'GET',
				success:function(data){
					if(data && data.content.length){
						html = $.map(data.content, function(n,i){
							return '<li class="u-item">'+n.item+'</li>';
						}).join('');
					}else{
						html = '<li class="u-item">没有内容</li>';
					}
					ul.append(html);
				}
			});
		}else if(content){
			if(content && content.length){
				html = $.map(content, function(n,i){
					return '<li class="u-item">'+n+'</li>';
				}).join('');
			}else{
				html = '<li class="u-item">没有内容</li>';
			}
			ul.append(html);
		}else if(that.options.content){
			if(that.options.content && that.options.content.length){
				html = $.map(that.options.content, function(n,i){
					return '<li class="u-item">'+n+'</li>';
				}).join('');
			}else{
				html = '<li class="u-item">没有内容</li>';
			}
			ul.append(html);
		}
		that.$el.append(ul);
	};
	
	ScrollText.prototype.setSpeed = function(speed){
		this.options.speed = speed;
	};
	
	ScrollText.prototype.setDirection = function(direction){
		this.options.direction = direction;
	};
	
	ScrollText.prototype.autoScroll = function(){
		var that = this;
		that.timer = setInterval(function(){
			var me = this;
			that.$el.find('.u-item:first-child').fadeIn(1500).appendTo(that.$el.find('.g-list'));
		}, 1550);
	};
	
	ScrollText.prototype.stop = function(scrollStop){
		this.options.scrollStop = scrollStop;
		if(this.options.scrollStop){
			clearInterval(this.timer);
		}
	};
	
	ScrollText.prototype.mouseIn = function(){
		clearInterval(this.timer);
	};
	
	ScrollText.prototype.mouseOut = function(){
		this.autoScroll();
	};
	
	$.fn.scrollText = function(options, args){
		return this.each(function(){
			var $that = $(this),
				data = $that.data('scrolltext');
			if(!data){
				$that.data('scrolltext', new ScrollText(this, options));
				if(typeof args === 'string'){
					$that.data('scrolltext')[args](options);
				}
			}else if(typeof args === 'string'){
				data[args](options);
			}
		});
	};
}));
