class Upgrades {
    constructor(game, trees) {
        this.upgradeTrees = []

        this.showBtn = document.createElement("button")
        this.showBtn.className = "upgrade-btn"
        this.showBtn.onclick = () => {
            game.setMode("upgrade")
            this.selectNode(game, false)
            this.showBtn.style.display = "none";
            this.exitBtn.style.display = "block";
            this.updateResources(game.resources)
        }
        this.showBtn.innerHTML = "Upgrade Menu"

        document.getElementById("map").appendChild(this.showBtn)

        this.exitBtn = document.createElement("button")
        this.exitBtn.className = "upgrade-btn"
        this.exitBtn.style.display = "none";
        this.exitBtn.onclick = () => {
            game.setMode("map")
            this.selectNode(game, false)
            this.exitBtn.style.display = "none";
            this.showBtn.style.display = "block";
            this.updateResources(game.resources)
        }
        this.exitBtn.innerHTML = "Go To Map"

        document.body.appendChild(this.exitBtn)

        this.element = document.createElement("div")
        this.element.className = "upgrade-menu"
        document.body.appendChild(this.element)

        this.infoBar = document.createElement("div")
        this.infoBar.className = "upgrade-bar"
        this.element.appendChild(this.infoBar)

        this.upgradeInfo = document.createElement("div")
        this.upgradeInfo.className = "upgrade-info"
        this.element.appendChild(this.upgradeInfo)

        for(let t=0;t<trees.length;t++) {
            this.upgradeTrees.push(new UpgradeTree(game, trees[t], this.element, this))
        }
        this.upgradeTrees[0].show(this)

        this.resourceElem = document.createElement("span")
        this.infoBar.appendChild(this.resourceElem)
        this.resourceElem.innerHTML
    }
    selectNode(game,node) {
        if(node) {
            this.upgradeInfo.style.width = "400px"
            for(let t=0;t<this.upgradeTrees.length;t++) {
                this.upgradeTrees[t].box.style.right = "400px"
            }
            this.upgradeInfo.innerHTML = ""
        let text = document.createElement("span")
        text.innerHTML = "<h1>"+node.name+"</h1>"+node.description+"<br><br>"
        text.innerHTML += "<h3>Cost</h3>"
        text.innerHTML += "Coins: " + node.cost.coins + "<br>"
        text.innerHTML += "<h3>Crystals</h3>"
        Object.entries(node.cost.crystals).forEach(([key, value]) => {
            text.innerHTML += key + ": " + value + "<br>"
        });
        this.upgradeInfo.appendChild(text)
        let closeBtn = document.createElement("button")
        closeBtn.className = "base-btn"
        closeBtn.innerHTML = "close"

        closeBtn.onclick = () => {
            this.selectNode(game, false)
        }
        this.upgradeInfo.appendChild(closeBtn)

        let buyBtn = document.createElement("button")
        buyBtn.className = "base-btn"
        buyBtn.onclick = () => {
            this.selectNode(game, false)
            node.unlock(game.resources)
            this.updateResources(game.resources)
        }
        if(node.unlocked) {
            buyBtn.disabled = true
            buyBtn.innerHTML = "Owned"
        } else if(!node.unlockable) {
            buyBtn.disabled = true
            buyBtn.innerHTML = "Locked"
        } else if(!node.canAfford(game.resources)) {
            buyBtn.disabled = true
            buyBtn.innerHTML = "Can't Afford"
        } else {
            buyBtn.innerHTML = "Buy"
        }
        this.upgradeInfo.appendChild(buyBtn)
        } else {
            this.upgradeInfo.style.width = "0px"
            for(let t=0;t<this.upgradeTrees.length;t++) {
                this.upgradeTrees[t].box.style.right = "0px"
            }
        }
    }
    hideTrees() {
        for(let t=0;t<this.upgradeTrees.length;t++) {
            this.upgradeTrees[t].box.style.display = "none"
            this.upgradeTrees[t].selectBtn.style.background = "#0005"
        }
    }
    updateResources(resources) {
        this.resourceElem.innerHTML = "<br><h3>Inventory</h3>"
        this.resourceElem.innerHTML += "Coins: " + resources.coins + "<br>"
        this.resourceElem.innerHTML += "<h3>Crystals</h3>"
        Object.entries(resources.crystals).forEach(([key, value]) => {
            this.resourceElem.innerHTML += key + ": " + value + "<br>"
        });
        for(let t=0; t<this.upgradeTrees.length;t++) {
            this.upgradeTrees[t].updateColors(resources)
        }
    }
}


