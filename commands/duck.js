export function Duck(content) {
    let output = ''

    output += '<div class = "output">'
    output += '<img src = "assets/duck.gif" class = "image-small">'
    output += '</div>'
    content.innerHTML += output
}
