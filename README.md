# scratchCard
===
This is a plugin about  `scratchCard`
���֧��amd��cmd�ļ��ط�ʽ���൱��һ��Сģ��
###���� param
#### setPrize
	Ĭ����$noop
	�˺����������������õĽ���Ľӿ�
#### hasOpened (false)
	�����Ƿ��Ѿ��ο�����
#### percentage (15)
	���ùιο��ε�����ʱ��Ϸ����	
#### imageWdith (400) 
	����image����canvas�Ŀ��
#### imageHeight (400) 
	����image����canvas�ĸ߶�
#### bgcolor (#8b8b8b)
	������Ǳ���ͼƬ��canvas�ı�����ɫ
#### fillText(�ο��ιο����������˶��٣�)	
	������Ǳ���ͼƬ,������ʾ������
#### imageUrl
	���������ͼƬ�����ñ���ͼƬ��url				
#####����......
### ʹ��
	<div class="m-scratchCard" style="width:400px;height:400px;"></div>
	$('.m-scratchCard').scratchCard(options);
# scrollText
===
This is a plugin about  `scrollText`
���֧��amd��cmd�ļ��ط�ʽ���൱��һ��Сģ��
###���� param
####1.content
  	�ṩ��������дlist���ķ���
  	һ����ֱ����дcontent list
  	�ڶ�����ͨ��ajax��ȡ��̨���ص�list
####2.speed
  	���ù������ٶ�
  	Ĭ�Ϲ������ٶ���1500ms 
####3.ajaxUrl
  	ͨ��ajax��ȡlist
	�������ݸ�ʽ����������setContent()�������޸�
####4.direction
  	��ֻ�����ķ���
  	up������
  	down:����
####5.����ͨ��css������ʾ����
	  .u-item:nth-child(n+7){ display:none; }��������ʾ6�� �����ѣ�nth-child ֻ����ie9��������Ҫ����ie7��8,����Ѱ������	
#####6.����...
### ʹ��
	<div class="m-scrollText"></div>
	$('.m-scrollText').scrollText({
		content:['hytes****@163.com','huhai145@163.com','hongyang@year.com','hytest567@vip.163.com','hytest163@vip.163.com','hytest123@vip.126.com','hytest111@vip.163.com','hytest456@vip.126.com']});  	
