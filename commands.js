import * as core from './commands/core.js'
import * as fq from './commands/facts-quotes.js'
import * as nekofetch from './commands/nekofetch.js'
import * as trivia from './commands/trivia.js'
import * as duck from './commands/duck.js'
import * as about from './commands/about.js'
import * as ani_ascii from './commands/ani-ascii.js'

export function Commands(arg, content, current_directory, current_directory_str, parent_directory,
    parent_directory_str, file_system, input_form, input_form_secondary, input_field,
    input_field_secondary, prompt_secondary) {

    switch(arg[0]) {
        case 'clear':
            core.Clear(content)
            break

        case 'help':
            core.Help(content)
            break

        case 'ls':
            core.LS(arg, content, current_directory)
            break

        case 'cd':
            return core.CD(arg, content, current_directory, current_directory_str, parent_directory,
                parent_directory_str, file_system)
            break

        case 'open':
            core.Open(arg, content, current_directory)
            break

        case 'cat':
            core.Cat(arg, content, current_directory)
            break

        case 'KmP|S':
            core.FuLpOs(content)
            break

        case 'cat-fact':
            fq.CatFact(content)
            break

        case 'chuck-norris':
            fq.ChuckNorrisQuote(content)
            break

        case 'useless-fact':
            fq.UselessFact(content)
            break

        case 'breaking-bad':
            fq.BreakingBadQuotes(content)
            break

        case 'duck':
            duck.Duck(content)
            break

        case 'nekofetch':
            nekofetch.Nekofetch(content)
            break

        case 'trivia':
            trivia.Trivia(arg, content, input_form, input_form_secondary, input_field, input_field_secondary, prompt_secondary)
            break

        case 'about':
            about.About(content)
            break

        case 'ani-ascii':
            ani_ascii.AniAscii(content, arg)
            break

        default:
            content.innerHTML += '<div class = "output">Command not found</div>'
            break
    }
    return 0
}
