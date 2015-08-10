/**
 * @author hy
 * @description scrollText
 * ajax 参数 
 * {
 * 	code:200,
 * 	content:{
 * 		userCount:string
 * 		users:[
 *					{
 *						uid:string
 *						money:string
 *					}
 *			 ]
 * 	}
 * }
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
		speed:'1500',
		ajaxUrl:'',
		lineHeight:'20px',
		scrollStop:false,
		direction :'up',
		max_num:5
	};
	
	ScrollText.prototype.init = function(){
		var that = this;
		that.setContent();
		that.autoScroll();
	};
	
	ScrollText.prototype.setContent = function(data){
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
					if(data && data.content.users.length){
						that.setCount(data.content.userCount);
						html = $.map(data.content.users, function(n,i){
							return '<li class="u-item"><span class="u-uid">'+n.uid+'</span>刚刚获得了<span class="u-money">'+n.money+'</span>元现金</li>';
						}).join('');
					}else{
						html = '<li class="u-item">当前没有用户参与</li>';
					}
					ul.append(html);
				}
			});
		}else if(data){
			if(data && data.content.users.length){
				that.setCount(data.content.userCount);
				html = $.map(data.content.users, function(n,i){
					return '<li class="u-item"><span class="u-uid">'+n.uid+'</span>刚刚获得了<span class="u-money">'+n.money+'</span>元现金</li>';
				}).join('');
			}else{
				html = '<li class="u-item">当前没有用户参与</li>';
			}
			ul.append(html);
		}else if(that.options.content){
			if(that.options.content && that.options.content.length){
				html = $.map(that.options.content, function(n,i){
					return '<li class="u-item">'+n+'</li>';
				}).join('');
			}else{
				html = '<li class="u-item">当前没有用户参与</li>';
			}
			ul.append(html);
		}
		that.$el.empty().append(ul);
		that.hideOverflow(that.options.max_num);
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
			that.scroll();
		}, that.options.speed);
	};
	
	ScrollText.prototype.scroll = function(){
		var that = this;
		if(that.options.direction == 'up'){
			that.$el.find('.u-item:first-child').fadeIn(that.options.speed - 50).appendTo(that.$el.find('.g-list'));
		}
		if(that.options.direction == 'down'){
			that.$el.find('.g-list').prepend(that.$el.find('.u-item:last-child').fadeIn(that.options.speed - 50));
		}
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
	ScrollText.prototype.setCount = function(num){
		this.$el.siblings('.u-list-head').find('.u-num').empty().text(num);
	};
	//兼容ie
	ScrollText.prototype.hideOverflow = function(num){
		this.$el.find('.u-item').each(function(i,n){
			if(i>num){
				$(n).hide();
			}
		});
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
