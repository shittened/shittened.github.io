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
        'trivia - quiz',
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

export async function Trivia(arg, content, input_form, input_form_secondary, input_field, input_field_secondary, prompt_secondary) {
    const categories = {'any': 0, 'general knownledge': 9, 'books': 10, 'film': 11, 'music': 12, 'tv': 14, 'video games': 15, 'board games': 16, 'science and nature': 17, 'computers': 18, 'math': 19, 'mythology': 20, 'sports': 21, 'geography': 22, 'history': 23, 'politics': 24, 'art': 25, 'celebrities': 26, 'animals': 27, 'vehicles': 28, 'comics': 29, 'gadgets': 30, 'anime and manga': 31, 'cartoons and animations': 32}
    const difficulties = ['any', 'easy', 'medium', 'hard']

    const cat = Object.keys(categories)
    let phase = 1
    let output = '<div class = "output">Select category by typing a category number<br>'
    let cat_left = '<div>'
    let cat_right = '<div>'
    let selected_category = 0
    let selected_difficulty = ''
    let selected_type = ''
    let trivia = {}
    let url = 'https://opentdb.com/api.php?amount=10'
    let data = {}
    let current_trivia = 0
    let answers = ['True', 'False']
    let correct_answer = ''
    let incorrect_answers = []
    let question = ''

    input_form.style.display = 'none'
    input_form_secondary.style.display = 'flex'
    prompt_secondary.innerHTML = 'Trivia > '
    input_field_secondary.focus()
    input_field_secondary.select()
    output += '<div class = "hsplit">'

    for(let i = 0; i < cat.length; i++) {
        let item = ''
        if(i < 9) {
            item += '&nbsp;'
        }
        item += Math.floor(i + 1) + '. ' + cat[i] + '<br>'

        if(i < cat.length / 2) {
            cat_left += item
        }
        else {
            cat_right += item
        }
    }

    cat_left += '</div>'
    cat_right += '</div>'
    output += cat_left + cat_right + '</div>'
    content.innerHTML += output

    const HandleSubmit = async function(e) {
        e.preventDefault()
        await ProcessInput()
    }
    input_form_secondary.addEventListener('submit', HandleSubmit)
    

    async function ProcessInput() {
        const input = input_field_secondary.value
        const arg_trivia = input.split(' ')
        const response = Math.floor(arg_trivia[0] - 1)
        output = '<div class = "output">'

        switch(phase) {
            case 1:
                if(isNaN(response)) {
                    output += 'Please select a category number'
                }
                else {
                    if(response >= cat.length || response < 0) {
                        output += 'Please select a number from above'
                    }
                    else {
                        selected_category = categories[cat[response]]
                        output += 'Select Difficulty<br>'
                        for(let i = 0; i < difficulties.length; i++) {
                            output += Math.floor(i + 1) + '. ' + difficulties[i] + '<br>'
                        }
                        phase++
                    }
                }
                break

            case 2:
                if(isNaN(response)) {
                    output += 'Please select difficulty number'
                }
                else {
                    if(response >= difficulties.length || response < 0) {
                        output += 'Please select a number from above'
                    }
                    else {
                        selected_difficulty = difficulties[response]

                        if(selected_category != 0) {
                            url += '&category=' + selected_category
                        }
                        if(selected_difficulty != 'any') {
                            url += '&difficulty=' + selected_difficulty
                        }

                        url += '&type=boolean'

                        await API(true)

                        output += question + '<br>'
                        for(let i = 0; i < answers.length; i++) {
                            output += Math.floor(i + 1) + '. ' + answers[i] + '<br>'

                        }
                        phase++
                    }
                }
                break


            case 3:
                if(isNaN(response)) {
                    output += 'Please select answer number'
                }
                else {
                    if(response >= difficulties.length || response < 0) {
                        output += 'Please select a number from above'
                    }
                    else {

                        if(answers[response] == correct_answer) {
                            output += 'CORRECT<br>'
                        }
                        else {
                            output += 'WRONG<br>'
                        }

                        if(current_trivia < 9) {
                            output += 'Do you want another one? (y/n)<br>'
                            phase++
                        }
                        else {
                            EndTrivia()
                        }
                    }
                }
                break

            case 4:
                if(arg_trivia == 'y' || arg_trivia == 'Y') {
                    current_trivia++
                    await API(false)

                    output += question + '<br>'
                    for(let i = 0; i < answers.length; i++) {
                        output += Math.floor(i + 1) + '. ' + answers[i] + '<br>'

                    }
                    phase--
                }
                else if(arg_trivia == 'n' || arg_trivia == 'N') {
                    EndTrivia()
                }
                else {
                    output += 'Please type y for yes or n for no'
                }
                break
        }

        content.innerHTML += '<div class = "output">Trivia > ' + arg_trivia + '</div>'
        output += '</div>'
        content.innerHTML += output
        input_form_secondary.reset()
        input_form_secondary.scrollIntoView({behavior: 'instant'})
    }

    async function API(first_time) {
        if(first_time) {
            const result = await fetch(url)
            data = await result.json()
            data = data.results
        }

        question = data[current_trivia].question
        correct_answer = data[current_trivia].correct_answer
        incorrect_answers = data[current_trivia].incorrect_answers
    }

    function EndTrivia() {
        input_form_secondary.removeEventListener('submit', HandleSubmit)
        input_form_secondary.style.display = 'none'
        input_form.style.display = 'flex'
        input_field.focus()
        input_field.select()
        phase = 1
        current_trivia = 0
        selected_category = 0
        selected_difficulty = ''
        selected_type = ''
        url = 'https://opentdb.com/api.php?amount=10'
        data = {}
        correct_answer = ''
        incorrect_answers = []
        question = ''
    }
}
