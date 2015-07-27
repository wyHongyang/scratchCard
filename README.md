# scratchCard
===
This is a plugin about  `scratchCard`
插件支持amd和cmd的加载方式，相当于一个小模块
###参数 param
#### setPrize
	默认是$noop
	此函数是留出来处理获得的奖项的接口
#### hasOpened (false)
	设置是否已经刮开过了
#### percentage (15)
	设置刮刮卡刮到多少时游戏结束	
#### imageWdith (400) 
	根据image设置canvas的宽度
#### imageHeight (400) 
	根据image设置canvas的高度
#### bgcolor (#8b8b8b)
	如果不是背景图片，canvas的背景颜色
#### fillText(刮开刮刮卡，看看中了多少！)	
	如果不是背景图片,设置显示的内容
#### imageUrl
	如果背景是图片，设置背景图片的url				
#####待续......
### 使用
	<div class="m-scratchCard" style="width:400px;height:400px;"></div>
	$('.m-scratchCard').scratchCard(options);
# scrollText
===
This is a plugin about  `scrollText`
插件支持amd和cmd的加载方式，相当于一个小模块
###参数 param
####1.content
  	提供了两种填写list表单的方法
  	一种是直接填写content list
  	第二种是通过ajax获取后台返回的list
####2.speed
  	设置滚动的速度
  	默认滚动的速度是1500ms 
####3.ajaxUrl
  	通过ajax获取list
	具体数据格式可以自行在setContent()函数中修改
####4.direction
  	这只滚动的方向
  	up：向上
  	down:向下
####5.可以通过css控制显示几条
	  .u-item:nth-child(n+7){ display:none; }来控制显示6个 （提醒：nth-child 只兼容ie9及以上需要兼容ie7、8,请自寻方法）	
#####6.待续...
### 使用
	<div class="m-scrollText"></div>
	$('.m-scrollText').scrollText({
		content:['hytes****@163.com','huhai145@163.com','hongyang@year.com','hytest567@vip.163.com','hytest163@vip.163.com','hytest123@vip.126.com','hytest111@vip.163.com','hytest456@vip.126.com']});  	
