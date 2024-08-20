const body = document.querySelector('body'),
    sideBar = body.querySelector('.sidebar'),
    toggle = body.querySelector('.toggle'),
    btnSearch = body.querySelector('.search-box'),
    modeSwitch = body.querySelector('.toggle-switch'),
    modeText = body.querySelector('.mode-text');

toggle.addEventListener('click', () => {
    sideBar.classList.toggle('close');
});

btnSearch.addEventListener('click', () => {
    sideBar.classList.remove('close');
});

modeSwitch.addEventListener('click', () => {
    body.classList.toggle('dark');

    if (body.classList.contains('dark')) {
        modeText.innerHTML = 'Light mode';
    } else {
        modeText.innerHTML = 'Dark mode';
    }
});
