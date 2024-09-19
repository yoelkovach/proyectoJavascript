// tomamos los datos de html
const canvas = document.querySelector("canvas")
const convercion = canvas.getContext("2d")

const Sprites = document.getElementById("Sprites")
const bricks = document.getElementById("bricks")
const realesBricks = document.getElementById("realesBricks")

// definiamo misure 

canvas.width = 448
canvas.height = 400


// VARIABLES DEL JUEGO
const ballRadius = 4;

// posizione                                                    

let x = canvas.width / 2
let y = canvas.height - 30

// velocita

let dx = -2
let dy = -2

// VARIABLE DE LA PALETA
let paddleHeight = 10;
let paddleWidth = 50;

let paddleX = ( canvas.width - paddleHeight) / 2
let paddleY = canvas.height - paddleHeight - 10 

let rightPressed = false
let leftPressed = false

// const paddleSensitivity = parseInt(prompt("pone el nivel de dificultad en numero, del 1 al 10"))
const paddleSensitivity = 4

//VARIABLES DE LOS LADRILLOS

const brickRowCount = 10
const brickColumnCount = 13
const brickWidth = 32.4
const brickHeigt = 14
const brickPadding = 1
const brickOffSetTop = 50
const brickOffSetLeft = 7
const brick = []

const BRICK_STATUS = {
    active: 1,
    destroyed: 0
}

for (let c = 0; c < brickColumnCount; c++) {
    brick[c] = [] 
    for (let r = 0; r < brickRowCount; r++) {
        //calculo de los ladrillos
        const brickX = c * (brickWidth + brickPadding) +
        brickOffSetLeft
        const brickY = r * (brickHeigt + brickPadding) +
        brickOffSetTop
        const random = Math.floor(Math.random() * 8)
        brick[c][r] = {
            x:brickX,
            y:brickY, 
            status:BRICK_STATUS.active,
            color :random
        }

    }
}

// funciones
function drawBall() {
    convercion.beginPath() //inciar trazado
    convercion.arc(x, y, ballRadius, 0, Math.PI * 2) //pelota
    convercion.fillStyle = "#fff"
    convercion.fill()
    convercion.closePath() //terminar trazado

    
    }
function drawPaddle() {
    convercion.drawImage(
        bricks,        //la imagen
        28.9,             //cordenada del recorte
        173,            //cordenada del recorte
        paddleWidth,   //el tamaño del recorte
        paddleHeight,    //tamaño del recorte   
        paddleX,        //posicion x del dibujo
        paddleY,   //posicion y del dibujo
        paddleWidth,       //ancho del dibujo
        paddleHeight    //alto del dibujo
    )
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
             const currentBrick = brick[c][r]
            if (currentBrick.status === BRICK_STATUS.destroyed) 
                continue

                // convercion.fillStyle = "yellow"
                // convercion.rect(
                //     currentBrick.x,
                //     currentBrick.y,
                //     brickWidth,
                //     brickHeigt
                // )
                // convercion.stroke()
                // convercion.fill()

                const clipX = currentBrick.color * 89

                convercion.drawImage(
                    realesBricks,
                    clipX,
                    0,
                    83, //83
                    35, //35
                    currentBrick.x,
                    currentBrick.y,
                    brickWidth,
                    brickHeigt
                )
            
        }
    }
}
function collisionDetection() {
    
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
             const currentBrick = brick[c][r]
            if (currentBrick.status === BRICK_STATUS.destroyed) continue ; 

            const isBallSameXAsBrick = 
            x > currentBrick.x && 
            x < currentBrick.x + brickWidth
            
            const isBallSameYAsBrick = 
            y > currentBrick.y &&
            y < currentBrick.y + brickHeigt
            
            if (isBallSameXAsBrick && isBallSameYAsBrick) {
                dy = -dy
                currentBrick.status = BRICK_STATUS.destroyed
            }
        }
    }
}
function ballMovent() {

    // rebotar en los laterales
    if ( x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx
    }

    // rebotar arriba
    if ( y + dy < ballRadius ) {
        dy = -dy
    }

    // fuera de juego
    
    const isBallSameXasPaddle =  x > paddleX && x < paddleX + paddleWidth
    const isBallTouchingPaddle = y + dy > paddleY



    if(isBallSameXasPaddle && isBallTouchingPaddle) {
        dy = -dy
    }else if (y + dy > canvas.height - ballRadius) {
        console.log("sos re malo")
        document.location.reload()
    }

    // mover la pelota
    x += dx
    y += dy
    
}
function paddleMovement() {
    if (rightPressed && paddleX < canvas.width - paddleWidth)  {
        paddleX += paddleSensitivity
    } else if (leftPressed && paddleX > 0){
        paddleX -= paddleSensitivity
    }
}
function cleanCanvas() {
    convercion.clearRect(0, 0, canvas.width, canvas.height)
}

function initEvents() {
    document.addEventListener("keydown", keyDownHandler)
    document.addEventListener("keyup", keyUpHandler)

    function keyDownHandler(event) {
        const {key} = event
        if (key === "Right" || key === "ArrowRight") {
            rightPressed = true
        }else if (key === "Left" || key === "ArrowLeft") {
            leftPressed = true
        }
        
    }
    function keyUpHandler(event) {
        const { key } = event
        if (key === "Right" || key === "ArrowRight") {
            rightPressed = false
        }else if (key === "Left" || key === "ArrowLeft") {
            leftPressed = false
        }
        
    }
}

// generador de frame
function draw() {   

    // cosas para dibujar

    // console.log(rightPressed,leftPressed)
    cleanCanvas()

    // console.log("hoal")
    drawBall()
    drawPaddle()
    drawBricks()

    // coolisiones u movimientos
    collisionDetection()
    ballMovent()
    paddleMovement()


    
    window.requestAnimationFrame(draw)

}

draw()
initEvents()


