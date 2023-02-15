class Tower{
    constructor(id,name,x,y,w,h,attackSpeed,img,cost,type,damage,r,mapData){
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
        this.damage = damage;
        this.r = r;
        this.mapData = mapData;
        this.name = name;
        this.upgrades = new TowerUpgrades(this)
        this.health = new HealthBar(this,100)
    }

    update(mode, ctx, tileset, tileSize, timePassed, render=true){
        // to be implemented
        if(render) {
            this.render(ctx, tileSize);
            if(this.health.hp < this.health.max) this.health.update(mode, this,ctx, tileset, tileSize)
        }
        this.attackTimer+=timePassed;
        if(this.attackTimer>=this.attackSpeed){
            this.attackTimer-=this.attackSpeed;
            this.shoot();
        }
    }

    shoot(){
        let closestEnemyData = this.checkShot();
        if(!closestEnemyData){
            return;
        }
        this.mapData.projectiles.projectiles.push(new Projectile(this, this.x, this.y, 1, 1, closestEnemyData.enemy, 5,this.damage, 20, null, .8, "regular",this.mapData))
    }

    checkShot(){
        if(this.mapData.enemies.enemies.length == 0){
            this.attackTimer = this.attackSpeed;
            return false;
        }
        console.log("not the issue");
        let closestEnemyData = this.mapData.enemies.findClosestEnemy(this.x,this.y);
        if(closestEnemyData.enemy == null||!this.intersects(closestEnemyData.enemy)){
            this.attackTimer = this.attackSpeed;
            return false;
        }
        return closestEnemyData;
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

    /* defenitely not a stolen function :)
    *   returns true when the range of a tower and the closest enemy intersect
    *   will not work with different sizes of enemies yet!
    */
    intersects(enemy){
        
        let x = Math.abs(this.x - enemy.x);
        let y = Math.abs(this.y - enemy.y);

        if (x > (enemy.w/2 + this.r)) { return false; }
        if (y > (enemy.h/2 + this.r)) { return false; }

        if (x <= (enemy.w/2)) { return true; } 
        if (y <= (enemy.h/2)) { return true; }

        let cornerDistance_sq = (x - enemy.w/2)**2 +
                            (y - enemy.h/2)**2;

        return (cornerDistance_sq <= (this.r**2));
    }

    render(ctx, tileSize){
        // to be implemented
        ctx.fillStyle = "red";
        ctx.fillRect((this.x-this.w/2)*tileSize,(this.y-this.h/2)*tileSize,tileSize*this.w,tileSize*this.h);
    }

    sell(){
        this.health.hp = 0;        
    }


}