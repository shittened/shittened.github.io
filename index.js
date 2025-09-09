import * as blogs from './blogs.js'
import * as commands from './commands.js'
import * as filesystem from './filesystem.js'
import * as prompt from './prompt.js'

const input_form = document.querySelector('.input-form')
const input_field = document.querySelector('#input')
const content = document.querySelector('.content')
const path = document.querySelector('.path')
const file_system = await filesystem.Filesystem(blogs)

var current_directory = file_system['~/']
var current_directory_str = '~/'
var parent_directory = file_system['~/']
var parent_directory_str = '~/'
var pwd = prompt.Prompt(current_directory_str, parent_directory_str)

path.innerHTML = pwd

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

    content.innerHTML += '<div class = "output">' + pwd + input + '</div>'

    switch(arg[0]) {
        case 'clear':
            content.innerHTML = '<div class = "output"></div>'
            break

        case 'help':
            commands.Help(content)
            break

        case 'ls':
            commands.LS(arg, content, current_directory)
            break

        case 'cd':
            [current_directory, current_directory_str, parent_directory, parent_directory_str] = commands.CD(arg, content, current_directory, current_directory_str, parent_directory, parent_directory_str, file_system)
            break

        case 'open':
            commands.Open(arg, content, current_directory)
            break

        case 'cat':
            commands.Cat(arg, content, current_directory)
            break

        case 'cat-fact':
            commands.CatFact(content)
            break

        case 'chuck-norris':
            commands.ChuckNorrisQuote(content)
            break

        case 'useless-fact':
            commands.UselessFact(content)
            break

        case 'breaking-bad':
            commands.BreakingBadQuotes(content)
            break

        case 'duck':
            commands.Duck(content)
            break

        case 'nekofetch':
            commands.Nekofetch(content)
            break

        default:
            content.innerHTML += '<div class = "output">Command not found</div>'
            break
    }
    input_form.reset()
    input_form.scrollIntoView({behavior: 'instant'})
    pwd = prompt.Prompt(current_directory_str, parent_directory_str)
    path.innerHTML = pwd
}
