const quote_div = document.querySelector('#quote')

function Open(page) {
    window.open(page + '.html', '_self')
}

function OpenLink(link) {
    window.open(link, '_vblank')
}

function Close() {
    fetch("https://api.ipify.org?format=json")
        .then(response => response.json())
        .then(data => {
            alert('There is no escape.\nYour iPee adress is ' + data.ip + '.\nBetter start running.')
        })
}

async function CatFact() {
    const response = await fetch('https://meowfacts.herokuapp.com/')
    const data = await response.json()
    return data.data[0]
}

async function ChuckNorrisQuote() {
    const response = await fetch('https://api.chucknorris.io/jokes/random')
    const data = await response.json()
    return data.value
}

async function UselessFact() {
    const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
    const data = await response.json()
    return data.text
}

async function TechyQuote() {
    const response = await fetch('https://techy-api.vercel.app/api/json')
    const data = await response.json()
    return data.message
}

async function BreakingBadQuotes() {
    const response = await fetch('https://api.breakingbadquotes.xyz/v1/quotes')
    const data = await response.json()
    return data[0].quote + ' - ' + data[0].author + ' (Breaking Bad)'
}

async function SetQuote(num) {
    let quote
    switch(num) {
        case 1:
            quote = await CatFact()
            break
        case 2:
            quote = await ChuckNorrisQuote()
            break
        case 3:
            quote = await UselessFact()
            break
        case 4:
            quote = await TechyQuote()
            break
        default:
            quote = await BreakingBadQuotes()
            break
    }
    quote_div.innerHTML = quote
    console.log(quote)
}

let rand_num = Math.floor(Math.random() * (5 - 1) + 1)
console.log(rand_num)
SetQuote(rand_num)
