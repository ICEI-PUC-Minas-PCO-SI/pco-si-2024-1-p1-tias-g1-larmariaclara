function ModalOpen(modal){
	pit('#MODALBOX').addClass('modal')
	pit(modal).show()
}

function ModalClose(){
	pit('.modal-content').close()
	pit('#MODALBOX').removeClass('modal')
}
