class Tower{
    constructor(id,x,y,img,cost,type){
        this.id = id;
        this.x = x;
        this.y = y;
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
        ctx.fillRect(this.x*tileSize,this.y*tileSize,tileSize,tileSize);
    }

    sell(){
        // to be implemented        
    }


}