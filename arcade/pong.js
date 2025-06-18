function Open(page) {
    window.open(page + '.html', '_self')
}

function Pong() {
    const canvas = document.getElementById('canvas')
    const c = canvas.getContext('2d')
    const width = 800
    const height = 500
    const handle_lenght = 200
    let handle1_x = 20
    let handle1_y = height / 2 - handle_lenght / 2
    let handle2_x = width - 30
    let handle2_y = height / 2 - handle_lenght / 2
    let ball_x = width / 2 - 5
    let ball_y = height / 2 - 5

    c.fillStyle = '#fab387'

    c.fillRect(0, 0, 10, height)
    c.fillRect(0, 0, width, 10)
    c.fillRect(width - 10, 0, 10, height)
    c.fillRect(0, height - 10, width, 10)

    c.fillRect(handle1_x, handle1_y, 10, handle_lenght)
    c.fillRect(handle2_x, handle2_y, 10, handle_lenght)
    c.fillRect(ball_x, ball_y, 10, 10)
}

Pong()
