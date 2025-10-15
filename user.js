export function GetUser() {
    let username = 'shitten'
    let cookie_username = document.cookie.split('username=')[1]

    if(cookie_username != null) {
        cookie_username = cookie_username.split(';')[0]
        username = cookie_username
    }

    return username
}
