export async function Blogs() {
    let blogs = []
    const mastodon = await Mastodon()

    blogs.push('Farting is an essential day to day activity. It helps maintain a healthy lifestyle and keeps bloating away. There are multiple types of farts, but the most common way to categorize them is by the loudness/stinkyness ratio. Essentially, the louder the fart, the less stinky (fully silent farts are the most nocive for surrounding victims). Farting can be enjoyed alone or can be turned into a group activity.')

    mastodon.forEach(post => {
        blogs.push(post)
    })

    for(let i = 0; i < blogs.length - 1; i++) {
        blogs[i] = '<p>' + blogs[i]
        blogs[i] += '</p>'
    }

    return blogs
}

async function Mastodon() {
    let mastodon = []
    const rss = await fetch('https://mastodon.social/@kiefciman.rss')
    const xml = await rss.text()
    let items = xml.split('<item>')
    
    items.shift()

    items.forEach(item => {
        item = item.split('<description>')[1]

        let blog = ''
        let text = item.split('</description>')[0]
        const decode_patterns = [['&lt;br /&gt;', '<br>'], ['&amp;gt;', '>']]
        
        text = text.split('&lt;p&gt;')[1]
        text = text.split('&lt;/p&gt')[0]

        if(text.includes('&lt;a href="https://mastodon.social/tags/')) {
            text = text.split('&lt;a href="https://mastodon.social/tags/')
            for(let i = 1; i < text.length; i++) {
                let line = text[i].split('" class=')

                line[1] = line[1].split('/a&gt;')[1]
                text[i] = line.join('')
            }
            text = text.join(' ')
        }

        decode_patterns.forEach(pattern => {
            while(text.includes(pattern[0])) {
                text = text.replace(pattern[0], pattern[1])
            }
        })

        console.log(text)
        blog += text

        if(item.includes('media:content')) {
            let medias = item.split('<media:content url="')

            medias.shift()
            medias.forEach(media => {
                media = media.split('" type=')[0]
                blog += '<br><img src = "' + media + '" class = "image-medium">'
            })

        }

        mastodon.push(blog)
    })

    return mastodon.reverse()
}
