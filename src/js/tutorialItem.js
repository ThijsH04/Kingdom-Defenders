class TutorialItem {
    constructor(text,w,h,trigger,untrigger=null,repeat=false) {
        this.trigger = trigger
        let canClose = false
        if(untrigger == null) {
            this.untrigger = () => {return false}
            canClose = true
        } else {
            this.untrigger = untrigger
        }
        this.textBox = new TextBox(0,0,w,h,32,0.5,canClose)
        this.textBox.text.innerHTML += text
        this.textBox.show(false)
        this.shown = false
        this.complete = false
        this.repeat = repeat
    }
    update(mode, tileSize) {
        if(this.complete && !this.repeat) return
        if(!this.shown) {
            let loc = this.trigger()
            if(loc) {
                this.textBox.x = loc[0]
                this.textBox.y = loc[1]
                this.textBox.update(mode, tileSize)
                this.textBox.show()
                this.shown = true
            }
        } else {
            if(this.untrigger()) {
                this.textBox.show(false)
                this.shown = false
                this.complete = true
            } else if(this.textBox.element == null) {
                this.shown = false
                this.complete = true
            }
        }
        
    }
}