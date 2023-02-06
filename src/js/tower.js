class Tower{
    constructor(id,x,y,w,h,img,cost,type){
        this.id = id;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img;
        this.cost = cost;
        this.type = type;
    }

    update(ctx, tileSize, timePassed){
        // to be implemented
        this.render(ctx, tileSize);
    }

    render(ctx, tileSize){
        // to be implemented
        ctx.fillStyle = "red";
        ctx.fillRect((this.x-this.w/2)*tileSize,(this.y-this.h/2)*tileSize,tileSize*this.w,tileSize*this.h);
    }

    sell(){
        // to be implemented        
    }


}