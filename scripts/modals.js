function InitModalLogic(modalId) {
    // Elemento che rappresenta il modal
    const modalElement = document.getElementById(modalId + '_modal');

    // Stati del modal
    const modalStates = [
        {
            'action': 'open',
            'display': 'block'
        },
        {
            'action': 'close',
            'display': 'none'
        },
    ];

    // Aggiungo gli eventi per aprire e chiudere il modal
    modalStates.forEach(function (state) {
        document.getElementById(modalId + '_modal_' + state.action).addEventListener('click', function () {
            modalElement.style.display = state.display;
        });
    });
}

function closeModal(modalId){
    document.getElementById(modalId + '_modal_close').click();
}