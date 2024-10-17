import './style.css'

// 1. inicializar el canvas
const $canvas = document.querySelector('canvas')
const $context = $canvas.getContext('2d')

const BLOCK_SIZE = 20
const BOARD_WIDTH = 14
const BOARD_HEIGHT = 30

$canvas.width = BLOCK_SIZE * BOARD_WIDTH
$canvas.height = BLOCK_SIZE * BOARD_HEIGHT

$context.scale(BLOCK_SIZE, BLOCK_SIZE)

// 3 board

const board =[
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1]
]

// 4 piace player
const piace = {
    position: {x: 5, y: 5},
    shape: [
        [1,1],
        [1,1]
    ]
}

// 2. game loop

function update(){
    draw()
    window.requestAnimationFrame(update)

}

function draw() {
    $context.fillStyle = '#000'
    $context.fillRect(0, 0, $canvas.width, $canvas.height)

    board.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value === 1) {
                $context.fillStyle = 'yellow'
                $context.fillRect(x, y, 1, 1)
            }
        })
    })

    piace.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value){
                $context.fillStyle = 'red'
                $context.fillRect(x + piace.position.x, y + piace.position.y, 1, 1)
            }
        })
    })
}

document.addEventListener('keydown', event => {
    
    if (event.key === 'ArrowLeft'){
        piace.position.x--
        if (checkCollision()) {
            piace.position.x++
        }
    }
    if (event.key === 'ArrowRight'){
        piace.position.x++
        if (checkCollision()) {
            piace.position.x--
        }
    }
    if (event.key === 'ArrowDown'){
        piace.position.y++
        if (checkCollision()) {
            piace.position.y--
            solidfyPiace()
            removeRows()
        }
    }
})

function checkCollision() {
    return piace.shape.find((row, y) => {
        return row.find((value, x) => {
            return (
                value != 0 && board[y + piace.position.y]?.[x + piace.position.x] != 0
            )
        })
    })
}

function solidfyPiace() {
    piace.shape.forEach((row, x) => {
        row.forEach((value, y) => {
            if (value === 1 ){
                board[y + piace.position.y][x + piace.position.x] = 1
            }
        })
    })

    piace.position.x = 0
    piace.position.y = 0
}

function removeRows() {
    const rowsToRemove = []

    board.forEach((row, y) => {
        if (row.every(value => value === 1)) {
            rowsToRemove.push(y)
        }
    })

    rowsToRemove.forEach(y => {
        board.splice(y, 1)
        const newRow = Array(BOARD_WIDTH).fill(0)
        board.unshift(newRow)
    })
}
update()

