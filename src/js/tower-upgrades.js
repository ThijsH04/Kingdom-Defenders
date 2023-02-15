class TowerUpgrades {
    constructor(tower) {
        let upgradeInfo = [
            [{},{},{}],
            [{},{},{}],
            [{},{},{}],
            [{},{},{}],
        ]
        this.paths = [
            new UpgradePath(tower, upgradeInfo[0],this),
            new UpgradePath(tower, upgradeInfo[1],this),
            new UpgradePath(tower, upgradeInfo[2],this),
            new UpgradePath(tower, upgradeInfo[3],this)
        ]
        this.menu = false
    }
    createUpgradeMenu() {
        if(!this.menu) return console.log("no menu?");
        this.menu.innerHTML = ""

        for(let i=0;i<this.paths.length;i++) {
            let path = this.paths[i]
            for(let j=0;j<path.upgrades.length;j++) {
                let upgrade = path.upgrades[j]
                let element = upgrade.getBtn(this, path)
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
    constructor(tower, data, upgrades) {
        this.upgrades = [new TowerUpgrade(tower, data[0], upgrades, this), new TowerUpgrade(tower, data[1], upgrades, this), new TowerUpgrade(tower, data[2], upgrades, this)]
        this.next = 0
    }
    increment(upgrades) {
        this.next++
        console.log(this.next)
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
    constructor(tower, data, upgrades, path) {
        this.unlocked = false
        this.locked = false
        this.cost = 0
    }
    canUnlock(upgrades, path) {
        return path.upgrades.indexOf(this) == path.next && !this.locked
    }
    getBtn(upgrades, path) {
        let element = document.createElement("button")
        element.className = "UpgradeBlock"
        element.onclick = ()=>{
            if(!this.canUnlock(upgrades, path)) return
            this.unlocked = true
            path.increment(upgrades)
            upgrades.createUpgradeMenu()
        }
        return element
    }
}