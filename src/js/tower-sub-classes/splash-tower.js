class SplashTower extends Tower{
    constructor(id,x,y,damage,mapData, color){
        super(id,"Splash Tower",x,y,2,2,1,"./assets/towers/mage_tower.png",100,"land",damage,4,mapData, color);

        this.image = {}
        this.image.base = new Image()
        this.image.base.src = "./assets/towers/mage_tower.png"

        this.projectileImg = new Image()
        this.projectileImg.src = "./assets/projectiles/magic_orb.png"
    }

    upgrade(path, level) {
        
    }
}