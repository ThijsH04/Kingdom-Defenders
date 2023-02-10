class Effect {
    constructor(type="basic", duration=15, speed=1, func=(e)=>{}) {
        this.type = type
        this.duration = duration
        this.timeLeft = 0
        this.speed = speed
        this.func = func
    }
    update(time, e) {
        this.timeLeft -= time
        this.duration -= time
        if(this.timeLeft <= 0) {
            this.func(e)
            this.timeLeft = speed
        }
    }
    
}