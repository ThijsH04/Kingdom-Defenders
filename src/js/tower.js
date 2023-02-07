class Tower{
    constructor(id,x,y,w,h,attackSpeed,img,cost,type,mapData){
        this.id = id;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.attackSpeed = attackSpeed;
        this.attackTimer = 0;
        this.img = img;
        this.cost = cost;
        this.type = type;
        this.mapData = mapData;

        this.health = new HealthBar(this,100)
    }

    update(ctx, tileset, tileSize, timePassed, render=true){
        // to be implemented
        if(render) {
            this.render(ctx, tileSize);
            if(this.health.hp < this.health.max) this.health.update(this,ctx, tileset, tileSize)
        }
        this.attackTimer+=timePassed;
        if(this.attackTimer>=this.attackSpeed){
            this.attackTimer-=this.attackSpeed;
            this.shoot();
        }
    }

    shoot(){
        if(this.mapData.enemies.length == 0){
            this.attackTimer = this.attackSpeed;
            return false;
        }
        let closestEnemyData = Enemy.findClosestEnemy(this.x,this.y);
        if(closestEnemyData == null){
            console.log("something went wrong");
            return false;
        }
        this.mapData.projectiles.projectiles.push(new Projectile(this, this.x, this.y, 1, 1, closestEnemyData.enemy, 5,10, 20, null, .8, "regular",this.mapData))
    }

    findClosestEnemy(){
        let enemies = this.mapData.enemies;
        if(enemies.length == 0){
            return null;
        }
        let minEnemy = enemies[0];
        let minDistance = Math.sqrt((minEnemy.x-this.x)**2+(minEnemy.y-this.y)**2);
        for(let e of enemies){
            let distance = Math.sqrt((e.x-this.x)**2+(e.y-this.y)**2);
            if(distance<minDistance){
                minEnemy = e;
                minDistance = distance;
            }
        }
        return {enemy:minEnemy,distance:minDistance};
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