class UpgradeTree {
    constructor(game, tree, mainElem, upgradeObj) {
        this.type = tree.type
        this.unlocked_upgrades = []
        this.nodes = []

        this.box = document.createElement('div')
        this.box.className = "upgrade-tree"
        mainElem.appendChild(this.box)

        let elem = document.createElement("ul")
        elem.className = "tree-container"
        this.box.appendChild(elem)
        
        this.mousedown = false
        this.box.addEventListener('mousedown', (e) =>  {
            this.mousedown = true
            this.box.classList.add('drag')
        })
        this.box.addEventListener("mouseup", (e) => {
            this.mousedown = false
            this.box.classList.remove('drag')
        })
        this.box.addEventListener("mousemove", (e) => {
            if(this.mousedown){
                e.preventDefault();
                this.box.scrollLeft -= e.movementX;
                this.box.scrollTop -= e.movementY
            }
        });
        

        for(let n=0;n<tree.nodes.length;n++) {
            this.nodes.push(new UpgradeNode(game, tree.nodes[n], elem, upgradeObj))
        }


        this.selectBtn = document.createElement("button")
        this.selectBtn.className = "select-btn"
        this.selectBtn.innerHTML = this.type
        this.selectBtn.onclick = () => {
            upgradeObj.selectNode(game, false)
            this.show(upgradeObj)
        }
        upgradeObj.infoBar.appendChild(this.selectBtn)
    }
    show(upgradeObj) {
        upgradeObj.hideTrees()
        this.selectBtn.style.background = "#aaa5"
        this.box.style.display = "block"
    }
    updateColors(resources) {
        for(let n=0;n<this.nodes.length;n++) {
            this.nodes[n].updateColor(resources)
        }
    }
}

class UpgradeNode {
    constructor(game, node, boxElem, upgradeObj, l=0) {
        this.unlocked = false
        this.unlockable = false
        this.cost = node.cost
        this.name = node.name
        this.description = node.description
        this.unlocks = node.unlocks

        this.children = []

        this.element = document.createElement("li")
        this.element.div = document.createElement("button")

        this.element.div.className = "upgrade-node"
        this.element.div.innerHTML = node.name
        boxElem.appendChild(this.element)
        this.element.appendChild(this.element.div)
        if(node.nodes.length > 0) {
            let addElem = document.createElement("ul")
            this.element.appendChild(addElem)
            for(let n=0;n<node.nodes.length;n++) {
                this.children.push(new UpgradeNode(game, node.nodes[n], addElem, upgradeObj, l+1))
            }
        }
        if(l === 0) this.unlockable = true
        if(this.canAfford(game.resources)) this.unlock(game.resources)
        this.element.div.scrollIntoView({behavior:"auto", block:"center",inline:"center"})

        this.element.div.onclick = (e) => {upgradeObj.selectNode(game, this)}
    }
    unlock(resources) {
        if(this.unlockable) {
            this.unlocked = true
            for(let c=0;c<this.children.length;c++) {
                this.children[c].unlockable=true
            }
            resources.coins -= this.cost.coins
            Object.entries(this.cost.crystals).forEach(([key, value]) => {
                resources.crystals[key] -= value
            });
        }
        this.updateColor(resources)
    }
    canAfford(resources) {
        if(resources.coins < this.cost.coins) return false
        Object.entries(this.cost.crystals).forEach(([key, value]) => {
            if(resources.crystals[key] < value) return false
        });
        return true
    }
    updateColor(resources) {
        console.log(this.unlocked,this.unlockable)
        if(this.unlocked) {
            this.element.div.style.background = "#0f0a"
        } else if(this.unlockable) {
            if(this.canAfford(resources)) {
                this.element.div.style.background = "#fc0a"
            } else {
                this.element.div.style.background = "#f90a"
            }
        } else {
            this.element.div.style.background = "#f00a"
        }
        for(let c=0;c<this.children.length;c++) {
            this.children[c].updateColor(resources)
        }
    }
}



