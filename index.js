import {Blogs} from './blogs.js'

const input_form = document.querySelector('.input-form')
const input_field = document.querySelector('#input')
const content = document.querySelector('.content')
const path = document.querySelector('.path')

const filesystem = {
    '~/': {
        //'./socials': {
        //    'github',
        //    'lemmy',
        //    'mastodon',
        //    'itch.io',
        //    'substack',
        //},
        'games/': {
            'cowwy-jump': 'https://kiefciman.itch.io/cowwy-jump-alpha',
            'froggy-lunch': 'https://kiefciman.itch.io/froggy-lunch',
            'mine': 'https://kiefciman.itch.io/mine',
        },
        //'arcade/': {
        //    'pong': '',
        //},
        'blogs/': {
            'farting': Blogs()['farting'],
        },
        'anime/': {
            'watching/': {},
            'complete/': {},
        },
        'manga/': {
            'reading/': {},
            'complete/': {},
        },
        'links/': {
            'stallman.org': 'https://stallman.org/',
            'omfgdogs': 'https://www.omfgdogs.com/',
        }
    }
}
let current_directory = filesystem['~/']
let current_directory_str = '~/'
let parent_directory = filesystem['~/']
let parent_directory_str = '~/'
let prompt = Prompt()

path.innerHTML = prompt

input_field.focus()
input_field.select()

input_form.addEventListener(
    'submit', function(e) {
        e.preventDefault()
        ProcessInput()
    }
)

async function ProcessInput() {
    const input = input_field.value
    const arg = input.split(' ')
    let output = ''

    content.innerHTML += '<div class = "output">' + prompt + input + '</div>'

    switch(arg[0]) {
        case 'clear':
            content.innerHTML = '<div class = "output"></div>'
            break

        case 'help':
            Help()
            break

        case 'ls':
            LS(arg)
            break

        case 'cd':
            CD(arg)
            break

        case 'open':
            Open(arg)
            break

        case 'cat-fact':
            CatFact()
            break

        case 'chuck-norris':
            ChuckNorrisQuote()
            break

        case 'useless-fact':
            UselessFact()
            break

        case 'breaking-bad':
            BreakingBadQuotes()
            break

        case 'duck':
            Duck()
            break

        case 'nekofetch':
            Nekofetch()
            break

        default:
            content.innerHTML += '<div class = "output">Command not found</div>'
            break
    }
    input_form.reset()
    input_form.scrollIntoView({behavior: 'instant'})
    prompt = Prompt()
    path.innerHTML = prompt
}

function Prompt() {
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
    return 'shitten ' + pwd + ' > '
}

async function CatFact() {
    const response = await fetch('https://meowfacts.herokuapp.com/')
    const data = await response.json()
    content.innerHTML += '<div class = "output">' + data.data[0] + '</div>'
}

async function ChuckNorrisQuote() {
    const response = await fetch('https://api.chucknorris.io/jokes/random')
    const data = await response.json()
    content.innerHTML += '<div class = "output">' + data.value + '</div>'
}

async function UselessFact() {
    const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
    const data = await response.json()
    content.innerHTML += '<div class = "output">' + data.text + '</div>'
}

async function BreakingBadQuotes() {
    const response = await fetch('https://api.breakingbadquotes.xyz/v1/quotes')
    const data = await response.json()
    content.innerHTML += '<div class = "output">' + data[0].quote + ' - ' + data[0].author + '</div'
}

function Help() {
    const commands = [
        'ls - list files/directories',
        'cd - change directory',
        'open - open file',
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

function LS(arg) {
    let output = '<div class = "output">'

    if(arg[1] != null) {
        arg[1] += '/'
        if(arg[1] in current_directory) {
            for(var dir in current_directory[arg[1]]) {
                output += dir + '<br>'
            }
        }
        else {
            output += 'Directory not found'
        }
    }
    else {
        for(var dir in current_directory) {
            output += dir + '<br>'
        }
    }

    output += '</div>'
    content.innerHTML += output
}

function CD(arg) {
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
}

function Open(arg) {
    let output = ''

    if(arg[1] != null) {
        if(arg[1] in current_directory) {
            if(current_directory_str == 'blogs/') {
                output = '<div class = "output">' + current_directory[arg[1]] + '</div>'
            }
            else {
                output = '<div class = "output">' + arg[1] + ' opened</div>'
                window.open(current_directory[arg[1]], '_blank').focus()
            }
        }
        else {
            output = '<div class = "output">File not found</div>'
        }
    }

    content.innerHTML += output
}

function Duck() {
    let output = ''

    output += '<div class = "output">'
    output += '<img src = "assets/duck.gif" class = "image-small">'
    output += '</div>'
    content.innerHTML += output
}

function Nekofetch() {
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
        'Fav games #2: Lego Fortnite Odyssey, Tales of Symphonia',
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
