export function Help(content) {
    const commands = [
        'ls - list files/directories',
        'cd - change directory',
        'open - open file',
        'cat - read text file',
        'clear - clear screen',
        'help - show help',
        'about - credits',
        'pwd - print current directory',
        'whoami - print username',
        'su - switch user',
        'nekofetch - system info',
        'cat-fact - fact',
        'chuck-norris - fact',
        'useless-fact -fact',
        'techy-quote - quote',
        'breaking-bad - quote',
        'duck - spinning duck',
        'ani-ascii - anime ascii',
        'wttr - weather',
        'pixelcode - draw pixelart using js',
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
            if(arg[1] in current_directory) {
                parent_directory = current_directory
                parent_directory_str = current_directory_str
                current_directory = filesystem['~/'][arg[1]]
                current_directory_str = arg[1]
            }
            else {
                content.innerHTML += '<div class = "output">Directory not found</div>'
            }
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

export function Open(arg, content, current_directory, current_directory_str, animes, mangas) {
    let output = '<div class = "output">'

    if(arg[1] != null) {
        if(arg[1] in current_directory) {
            if(arg[1].split('.')[1] != 'txt') {
                switch(current_directory_str) {
                    case 'anime/':
                        if(arg[1] == 'watching') {
                            output += animes[0]
                        }
                        else {
                            output += animes[1]
                        }
                        break

                    case 'manga/':
                        if(arg[1] == 'reading') {
                            output += mangas[0]
                        }
                        else {
                            output += mangas[1]
                        }
                        break

                    default:
                        output += arg[1] + ' opened'
                        window.open(current_directory[arg[1]], '_blank').focus()
                        break
                }
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

export function Cat(arg, content, current_directory) {
    let output = '<div class = "output">'

    if(arg[1] != null) {
        if(arg[1] in current_directory) {
            if(arg[1].split('.')[1] == 'txt') {
                current_directory[arg[1]].forEach(text => {
                    output += text + '<br>'
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

export function Clear(content) {
    content.innerHTML = '<div class = "output"></div>'
}

export function PWD(content, current_directory_str, parent_directory_str) {
    let pwd = ''
    if(current_directory_str == '~/') {
        pwd = current_directory_str
    }
    else {
        if(parent_directory_str == '~/') {
            pwd = parent_directory_str + current_directory_str
        }
        else {
            pwd = '~/' + parent_directory_str + current_directory_str
        }
    }
    content.innerHTML += '<div class = "output">' + pwd + '</div>'
}

export function WhoAmI(content, username) {
    content.innerHTML += '<div class = "output">' + username + '</div>'
}

export function SwitchUser(content, arg, username) {
    if(arg[1] != null) {
        document.cookie = 'username=' + arg[1]
        return arg[1]
    }
    else {
        content.innerHTML += '<div class = "output">Specify username</div>'
        return 0
    }
}
