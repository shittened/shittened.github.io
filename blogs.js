export async function Blogs() {
    let blogs = []
    const mastodon = await Mastodon()

    blogs.push('Farting is an essential day to day activity. It helps maintain a healthy lifestyle and keeps bloating away. There are multiple types of farts, but the most common way to categorize them is by the loudness/stinkyness ratio. Essentially, the louder the fart, the less stinky (fully silent farts are the most nocive for surrounding victims). Farting can be enjoyed alone or can be turned into a group activity.')

    mastodon.forEach(post => {
        blogs.push(post)
    })

    for(let i = 0; i < blogs.length; i++) {
        blogs[i] += '<br>'
        if(i < blogs.length -1) {
            blogs[i] += '<br>'
        }
    }

    return blogs
}

async function Mastodon() {
    let mastodon = []
    const rss = await fetch('https://mastodon.social/@kiefciman.rss')
    const xml = await rss.text()
    const parser = new DOMParser()
    const parsed = parser.parseFromString(xml, 'text/xml')
    const items = parsed.getElementsByTagName('description')

    for(let i = 0; i < items.length; i++) {
        let post = items[i].childNodes[0].nodeValue
        post = String(post).split('</p>')[0].split('<p>')[1]

        if(String(post).substring(0, 1) != '<' && post != null) {
            mastodon.push(post)
        }
    }

    return mastodon.reverse()
}
