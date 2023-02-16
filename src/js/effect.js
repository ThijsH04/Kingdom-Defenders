class Effect {
    constructor(type="basic", duration=15, speed=1, func=(e)=>{}) {
        this.type = type
        this.duration = duration
        this.timeLeft = 0
        this.speed = speed
        this.func = func
    }
    update(time, e) {
        if(this.duration >= 0) {
            this.duration -= time
            if(this.duration < 0) this.duration = 0
        }
        this.timeLeft -= time
        if(this.timeLeft <= 0) {
            this.func(e)
            this.timeLeft = speed
        }
    }
    
}