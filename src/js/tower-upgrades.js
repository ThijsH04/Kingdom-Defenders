class TowerUpgrades {
    constructor(tower) {
        let upgradeInfo = [
            [{},{},{}],
            [{},{},{}],
            [{},{},{}],
            [{},{},{}],
        ]
        this.paths = [
            new UpgradePath(0),
            new UpgradePath(1),
            new UpgradePath(2),
            new UpgradePath(3)
        ]
        this.menu = false
    }
    createUpgradeMenu(tower) {
        if(!this.menu) return console.log("no menu?");
        this.menu.innerHTML = ""

        for(let i=0;i<this.paths.length;i++) {
            let path = this.paths[i]
            for(let j=0;j<path.upgrades.length;j++) {
                let upgrade = path.upgrades[j]
                let element = upgrade.getBtn(this, path, tower)
                element.style.gridRow = i+1
                element.style.gridCol = j+1
                if(upgrade.unlocked) element.style.backgroundColor = "#0f0"
                else if(upgrade.locked) element.style.backgroundColor = "#900"
                else if(path.upgrades.indexOf(upgrade) == path.next) element.style.backgroundColor = "#fa0"
                else element.style.backgroundColor = "#f00"
                this.menu.appendChild(element)
            }
        }
        return upgrades
    }
}

class UpgradePath {
    constructor(i) {
        this.upgrades = [new TowerUpgrade(0), new TowerUpgrade(1), new TowerUpgrade(2)]
        this.next = 0
        this.index = i
    }
    increment(upgrades) {
        this.next++
        if(this.next > 2) {
            for(let p=0;p<upgrades.paths.length;p++) {
                upgrades.paths[p].upgrades[2].locked = true
            }
        }
        let c=0;
        for(let p=0;p<upgrades.paths.length;p++) {
            c+=upgrades.paths[p].next > 0   
        }
        if(c==3) {
            for(let p=0;p<upgrades.paths.length;p++) {
                if(upgrades.paths[p].next > 0) continue
                for(let u=0;u<upgrades.paths[p].upgrades.length;u++){
                    upgrades.paths[p].upgrades[u].locked = true
                }
            }
        }
    }
}

class TowerUpgrade {
    constructor(i) {
        this.unlocked = false
        this.locked = false
        this.cost = 0
        this.index = i
    }
    canUnlock(upgrades, path, unlockedUpgrades) {
        console.log(unlockedUpgrades.paths)
        return path.upgrades.indexOf(this) == path.next && !this.locked && unlockedUpgrades.paths[path.index][this.index]
    }
    getBtn(upgrades, path, tower) {
        let element = document.createElement("button")
        element.className = "UpgradeBlock"
        element.onclick = ()=>{
            if(!this.canUnlock(upgrades, path, tower.unlockedUpgrades)) return
            this.unlocked = true
            path.increment(upgrades)
            upgrades.createUpgradeMenu(tower)
            tower.upgrade(path.index, this.index)
        }
        return element
    }
}