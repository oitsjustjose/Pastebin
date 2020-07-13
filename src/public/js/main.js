window.addEventListener('load', () => {
    const form = document.forms[0];

    form.querySelector('textarea').addEventListener('keydown', (evt) => {
        if (evt.key === 'Tab') {
            evt.preventDefault();

            const start = evt.target.selectionStart;
            const end = evt.target.selectionEnd;

            evt.target.value = `${evt.target.value.substring(0, start)}    ${evt.target.value.substring(end)}`;
            evt.target.selectionStart = evt.target.selectionEnd = start + 4;
        }
    });

    form.addEventListener('submit', async (evt) => {
        evt.preventDefault();

        const paste = form.querySelector('#paste').value;
        const exp = form.querySelector('#expiry').value;
        const syntax = form.querySelector('#syntax').value;

        const resp = await fetch('/', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                paste: paste,
                syntax: syntax,
                expiry: exp
            })
        });

        if (resp.status === 200) {
            const json = await resp.json();
            location.assign(`/${json.shortid}`);
        } else {
            alert('There was an error in creating this paste :(');
        }
    });
});
