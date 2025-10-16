export function Blogs() {
    let blogs = []

    blogs.push('Farting is an essential day to day activity. It helps maintain a healthy lifestyle and keeps bloating away. There are multiple types of farts, but the most common way to categorize them is by the loudness/stinkyness ratio. Essentially, the louder the fart, the less stinky (fully silent farts are the most nocive for surrounding victims). Farting can be enjoyed alone or can be turned into a group activity.')

    for(let i = 0; i < blogs.length - 1; i++) {
        blogs[i] = '<p>' + blogs[i]
        blogs[i] += '</p>'
    }

    return blogs
}
