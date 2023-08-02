class Unlockable {
    constructor(name, paths=[], modifiers={}) {
        this.name = name;
        this.paths = paths;
        this.modifiers = modifiers;
    }

    unlock(unlocked) {
        console.log(this.name, unlocked)
        unlocked[this.name].unlocked = true;
        for(let path of this.paths) {
            unlocked[this.name].paths[path[0]][path[1]] = true;
        }
        for(let mod in this.modifiers) {
            if(unlocked[this.name].modifiers[mod]) {
                unlocked[this.name].modifiers[mod]+= this.modifiers[mod];
            }
        }
        console.log(this)
        console.log(unlocked[this.name].paths)
    }
}

class TowerUnlocks {
    constructor() {
        this.unlocked=false
        this.paths = [
            [false, false, false],
            [false, false, false],
            [false, false, false],
            [false, false, false]
        ]
        this.modifiers = {
            "damage": 1,
            "health": 1,
            "speed": 1,
            "range": 1,
            "costMod": 1,
            "effect": 1
        }
    }
}