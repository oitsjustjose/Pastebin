let currentDisplayMode = null;

const updateDisplayModeIcons = () => {
    let el = document.querySelector('.color-select');
    if (currentDisplayMode == 'dark') {
        el.innerHTML = '🌑';
    } else if (currentDisplayMode == 'light') {
        el.innerHTML = '☀️';
    } else {
        el.innerHTML = '🕐';
    }
};

const toggleDisplayMode = () => {
    if (currentDisplayMode == 'dark') {
        window.localStorage.setItem('displayMode', 'light');
        currentDisplayMode = 'light';
        document.body.classList.remove('inverted');
    } else if (currentDisplayMode == 'light') {
        window.localStorage.setItem('displayMode', 'auto');
        currentDisplayMode = 'auto';
        updateAutoTheme();
    } else {
        window.localStorage.setItem('displayMode', 'dark');
        currentDisplayMode = 'dark';
        document.body.classList.add('inverted');
    }
    updateDisplayModeIcons();
};

const updateAutoTheme = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('inverted');
    } else {
        document.body.classList.remove('inverted');
    }
};

const initThemeWatcher = () => {
    setInterval(() => {
        if (window.matchMedia) {
            if (currentDisplayMode === "auto") {
                updateAutoTheme();
            }
        }
    }, 1000);
};

window.addEventListener('load', () => {
    document.querySelector('.color-select').addEventListener('click', (evt) => {
        toggleDisplayMode();
    });

    if (window.localStorage.getItem('displayMode') == null) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            window.localStorage.setItem('displayMode', 'dark');
        } else {
            window.localStorage.setItem('displayMode', 'light');
        }
    }

    currentDisplayMode = window.localStorage.getItem('displayMode');

    if (currentDisplayMode == 'dark') {
        document.body.classList.add('inverted');
    } else if (currentDisplayMode == 'light') {
        document.body.classList.remove('inverted');
    } else {
        updateAutoTheme();
        initThemeWatcher();
    }

    updateDisplayModeIcons();
});