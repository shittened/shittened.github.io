export function Nekofetch(content) {
    let output = ''
    const ascii = [
        '     /\\_/\\', 
        '    ( > < )',
        ' ___\\  ^  \/___', 
        '(___   _   ___)',
        '    \\ ( ) /  /\\',
        '    | (_) |_/ /',
        '    \\  _  /__/',
        '    | | | |',
        '    (_) (_)'
    ]
    const stats = [
        'OS: Arch Linux',
        'Host: Github',
        'WM: dwm/qtile/awesomewm',
        'Programing: js, py, lua, C, C++, C#',
        'Consoles: Wii, PS2, Switch',
        'Fav games #1: Xenosaga, Snowrunner, Wii Fishing Resort,',
        'Fav games #2: Lego Fortnite Odyssey, Skyrim',
        'Fav animes: Naruto, AOT, Tokyo Ghoul, Girls Last Tour',
        'Fav mangas: 20th Century Boys, Monster, Chainsaw Man'
    ]

    output += '<div class = "output"><div class = "hsplit"><pre class = "ascii">'

    ascii.forEach(line => {
        output += line + '<br>'
    })

    output += '</pre>'

    stats.forEach(line => {
        output += ' | ' + line + '<br>'
    })

    output += '</div></div>'
    content.innerHTML += output
}
