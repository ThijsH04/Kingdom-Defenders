(function() {
let canvas = document.getElementById("game")
canvas.width  = window.innerWidth
canvas.height = window.innerHeight
    
let ctx = canvas.getContext("2d")

previousFrameTime = Date.now()

function game() {
    frameTime = Date.now()
    timePassed = (frameTime - previousFrameTime) / 1000 // time since last frame, in seconds
    previousFrameTime = frameTime

    ctx.fillStyle = "#000000"
    ctx.fillRect(0,0,canvas.width,canvas.height)
    requestAnimationFrame(game)
}
function updateCanvasSize() {
    let canvas = document.getElementById("game")
    w = window.innerWidth
    h = window.innerHeight
    canvas.width = w
    canvas.height = h
    canvas.style.width = w+"px"
    canvas.style.height = h+"px"
}

window.onresize = updateCanvasSize
window.onload = () => {
    updateCanvasSize()
    requestAnimationFrame(game)
}
})()