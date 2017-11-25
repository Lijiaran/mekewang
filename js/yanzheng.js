function validateFrom(){
	var x=document.forms["meform"]["fname"].value;
	if (x=='' || x==null) {
		alert("请输入账户名");
		return false;
	};
	var y=document.forms['meform']["fpassword"].value;
	if (y==null || y=="") {
		alert("请输入密码");
		return false;
	};
	var z=document.forms["meform"]["emali"].value;
	var atpos=z.indexOf("@");
	var dotpos=z.lastIndexOf(".");
	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=z.length) {
		alert("不是一个有效的 e-mail 地址");
		return false;
	};
}