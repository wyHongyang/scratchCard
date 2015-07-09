/*
 * @param uri
 * @param params [{
 *   "name":[paramName],
 *   "value":[value]
 * }]
 * */
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
	$.extend({
		addURIParam : function (uri,params){
			var url = uri,
			len = params.length;
			url += (uri.indexOf('?') == -1 ? '?' : '&')
			if(params && len){
				if(len >= 1){
					url += ($.map(params,function(n,i){
						if(i == len-1){
							return ''+n.name+'='+n.value;
						}else{
							return ''+n.name+'='+n.value+'&';
						}
					}).join(''));
				}
			}
			return url;
		},
		matchParam : function (paramArr,name,value){
			var param = {},
			arr = paramArr;
			param.name = name;
			param.value = value;
			arr.push(param);
			return arr;
		}
	});
}));


/*function addURIParam(uri,params){
	var url = uri,
		len = params.length;
	url += (uri.indexOf('?') == -1 ? '?' : '&')
	if(params && len){
		if(len >= 1){
			url += ($.map(params,function(n,i){
				if(i == len-1){
					return ''+n.name+'='+n.value;
				}else{
					return ''+n.name+'='+n.value+'&';
				}
			}).join(''));
		}
	}
	return url;
}

function matchParam(paramArr,name,value){
	var param = {},
		arr = paramArr;
	param.name = name;
	param.value = value;
	arr.push(param);
	return arr;
}*/

