export function PixelCode(content, arg, id) {
    const canvas_size = 300
    let grid_size = 30
    const grid_thick = 1
    let refresh_rate = 1000

    if(arg.length > 1) {
        for(let i = 0; i < arg.length; i++) {
            switch(arg[i]) {
                case '--grid':
                    if(!(isNaN(arg[i + 1]))) {
                        grid_size = arg[i + 1]
                    }
                    break

                case '--refresh':
                    if(!(isNaN(arg[i + 1]))) {
                        refresh_rate = arg[i + 1]
                    }
                    break

                case '--help':
                    Help(content)
                    return
                    break
            }
        }
    }

    let output = '<div class = "output" id = "pixelcode' + id + '">'
    output += '<canvas id = "pixelart' + id + '" class = "pixelart"></canvas>'
    output += '<textarea id = "pixelartcodebox' + id + '" class = "pixelartcodebox">'
    output += '//Edit me\n'
    output += 'let a = []\nfor(let i = 0; i < 10; i++) {\n  a.push([i,i])\n}\na.push([14,4])\na'
    output+= '</textarea><div>'
    content.innerHTML += output
    const canvas = document.querySelector('#pixelart' + id)
    const codebox = document.querySelector('#pixelartcodebox' + id)
    canvas.width = canvas_size
    canvas.height = canvas_size
    const c = canvas.getContext('2d')
    const pixel_size = canvas_size / grid_size
    codebox.style.width = canvas_size
    codebox.style.height = canvas_size + 8
    c.fillStyle = '#7aa2f7'


    for(let i = 0; i <= canvas_size; i += pixel_size) {
        c.fillRect(0, i - 1, canvas_size, grid_thick)
        c.fillRect(i - 1, 0, grid_thick, canvas_size)
    }

    function Pixel(x, y) {
        c.fillRect(x * pixel_size, y * pixel_size, pixel_size, pixel_size)
    }

    function GeneratePixelart() {
        const code = codebox.value

        if(code.length < 1) {
            return
        }

        let coord = eval(code)

        if(coord.length < 1) {
            return
        }

        c.fillStyle = '#11111b'
        c.fillRect(0, 0, canvas_size, canvas_size)
        c.fillStyle = '#7aa2f7'

        for(let i = 0; i <= canvas_size; i += pixel_size) {
            c.fillRect(0, i - 1, canvas_size, grid_thick)
            c.fillRect(i - 1, 0, grid_thick, canvas_size)
        }
        
        coord.forEach(co => {
            if(co.length != 2) {
                return
            }
            Pixel(co[0], co[1])
        })
    }

    function Help() {
        let output = '<div class = "output">'
        const help = [
            'pixelcode - generate pixelart using javascript',
            'Usage:',
            'no flags - 30x30 grid, 1000ms refresh rate',
            '--grid {number} - {number}x{number} grid - eg pixelcode --grid 10x10',
            '--refresh {number} - sets code evaluation refresh rate to {number} miliseconds',
        ]
        
        help.forEach(line => {
            output += line + '<br>'
        })
        output += '</div>'
        content.innerHTML += output
    }

    setInterval(GeneratePixelart, refresh_rate)
    return id + 1
}
