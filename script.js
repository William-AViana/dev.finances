const buttonNew = document.querySelector('button new')

const modalOverlay = document.querySelector('.modal-overlay')

function activeModal() {
    modalOverlay.classList.add('active')
}

function closeModal() {
    modalOverlay.classList.remove('active')
}