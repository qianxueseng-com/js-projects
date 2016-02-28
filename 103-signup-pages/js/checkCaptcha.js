function checkCaptcha(event, captcha) {
	event = event || window.event;
	if (event.offsetX > captcha.xl && event.offsetX < captcha.xr && 
		  event.offsetY > captcha.yt && event.offsetY < captcha.yb) {
		return true;
	} else {
		return false;
	}
}
module.exports = checkCaptcha;