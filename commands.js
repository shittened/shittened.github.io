import * as core from './commands/core.js'
import * as fq from './commands/facts-quotes.js'
import * as nekofetch from './commands/nekofetch.js'
import * as duck from './commands/duck.js'
import * as about from './commands/about.js'
import * as ani_ascii from './commands/ani-ascii.js'
import * as wttr from './commands/wttr.js'
import * as pixelcode from './commands/pixelcode.js'
import * as anime from './commands/anime.js'
import * as manga from './commands/manga.js'

export async function Commands(arg, content, current_directory, current_directory_str, parent_directory,
    parent_directory_str, file_system, input_form, input_field, username, id, db) {
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
            return ['cd', core.CD(arg, content, current_directory, current_directory_str, parent_directory,
                parent_directory_str, file_system)]
            break

        case 'open':
            core.Open(arg, content, current_directory, current_directory_str, anime.Anime(db.animes), manga.Manga(db.mangas))
            break

        case 'cat':
            core.Cat(arg, content, current_directory)
            break

        case 'KmP|S':
            core.FuLpOs(content)
            break

        case 'pwd':
            core.PWD(content, current_directory_str, parent_directory_str)
            break

        case 'whoami':
            core.WhoAmI(content, username)
            break

        case 'su':
            const switch_user = core.SwitchUser(content, arg, username)
            if(switch_user != 0) {
                return ['su', switch_user]
            }
            break

        case 'cat-fact':
            await fq.CatFact(content)
            break

        case 'chuck-norris':
            await fq.ChuckNorrisQuote(content)
            break

        case 'useless-fact':
            await fq.UselessFact(content)
            break

        case 'breaking-bad':
            await fq.BreakingBadQuotes(content)
            break

        case 'duck':
            duck.Duck(content)
            break

        case 'nekofetch':
            nekofetch.Nekofetch(content)
            break

        case 'about':
            about.About(content)
            break

        case 'ani-ascii':
            ani_ascii.AniAscii(content, arg)
            break

        case 'wttr':
            await wttr.Wttr(content, arg)
            break

        case 'pixelcode':
            const pixelcode_id = pixelcode.PixelCode(content, arg, id)
            return ['pixelcode_id', pixelcode_id]
            break

        default:
            content.innerHTML += '<div class = "output">Command not found</div>'
            break
    }
    return 0
}
