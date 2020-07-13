let currentDisplayMode = null;
let themeWatcher = null;

const setDark = () => {
    document.getElementById('prism-js').setAttribute('src', '/Libraries/prism-dark.js');
    document.getElementById('prism-css').setAttribute('href', '/Libraries/prism-dark.css');
    document.body.style.background = '#2d2d2d';
};

const setLight = () => {
    document.getElementById('prism-js').setAttribute('src', '/Libraries/prism-light.js');
    document.getElementById('prism-css').setAttribute('href', '/Libraries/prism-light.css');
    document.body.style.background = '#f5f2f0';
};

const initThemeWatcher = () => {
    themeWatcher = setInterval(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setDark();
        } else {
            setLight();
        }
    }, 1000);
};

window.addEventListener('load', () => {
    if (window.localStorage.getItem('displayMode') == null) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setDark();
        } else {
            setLight();
        }
    }

    currentDisplayMode = window.localStorage.getItem('displayMode');

    if (currentDisplayMode == 'dark') {
        setDark();
    } else if (currentDisplayMode == 'light') {
        setLight();
    } else {
        initThemeWatcher();
    }
});