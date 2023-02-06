class TextBox {
    constructor(x,y,w,h,tileSize,closeable) {
        this.element = document.createElement('div')
        this.element.className = 'text-box'

        this.x=x
        this.y=y
        this.w=w
        this.h=h

        document.body.appendChild(this.element);
        console.log(tileSize)
        this.update(tileSize)
        if(closeable) {
            this.closeBtn = document.createElement('div');
            this.closeBtn.innerHTML = 'X';
            this.closeBtn.className = 'text-close';
            
            this.element.appendChild(this.closeBtn);
            
            this.closeBtn.onclick = () => { 
                this.remove()
            };
        }
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

    update(tileSize) {
        this.element.style.left = (this.x * tileSize - 0.5 * this.w * tileSize) + "px"
        this.element.style.top = (this.y * tileSize - this.h * tileSize - tileSize) + "px"
        this.element.style.width = (this.w * tileSize) + "px"
        this.element.style.height = (this.h * tileSize) + "px"
        this.element.style.fontSize = (tileSize) + "px"
    }
}