let upgrades = [
    {
        type: "Normal",
        nodes: [
            {
                name: "Normal Class",
                description: "Below here, you can unlock all the upgrades for normal-class towers, as well as some other related upgrades.",
                cost: new Resources(),
                unlocks: [],
                nodes: [
                    {
                        name: "Double Cannon",
                        description: "Unlock the Double Cannon.",
                        cost: new Resources(coins=1),
                        unlocks: [],
                        nodes: [
                            {
                                name: "Double Cannon Upgrades",
                                description: "Unlock several new upgrades for the Double Cannon.",
                                cost: new Resources(coins=1),
                                unlocks: [],
                                nodes: [
                                    {
                                        name: "Double Cannon Upgrades",
                                        description: "Unlock several new upgrades for the Double Cannon.",
                                        cost: new Resources(coins=1),
                                        unlocks: [],
                                        nodes: []
                                    },
                                    {
                                        name: "Double Cannon Upgrades",
                                        description: "Unlock several new upgrades for the Double Cannon.",
                                        cost: new Resources(coins=1),
                                        unlocks: [],
                                        nodes: [
                                            {
                                                name: "Speed Increase",
                                                description: "All Normal-Class Towers shoot 5% faster.",
                                                cost: new Resources(coins=1),
                                                unlocks: [],
                                                nodes: []
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                name: "Cannon Upgrades",
                                description: "Unlock several new upgrades for the Cannon.",
                                cost: new Resources(coins=1),
                                unlocks: [],
                                nodes: [
                                    {
                                        name: "Double Cannon Upgrades",
                                        description: "Unlock several new upgrades for the Double Cannon.",
                                        cost: new Resources(coins=1),
                                        unlocks: [],
                                        nodes: []
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        name: "Cannon Upgrades",
                        description: "Unlock several new upgrades for the Cannon.",
                        cost: new Resources(coins=1),
                        unlocks: [],
                        nodes: [
                            {
                                name: "Unlock Air Turret",
                                description: "Unlock the Air Turret.",
                                cost: new Resources(coins=1),
                                unlocks: [],
                                nodes: [
                                    {
                                        name: "Air Turret Upgrades",
                                        description: "Unlock several new upgrades for the Air Turret.",
                                        cost: new Resources(coins=1),
                                        unlocks: [],
                                        nodes: []
                                    },
                                    {
                                        name: "Air Turret Upgrades",
                                        description: "Unlock several new upgrades for the Air Turret.",
                                        cost: new Resources(coins=1),
                                        unlocks: [],
                                        nodes: [
                                            {
                                                name: "Health Increase",
                                                description: "All Normal-Class Towers have 5% more health.",
                                                cost: new Resources(coins=1),
                                                unlocks: [],
                                                nodes: []
                                            }
                                        ]
                                    },
                                    {
                                        name: "Air Turret Upgrades",
                                        description: "Unlock several new upgrades for the Air Turret.",
                                        cost: new Resources(coins=1),
                                        unlocks: [],
                                        nodes: []
                                    },
                                    {
                                        name: "Air Turret Upgrades",
                                        description: "Unlock several new upgrades for the Air Turret.",
                                        cost: new Resources(coins=1),
                                        unlocks: [],
                                        nodes: []
                                    },
                                ]
                            },
                            {
                                name: "Cannon Upgrades",
                                description: "Unlock several new upgrades for the Cannon.",
                                cost: new Resources(coins=1),
                                unlocks: [],
                                nodes: [
                                    {
                                        name: "Unlock Headhunter",
                                        description: "Unlock the Headhunter.",
                                        cost: new Resources(coins=1),
                                        unlocks: [],
                                        nodes: [
                                            {
                                                name: "Headhunter Upgrades",
                                                description: "Unlock several new upgrades for the Headhunter.",
                                                cost: new Resources(coins=1),
                                                unlocks: [],
                                                nodes: []
                                            },
                                            {
                                                name: "Headhunter Upgrades",
                                                description: "Unlock several new upgrades for the Headhunter.",
                                                cost: new Resources(coins=1),
                                                unlocks: [],
                                                nodes: [
                                                    {
                                                        name: "Headhunter Upgrades",
                                                        description: "Unlock several new upgrades for the Headhunter.",
                                                        cost: new Resources(coins=1),
                                                        unlocks: [],
                                                        nodes: []
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                ]
                            },
                            {
                                name: "Cannon Upgrades",
                                description: "Unlock several new upgrades for the Cannon.",
                                cost: new Resources(coins=1),
                                unlocks: [],
                                nodes: [
                                    {
                                        name: "Cannon Upgrades",
                                        description: "Unlock several new upgrades for the Cannon.",
                                        cost: new Resources(coins=1),
                                        unlocks: [],
                                        nodes: [
                                            {
                                                name: "Headhunter Upgrades",
                                                description: "Unlock several new upgrades for the Headhunter.",
                                                cost: new Resources(coins=1),
                                                unlocks: [],
                                                nodes: []
                                            },
                                            {
                                                name: "Damage Increase",
                                                description: "All Normal-Class Towers deal 5% more damage.",
                                                cost: new Resources(coins=1),
                                                unlocks: [],
                                                nodes: []
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        type: "Magic",
        nodes: [
            {
                name: "Magic Class",
                description: "Below here, you can unlock all the upgrades for magic-class towers, as well as some other related upgrades.",
                cost: new Resources(),
                unlocks: [],
                nodes: [

                ]
            }
        ]
    },
    {
        type: "Elemental",
        nodes: [
            {
                name: "Elemental Class",
                description: "Below here, you can unlock all the upgrades for elemental-class towers, as well as some other related upgrades.",
                cost: new Resources(),
                unlocks: [],
                nodes: [

                ]
            }
        ]
    },
    {
        type: "Summon",
        nodes: [
            {
                name: "Summon Class",
                description: "Below here, you can unlock all the upgrades for summon-class towers, as well as some other related upgrades.",
                cost: new Resources(),
                unlocks: [],
                nodes: [

                ]
            }
        ]
    },
    {
        type: "Support",
        nodes: [
            {
                name: "Support Class",
                description: "Below here, you can unlock all the upgrades for support-class towers, as well as some other related upgrades.",
                cost: new Resources(),
                unlocks: [],
                nodes: [

                ]
            }
        ]
    },
]