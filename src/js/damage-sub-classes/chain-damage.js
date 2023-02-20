class ChainDamage extends Damage{
    constructor(amount,mapData,r,lifespan,targetAmount,previousTargets=[]){
        super(amount,mapData);
        this.r = r;
        this.lifespan = lifespan;
        this.maxLifespan = lifespan;
        this.targetAmount = targetAmount;
        this.previousTargets = previousTargets;

        this.image = new Image()
        this.image.src = "./assets/projectiles/lightning_projectile.png"
    }

    dealDamage(x,y,enemy=null){ // there is no actual target in splash 
        let newDamage = Object.assign(Object.create(Object.getPrototypeOf(this)), this);  
        let enemyData = this.mapData.enemies.findClosestEnemy(x,y);
        newDamage.previousTargets = [];
        newDamage.x = x;
        newDamage.y = y;        
        if(enemyData.enemy == null||enemyData.distance>this.r){
            return;
        }
        super.dealDamage(this.x,this.y,enemyData.enemy);
        newDamage.previousTargets.push(enemyData.enemy);
        this.mapData.damages.damages.push(newDamage);
    }

    update(mode, ctx, tileSize, time, render=true){
        this.lifespan -= time;
        if(this.lifespan<0){
            return;
        }
        // console.log((this.maxLifespan-this.lifespan)/this.maxLifespan);
        // console.log(this.previousTargets.amount/this.targetAmount);
        
        if((this.maxLifespan-this.lifespan)/this.maxLifespan>=this.previousTargets.length/this.targetAmount){ // should always be atleast 1 enemy in the list
            let lastEnemy = this.previousTargets[this.previousTargets.length-1];
            let newEnemyData = this.mapData.enemies.findClosestEnemyNotInArray(lastEnemy.x,lastEnemy.y,this.previousTargets);
            console.log(newEnemyData.distance);
            console.log(this.r);
            if(newEnemyData.enemy&&newEnemyData.distance<=this.r){
                this.previousTargets.push(newEnemyData.enemy);
                super.dealDamage(newEnemyData.x,newEnemyData.y,newEnemyData.enemy);
            }
            console.log(this.previousTargets);
        }
        if(this.lifespan<0){
            return false;
        }
        if(render){
            this.render(ctx, tileSize);
        }
    }

    render(ctx, tileSize){
        if(this.previousTargets==null||this.previousTargets.length==0){
            return;
        }
        let index = 0;
        if(this.x == this.previousTargets[0].x&&this.y == this.previousTargets[0].y){
            index++;
        }
        ctx.strokeStyle = "yellow"; 
        ctx.beginPath();
        ctx.moveTo(this.x*tileSize, this.y*tileSize);
        let lastPoint = {x:this.x*tileSize,y:this.y*tileSize}
        for(;index<this.previousTargets.length;index++){
            let point = {x:this.previousTargets[index].x*tileSize, y:this.previousTargets[index].y*tileSize}
            draw_image_line(ctx,tileSize,this.image,point,lastPoint,0.5,0.8)
            lastPoint = point
        }
    }
}