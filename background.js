var size = 400
var colors = [
    '#89dcebdd', //cian
    '#f7768edd', //red
    '#f9e2afdd', //yellow
    '#a6e3a1dd', //green
    '#cdd6f4dd' //white
]

for (i = 0; i < 5; i++) {
    let a = document.createElement('div')
    a.style.width = size + 'px'
    a.style.height = size + 'px'
    a.style.position = 'absolute'
    a.style.zIndex = '-10'
    a.style.borderRadius = '50%'
    a.style.background = colors[i]
    //a.style.boxShadow = 'inset 0 0 50px #000000'
    a.style.boxShadow = '0 0 20px 20px ' + colors[i]
    a.className = 'a'
    document.body.appendChild(a)
}

var a_s = document.getElementsByClassName('a')
//var speed = 0.1
var speed = 2

for (let i = 0; i < a_s.length; i++) {
    let a = a_s[i]
    let top_a = i * 100 + 100
    let left_a = i * 100 + 100
    let direction_x = 1
    let direction_y = 1
    if (i == 1 || i == 5) {
        direction_x = -1
    }
    if (i == 2 || i == 4) {
        direction_y = -1
    }
    function move() {
        if (top_a + size / 2 > window.innerHeight || top_a < -size / 2) {
            direction_y *= -1
        }
        if (left_a + size / 2 > window.innerWidth || left_a < -size / 2) {
            direction_x *= -1
        }
        top_a += 1 * speed * direction_y
        left_a += 1 * speed * direction_x
        a.style.top = top_a + 'px'
        a.style.left = left_a + 'px'
    }
    
    setInterval(move, 100)
}
