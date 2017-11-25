function Carousel() {
	var container=document.getElementById("container");
	var list=document.getElementById("list");
	var buttons=document.getElementById("buttons").getElementsByTagName("span");
	var prev=document.getElementById("prev");
	var next=document.getElementById("next");
	var index=1;
	var timer;     //定时器
	var animated;
    //动画
	function animate(offset) {
	    	if(offset == 0) {      //是否点击到当前的按钮 是退出
	    		return;
	    	}
	    	animated=true;         //动画在执行
	    	var time=300;          //完成一张图片的周期
	    	var interval=10;       //每10毫秒移动一次
	    	var speed=offset/(time/interval)    //每一次移动多少像素
	    	var left=parseInt(list.style.left)+offset;    //要移动到的位置
	    	var go=function() {
	    		if(speed > 0 && parseInt(list.style.left) < left || speed < 0 && parseInt(list.style.left) > left) {           //speed>0 代表向左移动必然目标位置left大于初始位置style.left 这里
	    			list.style.left=parseInt(list.style.left)+speed+"px";                                                      //的 parseInt(list.style.left) < left是判断是否到到达目标位置
	    			setTimeout(go,interval)
	    		}else {
	    			list.style.left=left+"px";
			        if(left<-4120) {                      //判断是否到达空白图片，这里每张图片的width为600px  left<-3000 说明是要从第五张图片跳到第一张图 就要把它初始化为的第一张图的位置
			        	list.style.left="-824px";          
			        }
			        if(left>-824) {                        //判断是否到达空白图片，这里每张图片的width为600px  left>-600 说明是要从第一张图片跳到第五张图 就要把它初始化为的第五张图的位置
			        	list.style.left="-4120px";
			        }
			        animated=false;
	    		}
	    	}
	             go();
	}
    //为向右的箭头添加鼠标点击事件
	next.onclick=function(){
		if(animated) {               //动画还在执行则退出函数 也就是说动画还在执行的时候无法触发箭头点击事件    
			return;
		}
	             if (index==5) {
	        	        index=1
	             }else{
	        	index++;
	             }
		animate(-824);               //动画函数 每次点击箭头都是-600px；
		showButton();                //为小圆钮添加样式的函数
	}
	//为向左的箭头添加鼠标点击事件
	prev.onclick=function() {
		if(animated) {
		       return;
		}
		if (index==1) {
        	                   index=5
	             }else{
	        	      index--;
	             }
		animate(824);
		showButton();

	}

	//为小圆钮添加样式
	function showButton() {
		for (var i = 0; i < buttons.length; i++) {
			if(buttons[i].className=="on") {             //判断是否有类名on 有则删除
				buttons[i].className="";
				  break;
			}
		}
		buttons[index-1].className="on";                //为对应图片序号的小圆钮 添加类名on        index在调用这个函数的函数里会自增
	}
    //为小圆点添加事件
	for (var i = 0; i < buttons.length; i++) {           
		buttons[i].onclick=function() {              
			if(animated) {                              //动画还在执行则退出函数 也就是说动画还在执行的时候无法触发圆钮点击事件 
				return;
			}
                                       if(this.className == "on" ) {               //判断点击的是不是当前的小圆钮 是就退出函数 可以提高优化
            	                                        return;
                                       }
		 var myIndex = parseInt(this.getAttribute("index"));                 //这里是目标值的位置  this代表点击的目标值
		 var offset = -824 * (myIndex-index);                                 //偏移量   目标值减去当前值
		 animate(offset); 
		 index = myIndex;                                                   //这里必须将 index = myIndex， 
		 showButton();
		}
             }
	//自动播放	
	function play() {
	    	timer = setTimeout(function () {
	    		next.onclick();
	    		play();
	    	},3000)
	}
	//停止播放
             function stop() {
             	clearTimeout(timer);
             }
	container.onmouseover=stop;
	container.onmouseout=play;
	play();
}
//思路：第一步是先为小箭头添加事件   第二步为小箭头的首尾图片切换的位置初始化 
//第三步为小圆钮添加类名来切换样式  第四步为小圆钮添加事件
//第五步编写动画函数 里面包含了封装第三步和第四步的函数
//第六步编写自动播放函数 利用定时器绑定鼠标移开和移上的事件
//做优化 比如：点击的小圆钮是当前的小圆钮 退出函数 
//                         动画还在执行的时候无法触发事件 退出函数（设置以一个变量当开关）


function navModality() {
	var li=document.getElementById("nav_ul").getElementsByTagName("li");
	      
	for (var i = 0; i < li.length; i++) {
		li[i].onmouseover=function() {
			this.classList.add("on") ;  //为点击的li添加类名
		}
		li[i].onmouseout=function () {
			this.classList.remove("on");              //删除类名
		}
	};
}
window.onload=function(){
	Carousel();
	navModality();
}