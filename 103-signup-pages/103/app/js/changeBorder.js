
module.exports = function() {
	$('input').on('focus', function() {
		$('.email-text').css('border', '1px solid #e8e8e8' );
		$('.mobile-text').css('border', '1px solid #e8e8e8');
	})
}
