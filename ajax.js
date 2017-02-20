function json2url(json){
	josn.t = Math.random();
	var arr = [];
	for(name in json){
		arr.push(name+'='+encodeURIComponent(json[name]));
	}
	return json.join('&');
}
//url,data,type,success,error
function ajax(json){
	json = json||{};
	json.data = json.data||{};
	json.tyle = json.type || 'GET';
	json.timeout = json.timeout || 10000;
	if(!json.url){return;}
	//1.创建一个ajax对象
	if(window.XMLHttpRequest){
		var oAjax = new XMLHttpRequest;
	}else{
		var oAjax = new ActiveXObejct('Microsoft XMLHTTP');
	}
	switch(json.type.toLowerCase()){
		case 'get':
		oAjax.open('GET',json.url+'?'+json2url(json.data),true);
		oAjax.send();
		break;
		case 'post':
		oAjax.open('POST',json.url,true);
		oAjax.setRequestHeader('Content-Type','application/x-www-from-urlencoded');
		oAjax.send(json2url(json.data));
		break;
	}
	json.loading&&json.loading();
	clearInterval(timer);
	timer = setInterval(function(){
		json.complete&&json.complete();
		json.error&&json.error('网络异常，请稍后重试');
		oAjax.onreadystatechange = null;
	},json.timeout);
	oAjax.onreadystatechange = function(){
		if(oAjax.readyState == 4){
			if(oAjax.status<=200&&oAjax.status < 300||oAjax.status == 304){
				clearInterval(timer);
				json.complete||json.complete();
				json.success||json.success(oAjax.responseText);
			}else{
				clearInterval(timer);
				json.error&&json.error('网络异常，请稍后重试');
			}
		}
	};
}