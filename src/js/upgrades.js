class Upgrades {
    constructor(game, trees) {
        this.upgradeTrees = []

        this.showBtn = document.createElement("button")
        this.showBtn.className = "upgrade-btn"
        this.showBtn.onclick = () => {
            game.setMode(game.mode == "upgrade" ? "map" : "upgrade")
            this.selectNode(game, false)
        }
        this.showBtn.innerHTML = "Upgrade Menu"

        document.body.appendChild(this.showBtn)
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
    }
    selectNode(game,node) {
        if(node) {
            this.upgradeInfo.style.display = "block"
            for(let t=0;t<this.upgradeTrees.length;t++) {
                this.upgradeTrees[t].box.style.right = "400px"
            }
            this.upgradeInfo.innerHTML = ""
        let text = document.createElement("span")
        text.innerHTML = "<h1>"+node.name+"</h1>"+node.description+"<br>cost: "+node.cost.coins+"<br>"
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
            this.upgradeInfo.style.display = "none"
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
            this.show(upgradeObj)
        }
        upgradeObj.infoBar.appendChild(this.selectBtn)
    }
    show(upgradeObj) {
        upgradeObj.hideTrees()
        this.selectBtn.style.background = "#aaa5"
        this.box.style.display = "block"
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
            this.element.div.style.background = "#0f0a"
            for(let c=0;c<this.children.length;c++) {
                this.children[c].unlockable=true
                this.children[c].element.div.style.background = "#fa0a"
            }
            resources.coins -= this.cost.coins
            Object.entries(this.cost.crystals).forEach(([key, value]) => {
                resources.crystals[key] -= value
            });
        }
    }
    canAfford(resources) {
        if(resources.coins < this.cost.coins) return false
        Object.entries(this.cost.crystals).forEach(([key, value]) => {
            if(resources.crystals[key] < value) return false
        });
        return true
    }
}



let upgrades = [
    {
        type: "normal",
        nodes: [
            {
                name: "base upgrade",
                description: "very cool and awesome upgrade",
                cost: new Resources(),
                unlocks: [],
                nodes: [
                    {
                        name: "sub upgrade",
                        description: "hey look this upgrade can be developed further",
                        cost: new Resources(cost=1),
                        unlocks: [],
                        nodes: [
                            {
                                name: "sub sub upgrade",
                                description: "it goes deeper",
                                cost: new Resources(cost=1),
                                unlocks: [],
                                nodes: [
                                    {
                                        name: "sub sub sub upgrade",
                                        description: "",
                                        cost: new Resources(cost=1),
                                        unlocks: [],
                                        nodes: []
                                    },
                                    {
                                        name: "sub sub sub upgrade",
                                        description: "",
                                        cost: new Resources(cost=1),
                                        unlocks: [],
                                        nodes: []
                                    },
                                    {
                                        name: "sub sub sub upgrade",
                                        description: "",
                                        cost: new Resources(cost=1),
                                        unlocks: [],
                                        nodes: []
                                    },
                                    {
                                        name: "sub sub sub upgrade",
                                        description: "",
                                        cost: new Resources(cost=1),
                                        unlocks: [],
                                        nodes: []
                                    },
                                    {
                                        name: "sub sub sub upgrade",
                                        description: "",
                                        cost: new Resources(cost=1),
                                        unlocks: [],
                                        nodes: []
                                    },
                                    {
                                        name: "sub sub sub upgrade",
                                        description: "",
                                        cost: new Resources(cost=1),
                                        unlocks: [],
                                        nodes: []
                                    },
                                    
                                ]
                            },
                            {
                                name: "sub sub upgrade",
                                description: "it goes deeper",
                                cost: new Resources(cost=1),
                                unlocks: [],
                                nodes: []
                            }
                        ]
                    },
                    {
                        name: "sub upgrade",
                        description: "hey look this upgrade can be developed further",
                        cost: new Resources(cost=1),
                        unlocks: [],
                        nodes: []
                    }
                ]
            }
        ]
    },
    {
        type: "test",
        nodes: [
            {
                name: "base upgrade",
                description: "very cool and awesome upgrade",
                cost: new Resources(),
                unlocks: [],
                nodes: [
                    {
                        name: "sub upgrade",
                        description: "hey look this upgrade can be developed further",
                        cost: new Resources(cost=1),
                        unlocks: [],
                        nodes: [
                            {
                                name: "cool upgrade",
                                description: "brrr",
                                cost: new Resources(cost=1),
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