export function MangaTXT(reading, mangas) {
    const manga_list = []

    mangas.forEach(manga => {
        if(reading && manga[1]) {
            manga_list.push(manga[0])
        }

        if(!reading && !manga[1]) {
            manga_list.push(manga[0])
        }
    })

    return manga_list
}

export function Manga(mangas) {
    let output1 = 'MANGAS I READ<br><div class = "boxsplit">'
    let output2 = 'MANGAS I COMPLETED<br><div class = "boxsplit">'

    mangas.forEach(manga => {
        if(manga[1]) {
            output1 += '<div class = "box"><img src ="' + manga[2] + '">' + manga[0] + '</div>'
        }
        else {
            output2 += '<div class = "box"><img src ="' + manga[2] + '">' + manga[0] + '</div>'
        }
    })

    output1 += '</div>'
    output2 += '</div>'
    return [output1, output2] 
}
