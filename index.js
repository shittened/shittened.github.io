import * as blogs from './blogs.js'
import * as commands from './commands.js'
import * as filesystem from './filesystem.js'
import * as prompt from './prompt.js'
import * as ani_ascii from '/commands/ani-ascii.js'
import * as user from './user.js'
import * as anime from './commands/anime.js'
import * as manga from './commands/manga.js'
import * as db from './db.js'

const input_form = document.querySelector('#main-form')
const input_field = document.querySelector('#input-main')
const input_field_secondary = document.querySelector('#input-secondary')
const content = document.querySelector('.content')
const prompt_main = document.querySelector('#prompt-main')
const file_system = filesystem.Filesystem(blogs, db, anime, manga)

var current_directory = file_system['~/']
var current_directory_str = '~/'
var parent_directory = file_system['~/']
var parent_directory_str = '~/'
var username = user.GetUser()
var pwd = prompt.Prompt(current_directory_str, parent_directory_str, username)
var pixelcode_id = 0

ani_ascii.AniAscii(content, [])

prompt_main.innerHTML = pwd

input_field.focus()
input_field.select()

input_form.addEventListener(
    'submit', function(e) {
        e.preventDefault()
        ProcessInput()
    }
)

async function ProcessInput() {
    const prev_pixelcode = document.querySelector('#pixelcode' + Math.floor(pixelcode_id - 1))
    if(prev_pixelcode) {
        prev_pixelcode.innerHTML = ''
    }

    const input = input_field.value
    const arg = input.split(' ')
    let output = ''

    content.innerHTML += '<div class = "output">' + pwd + input + '</div>'

    const process_command = await commands.Commands(arg, content, current_directory, current_directory_str,parent_directory, parent_directory_str, file_system, input_form, input_field, username, pixelcode_id, db)

    if(process_command != 0) {
        switch(process_command[0]) {
            case 'cd':
                [current_directory, current_directory_str, parent_directory,
                    parent_directory_str] = process_command[1]
                break
            case 'su':
                username = process_command[1]
                break
            case 'pixelcode_id':
                pixelcode_id = process_command[1]
                break
        }
    }

    input_form.reset()
    input_form.scrollIntoView({behavior: 'instant'})
    pwd = prompt.Prompt(current_directory_str, parent_directory_str, username)
    prompt_main.innerHTML = pwd
}
