export async function CatFact(content) {
    const response = await fetch('https://meowfacts.herokuapp.com/')
    const data = await response.json()
    content.innerHTML += '<div class = "output">' + data.data[0] + '</div>'
}

export async function ChuckNorrisQuote(content) {
    const response = await fetch('https://api.chucknorris.io/jokes/random')
    const data = await response.json()
    content.innerHTML += '<div class = "output">' + data.value + '</div>'
}

export async function UselessFact(content) {
    const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
    const data = await response.json()
    content.innerHTML += '<div class = "output">' + data.text + '</div>'
}

export async function BreakingBadQuotes(content) {
    const response = await fetch('https://api.breakingbadquotes.xyz/v1/quotes')
    const data = await response.json()
    content.innerHTML += '<div class = "output">' + data[0].quote + ' - ' + data[0].author + '</div'
}

export function Help(content) {
    const commands = [
        'ls - list files/directories',
        'cd - change directory',
        'open - open file',
        'cat - read text file',
        'clear - clear screen',
        'help - show help',
        'nekofetch - system info',
        'cat-fact - fact',
        'chuck-norris - fact',
        'useless-fact -fact',
        'techy-quote - quote',
        'breaking-bad - quote',
        'duck - spinning duck',
    ]
    let output = '<div class = "output">'

    commands.forEach(command => {
        output += command + '<br>'
    })

    output += '</div>'
    content.innerHTML += output
}

export function LS(arg, content, current_directory) {
    let output = '<div class = "output">'

    if(arg[1] != null) {
        arg[1] += '/'
        if(arg[1] in current_directory) {
            if(Array.isArray(current_directory[arg[1]])) {
                current_directory[arg[1]].forEach(function(thing, i, array) {
                    output += thing + '<br>'
                    if(i < array.length - 1) {
                        output += '<br>'
                    }
                })
            }
            else {
                for(var dir in current_directory[arg[1]]) {
                    output += dir + '<br>'
                }
            }
        }
        else {
            output += 'Directory not found'
        }
    }
    else {
        if(Array.isArray(current_directory)) {
            current_directory.forEach(function(thing, i, array) {
                output += thing + '<br>'
                if(i < array.length - 1) {
                    output += '<br>'
                }
            })
        }
        else {
            for(var dir in current_directory) {
                output += dir + '<br>'
            }
        }
    }

    output += '</div>'
    content.innerHTML += output
}

export function CD(arg, content, current_directory, current_directory_str, parent_directory, parent_directory_str, filesystem) {
    if(arg[1] != null) {
        if(arg[1] == '..') {
            current_directory = parent_directory
            current_directory_str = parent_directory_str
            parent_directory = filesystem['~/']
            parent_directory_str = '~/'
        }
        else {
            arg[1] += '/'
            parent_directory = current_directory
            parent_directory_str = current_directory_str
            current_directory = filesystem['~/'][arg[1]]
            current_directory_str = arg[1]
        }
    }
    else {
        current_directory = filesystem['~/']
        current_directory_str = '~/'
        parent_directory = filesystem['~/']
        parent_directory_str = '~/'
    }

    return [current_directory, current_directory_str, parent_directory, parent_directory_str]
}

export function Open(arg, content, current_directory) {
    let output = '<div class = "output">'

    if(arg[1] != null) {
        if(arg[1] in current_directory) {
            if(arg[1].split('.')[1] != 'txt') {
                output += arg[1] + ' opened'
                window.open(current_directory[arg[1]], '_blank').focus()
            }
            else {
                output += 'Use command "cat" to read a text file'
            }
        }
        else {
            output += 'File not found'
        }
    }
    else {
        output += 'Specify file to open'
    }

    output += '</div>'
    content.innerHTML += output
}

export function Duck(content) {
    let output = ''

    output += '<div class = "output">'
    output += '<img src = "assets/duck.gif" class = "image-small">'
    output += '</div>'
    content.innerHTML += output
}

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

    output += '<div class = "output"><div class = "nekofetch"><pre class = "ascii">'

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

export function Cat(arg, content, current_directory) {
    let output = '<div class = "output">'

    if(arg[1] != null) {
        if(arg[1] in current_directory) {
            if(arg[1].split('.')[1] == 'txt') {
                current_directory[arg[1]].forEach(text => {
                    output += text
                })
            }
            else {
                output += 'Use command "open" to open a non-text file'
            }
        }
        else {
            output += 'File not found'
        }
    }
    else {
        output += 'Specify text file to read'
    }

    output += '</div>'
    content.innerHTML += output
}
