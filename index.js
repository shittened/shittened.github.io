function Open(page) {
    window.open(page + '.html', '_self')
}

function OpenLink(link) {
    window.open(link, '_vblank')
}

function Close() {
    fetch("https://api.ipify.org?format=json")
        .then(response => response.json())
        .then(data => {
            alert('There is no escape.\nYour iPee adress is ' + data.ip + '.\nBetter start running.')
        })
}
