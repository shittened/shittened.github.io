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
