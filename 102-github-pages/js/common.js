function contain(parent, target) {
	if(parent.contains) {
		return parent.contains(target);

	} else if (parent.compareDocumentPosition) {

		return !!parent.compareDocumentPosition(target) & 16;
	}
}
function hasClass(target, Name) {
    
    
    var pattern = new RegExp("\\s\*"+Name+"\\s\*"); 
    
    return pattern.test(target.className);
       
    
}

function removeClass(target, name) {
	
    var pattern = new RegExp("\\s\*"+name+"\\s\*");

    if(hasClass(target, name)) {
    	target.className = target.className.replace(pattern, '');
    }
}

function addClass(target, name) {
	var pattern = new RegExp("\\s\*"+name+"\\s\*");

    if(!hasClass(target, name)) {
    	target.className += " "+name;
	}
}

function toggleClass(target, name) {
	var pattern = new RegExp("\\s\*"+name+"\\s\*");
	hasClass(target, name) ? removeClass(target, name) : addClass(target, name);

}

function getByClass(oParent, Name) {
    var Elems = oParent.getElementsByTagName("*");
    var Result = [];
    var check = false;
    var pattern = new RegExp("\\s\*"+Name+"\\s\*"); 
    for (var i=0; i< Elems.length; i++) {
        
        check = pattern.test(Elems[i].className);
       
        if (check === true) {
            Result.push(Elems[i]);
        }
    }
    return Result;
}

function getStyle(obj, name) {

    if (obj.currentStyle) {
        return obj.currentStyle[name];

    } else if(window.getComputedStyle){

        
        return getComputedStyle(obj, null)[name];

    }
    console.log("无法获取 "+obj+" 的样式");
}

function move(obj, Style, fn) {
	    clearInterval(obj.timer);
	    obj.timer = setInterval(function  () {
	    
	        var stop = true;

	        for(var attr in Style)  {
	            var curr = 0;
	            if (attr === 'opacity') {
	    
	                curr = Math.round(parseFloat(getStyle(obj, attr))*100);
	            } else {
	    
	                curr = parseInt(getStyle(obj, attr));
	            }
	           
	            var speed = (Style[attr] - curr)/5;
	            speed = speed > 0? Math.ceil(speed) : Math.floor(speed);
	        	
	            if (Style[attr] != curr) {
	                stop = false;
	            }

	            if (attr === 'opacity'){
	                obj.alpha += speed;
	                obj.style.filter = 'aplha(opacity:'+ (curr+speed) + ')';
	                obj.style.opacity = (curr + speed)/100;
	            } else {
	                obj.style[attr] = curr + speed + "px";
	                
	            }
	            
	        }

	        if(stop) {
	            clearInterval(obj.timer);
	            if(fn) {
	                fn();
	            }
	        }

	    }, 30);
	}

module.exports = {
	contain: contain,
	hasClass: hasClass,
	addClass: addClass,
	removeClass: removeClass,
	getStyle: getStyle,
	getByClass: getByClass,
	move: move
};