import {Blogs} from './blogs.js'

const input_form = document.querySelector('.input-form')
const input_field = document.querySelector('#input')
const content = document.querySelector('.content')
const path = document.querySelector('.path')

const commands = [
    'ls - list files/directories',
    'cd - change directory',
    'open - open file',
    'clear - clear screen',
    'help - show help',
]
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

function ProcessInput() {
    const input = input_field.value
    const arg = input.split(' ')
    let output = ''

    content.innerHTML += '<div class = "output">' + prompt + input + '</div>'

    switch(arg[0]) {
        case 'clear':
            content.innerHTML = '<div class = "output"></div>'
            break

        case 'help':
            output = '<div class = "output">'
            commands.forEach(command => {
                output += command + '<br>'
            })
            output += '</div>'
            content.innerHTML += output
            break

        case 'ls':
            output = '<div class = "output">'
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
            break

        case 'cd':
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
            break

        case 'open':
            if(arg[1] != null) {
                if(arg[1] in current_directory) {
                    if(current_directory_str == 'blogs/') {
                        output = '<div class = "output>' + current_directory[arg[1]] + '</div>'
                    }
                    else {
                        output = '<div class = "output">' + arg[1] + ' opened</div>'
                        window.open(current_directory[arg[1]], '_blank').focus()
                    }
                }
                else {
                    output = '<div class = "output">' + arg[1] + ':file not found</div>'
                }
            }
            console.log(output)
            content.innerHTML += output
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
