const towerTypes = {
    "Cannon":{tower: StandardTower, color:"red", img:"./assets/images/towers/cannon.png", id:0},
    "Missile Launcher":{tower: HomingTower, color:"green", img:"./assets/images/towers/rocket_tower.png", id:1},
    "Shrapnel Tower":{tower: ShrapnelTower, color:"yellow", img:"./assets/images/towers/catapult.png", id:3},
    "Scattershot":{tower:ScatterTower, color:"yellow", img:"./assets/images/towers/scatter_tower.png", id:4},
    "Air Turret":{tower: AirTower, color:"blue", img:"./assets/images/towers/air_turret.png", id:5},
    "Earthquake Tower":{tower: EarthquakeTower, color:"orange", img:"./assets/images/towers/earthquake_tower.png", id:6},
    "Lightning Tower":{tower: ChainingTower, color:"purple", img:"./assets/images/towers/lightning_tower.png", id:7},
    "Mage Tower":{tower: SplashTower, color:"brown", img:"./assets/images/towers/mage_tower.png", id:8},
}