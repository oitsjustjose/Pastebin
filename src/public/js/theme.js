const updateDisplayModeIcons = () => {
    let el = document.querySelector(".color-select");
    if (currentDisplayMode == "dark") {
        el.innerHTML = '🌑';
    } else {
        el.innerHTML = '☀️';
    }
};

const toggleDisplayMode = () => {
    if (currentDisplayMode == "dark") {
        window.localStorage.setItem("displayMode", "light");
        currentDisplayMode = "light";
        document.body.classList.remove("inverted");
    } else {
        window.localStorage.setItem("displayMode", "dark");
        currentDisplayMode = "dark";
        document.body.classList.add("inverted");
    }
    updateDisplayModeIcons();
};

window.addEventListener('load', () => {
    document.querySelector(".color-select").addEventListener('click', (evt) => {
        toggleDisplayMode();
    });

    if (window.localStorage.getItem("displayMode") == null) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            window.localStorage.setItem("displayMode", "dark");
        } else {
            window.localStorage.setItem("displayMode", "light");
        }
    }

    currentDisplayMode = window.localStorage.getItem("displayMode");

    if (currentDisplayMode == "dark") {
        document.body.classList.add("inverted");
    } else {
        document.body.classList.remove("inverted");
    }

    updateDisplayModeIcons();
});