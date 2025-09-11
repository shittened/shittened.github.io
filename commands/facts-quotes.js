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


