class StandardTower extends Tower{
    constructor(id,x,y,mapData, unlockedUpgrades){
        super(id, x, y, mapData, "Cannon", unlockedUpgrades);
        this.w = 2
        this.h = 2
        this.attackSpeed = 1
        this.cost = 100
        this.type = "land"
        this.hitTypes = ["ground"]
        this.r = 5
        this.className = "Normal"

        this.addImage({
            name: "base",
            src: "./assets/images/towers/cannon.png",
            z: 0,
            animationTypes: ["rotate"],
            maxAnimation: 1
        })

        this.projectiles.push(new Projectile({
            name: "bullet",
            img: "./assets/images/projectiles/cannonball.png",
            damage: 5,
            speed: 20,
            lifespan: 5
        }))
    }

    upgrade(path, level) {
        // example upgrades
        switch(path + ',' + level){
            case '0,0':
                for(let p of this.projectiles) {
                    p.damage = 7
                }
                break;
            case '0,1':
                for(let p of this.projectiles) {
                    p.damage = 10
                }
                break;
            case '0,2':
                for(let p of this.projectiles) {
                    p.damage = 18
                }
                break;
            default:
                break;
            case '1,0':
                this.r = 5.5
                break;
            case '1,1':
                this.r = 6
                break;
            case '1,2':
                this.r = 8
                break;
            case '2,0':
                this.attackSpeed = 0.9
                break;
            case '2,1':
                this.attackSpeed = 0.8
                break;
            case '2,2':
                this.attackSpeed = 0.6
                break;
            case '3,0':
                this.projectiles.push(this.projectiles[0].getCopy(this))
                this.projectiles[0].offset = -0.2
                this.projectiles[1].offset = 0.2
                console.log(this.projectiles)
                break;
            case '3,1':
                this.projectiles.push(this.projectiles[0].getCopy(this))
                this.projectiles[0].offset = -0.3
                this.projectiles[1].offset = 0.3
                this.projectiles[2].offset = 0
                break;
            case '3,2':
                this.shoot = (closestEnemyData) => {
                    for(let p of this.projectiles) {
                        this.mapData.projectiles.projectiles.push(p.getCopy(this))
                        let reverseProjectile = p.getCopy(this)
                        reverseProjectile.a += Math.PI
                        this.mapData.projectiles.projectiles.push(reverseProjectile)
                    }
                    this.stats.increaseShots();
                }
        }
    }
}