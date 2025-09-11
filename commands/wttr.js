export async function Wttr(content, arg) {
    let output = '<div class = "output">'

    if(arg[1] != null) {
        const location = arg.slice(1). join(' ')
        const response = await fetch('https://wttr.in/' + location + '?format=j1')
        const data = await response.json()
        const wttr = data.current_condition[0]
        output += wttr.temp_C + 'C/' + wttr.temp_F + 'F '
        output += '(feels like ' + wttr.FeelsLikeC + 'C/' + wttr.FeelsLikeF + 'F)<br>'
        output += 'Humidity ' + wttr.humidity + '%<br>'
        output += wttr.weatherDesc[0].value
        console.log(wttr)
    }
    else {
       output += "Specify location" 
    }

    output += '</div>'
    content.innerHTML += output
}
