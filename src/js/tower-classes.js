class TowerClasses {
    test=0;

    constructor() {

        this.data = {
            "normal": new TowerClass("Normal", "A regular tower that shoots normal projectiles", "#000000"),
            "magic": new TowerClass("Magic", "A tower that uses magical effects", "#0000ff"),
            "elemental": new TowerClass("Elemental", "A tower that uses the elements to damage enemies", "#ff0000"),
            "summon": new TowerClass("Summon", "A tower that summons minions to fight for you", "#00ff00"),
            "support": new TowerClass("Support", "A tower that supports you and other towers", "#ffff00")
        }
    }
    get(name) {
        return this.data[name] || this.data["normal"]
    }
}