class Tower{
    constructor(id,name,x,y,w,h,attackSpeed,img,cost,type,damage,r,mapData, color){
        this.color = color
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
        this.rotation = 0

        this.targetFunctions = [
            {name:"First", func:(a,b)=>{return b.getProgress() - a.getProgress()}}, // first
            {name:"Last", func:(a,b)=>{return a.getProgress() - b.getProgress()}}, // last
            // closest is broken, tba
            //{name:"Closest", func:(a,b)=>{return ((this.x - b.x)**2 + (this.y - b.y)**2) - ((this.x - a.x)**2 + (this.y - a.y)**2)}}, // closest
            {name:"Most HP", func:(a,b)=>{return b.health.hp - a.health.hp}}, // most health
            {name:"Group", func:(a,b)=>{return b.getGroupSize() - a.getGroupSize()}} //group
        ]
        this.targetFunction = 0
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
        let enemy = closestEnemyData.enemy
        this.mapData.projectiles.projectiles.push(new Projectile(this, this.x, this.y, 1, 1, enemy, 5,this.damage, 20, null, .8, "regular",this.mapData, 1, this.projectileImg))
    }

    checkShot(){
        if(this.mapData.enemies.enemies.length == 0){
            this.attackTimer = this.attackSpeed;
            return false;
        }
        // console.log("not the issue");
        let possibleEnemies = this.mapData.enemies.enemies.filter(enemy => this.intersects(enemy))
        if(possibleEnemies.length == 0) return false

        let enemyData = {enemy: possibleEnemies.sort(this.targetFunctions[this.targetFunction].func)[0]}
        
        console.log(enemyData.enemy.getGroupSize(this.mapData.enemies.enemies))
        //let enemyData = this.mapData.enemies.findClosestEnemy(this.x,this.y);
        if(enemyData.enemy == null||!this.intersects(enemyData.enemy)){
            this.attackTimer = this.attackSpeed;
            return false;
        }
        this.rotation = Math.atan2(enemyData.enemy.y-this.y, enemyData.enemy.x-this.x)+0.5*Math.PI
        return enemyData;
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
        if(this.image) {
            if(this.image.base) {
                ctx.drawImage(this.image.base, (this.x-this.w/2)*tileSize,(this.y-this.h/2)*tileSize,tileSize*this.w,tileSize*this.h)
            }
            if(this.image.rotating) {
                // rotate image in right direction first here
                ctx.translate(this.x*tileSize,this.y*tileSize)
                ctx.rotate(this.rotation)
                ctx.drawImage(this.image.rotating, -(this.w/2)*tileSize,-(this.h/2)*tileSize,tileSize*this.w,tileSize*this.h)
                ctx.rotate(-this.rotation)
                ctx.translate(-this.x*tileSize,-this.y*tileSize)

            }
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect((this.x-this.w/2)*tileSize,(this.y-this.h/2)*tileSize,tileSize*this.w,tileSize*this.h);
        }
    }

    sell(){
        this.health.hp = 0;        
    }

    switchTarget() {
        this.targetFunction = (this.targetFunction + 1) % this.targetFunctions.length
    }
}