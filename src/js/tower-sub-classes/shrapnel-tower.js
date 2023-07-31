class ShrapnelTower extends Tower{
    constructor(id,x,y,mapData, unlockedUpgrades){
        super(id, x, y, mapData, "Shrapnel Tower", unlockedUpgrades);
        this.w = 2
        this.h = 2
        this.attackSpeed = 1
        this.cost = 100
        this.type = "land"
        this.r = 5
        this.damage = new Damage(5,mapData,this.stats)
        this.className = "normal"

        this.shards = new HomingProjectile(null,undefined,undefined,1,1,null,3,new Damage(5,mapData,this.stats),10,null,.5,"shard",null,.3)
    }

    shoot(){
        let closestEnemyData = this.checkShot();
        if(!closestEnemyData){
            return;
        }
        this.mapData.projectiles.projectiles.push(new ShrapnelProjectile(this, this.x, this.y, 1, 1, closestEnemyData.enemy, 5, this.damage, 50, null, .8, "regular",this.mapData,6,this.shards))
        this.stats.increaseShots();
    }

    upgrade(path, level) {
        
    }
}

