class TextBox {
    constructor(x,y,w,h,tileSize,fontSize=1,closeable=true,movement=0) {
        this.element = document.createElement('div')
        this.element.className = 'text-box'

        this.x=x
        this.y=y
        this.w=w
        this.h=h
        
        this.fontSize=fontSize
        this.movement=movement
        this.diff = 0
        this.dy = 0

        document.getElementById("map").appendChild(this.element);
        if(closeable) {
            this.closeBtn = document.createElement('div');
            this.closeBtn.innerHTML = 'X';
            this.closeBtn.className = 'text-close';
            
            this.closeBtn.onclick = () => { 
                this.remove()
            };
            this.element.appendChild(this.closeBtn);
        }
        this.text = document.createElement('span');
        this.element.appendChild(this.text)
    }
    remove(){
        this.element.remove();
        this.closeBtn.remove();
    }

    show(s=true) {
        if(s) {
            this.element.style.display = "block"
        } else {
            this.element.style.display = "none"
        }
    }

    update(mode, tileSize) {
        this.element.style.left = (this.x * tileSize - 0.5 * this.w * tileSize) + "px"
        this.element.style.top = (this.y * tileSize - this.h * tileSize - tileSize + this.dy) + "px"
        this.element.style.width = (this.w * tileSize) + "px"
        this.element.style.height = (this.h * tileSize) + "px"
        this.element.style.fontSize = (this.fontSize * tileSize) + "px"
        
        this.diff += this.movement/100
        if(Math.abs(this.diff) > Math.abs(0.3*this.movement)) this.movement = -this.movement
        this.dy += this.diff
    }
}