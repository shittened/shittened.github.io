export function AnimeTXT(watching, animes) {
    const anime_list = []

    animes.forEach(anime => {
        if(watching && anime[1]) {
            anime_list.push(anime[0])
        }

        if(!watching && !anime[1]) {
            anime_list.push(anime[0])
        }
    })

    return anime_list
}

export function Anime(animes) {
    let output1 = 'ANIMES I WATCH<br><div class = "boxsplit">'
    let output2 = 'ANIMES I COMPLETED<br><div class = "boxsplit">'

    animes.forEach(anime => {
        if(anime[1]) {
            output1 += '<div class = "box"><img src ="' + anime[2] + '">' + anime[0] + '</div>'
        }
        else {
            output2 += '<div class = "box"><img src ="' + anime[2] + '">' + anime[0] + '</div>'
        }
    })

    output1 += '</div>'
    output2 += '</div>'
    return [output1, output2] 
}
