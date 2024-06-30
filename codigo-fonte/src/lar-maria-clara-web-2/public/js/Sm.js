

var message_id = '#SYSTEM_MESSAGE'
function CloseSm(){
	pit(message_id).css('zIndex', 0)

	var sm = pit(message_id)

	sm.close();
	sm.removeClass('success');
	sm.removeClass('error');
}

function OpenSm(message, className){
	pit(message_id).css('zIndex', 0)

	var sm = pit(message_id)

	sm.show();
	sm.addClass(className);

	var img = pit(message_id + ' img')

	compare(className, 'success') ? img.attr('src', '/success.png') : img.attr('src', '/error.png')

    pit(message_id + ' p').html(message);

    setTimeout(CloseSm, 1000);
    pit(message_id + ' .icon-close').on('click', CloseSm)
}
