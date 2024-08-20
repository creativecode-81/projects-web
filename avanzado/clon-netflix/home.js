const simbolX = document.querySelector('.simbolX');
const content = document.querySelector('.content');

simbolX.addEventListener('click', () => {
    simbolX.classList.toggle('active');
    content.classList.toggle('hidden');

});
