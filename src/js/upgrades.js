class Upgrades {
    constructor(game, trees) {
        this.upgradeTrees = []

        this.showBtn = document.createElement("div")
        this.showBtn.className = "upgrade-btn"
        this.showBtn.onclick = () => {
            game.setMode(game.mode == "upgrade" ? "map" : "upgrade")
        }
        this.showBtn.innerHTML = "Upgrade Menu"

        document.body.appendChild(this.showBtn)
        this.element = document.createElement("div")
        this.element.className = "upgrade-menu"
        document.body.appendChild(this.element)

        for(let t=0;t<trees.length;t++) {
            this.upgradeTrees.push(new UpgradeTree(trees[t], this.element))
        }
    }
}


class UpgradeTree {
    constructor(tree, mainElem) {
        this.type = tree.type
        this.unlocked_upgrades = []
        this.nodes = []

        this.box = document.createElement('div')
        this.box.className = "upgrade-tree"
        mainElem.appendChild(this.box)

        let elem = document.createElement("ul")
        elem.className = "tree-container"
        this.box.appendChild(elem)

        for(let n=0;n<tree.nodes.length;n++) {
            this.nodes.push(new UpgradeNode(tree.nodes[n], elem))
        }
    }
}

class UpgradeNode {
    constructor(node, boxElem, l=0) {
        this.unlocked = false
        this.unlockable = false
        this.cost = node.cost
        this.name = node.name
        this.description = node.description
        this.unlocks = node.unlocks

        this.children = []

        this.element = document.createElement("li")
        this.element.div = document.createElement("div")

        this.element.div.className = "upgrade-node"
        this.element.div.innerHTML = node.name
        boxElem.appendChild(this.element)
        this.element.appendChild(this.element.div)
        if(node.nodes.length > 0) {
            let addElem = document.createElement("ul")
            this.element.appendChild(addElem)
            for(let n=0;n<node.nodes.length;n++) {
                this.children.push(new UpgradeNode(node.nodes[n], addElem, l+1))
            }
        }
        if(l === 0) this.unlockable = true
        if(node.cost === 0) this.unlock()
        this.element.div.scrollIntoView({behavior:"auto", block:"center",inline:"center"})

        this.element.div.onclick = () => {this.unlock()}
    }
    unlock() {
        if(this.unlockable) {
            this.unlocked = true
            this.element.div.style.background = "#0f0a"
            for(let c=0;c<this.children.length;c++) {
                this.children[c].unlockable=true
                this.children[c].element.div.style.background = "#fa0a"
            }
        }
    }
}



upgrades = [
    {
    type: "normal",
    nodes: [
        {
            name: "base upgrade",
            description: "very cool and awesome upgrade",
            cost: 0,
            unlocks: [],
            nodes: [
                {
                    name: "sub upgrade",
                    description: "hey look this upgrade can be developed further",
                    unlocks: [],
                    nodes: [
                        {
                            name: "sub sub upgrade",
                            description: "it goes deeper",
                            cost: 1,
                            unlocks: [],
                            nodes: [
                                {
                                    name: "test upgrade",
                                    description: "",
                                    cost: 1,
                                    unlocks: [],
                                    nodes: []
                                },
                                {
                                    name: "test upgrade",
                                    description: "",
                                    cost: 1,
                                    unlocks: [],
                                    nodes: []
                                },
                                {
                                    name: "test upgrade",
                                    description: "",
                                    cost: 1,
                                    unlocks: [],
                                    nodes: []
                                },
                                {
                                    name: "test upgrade",
                                    description: "",
                                    cost: 1,
                                    unlocks: [],
                                    nodes: []
                                },
                                {
                                    name: "test upgrade",
                                    description: "",
                                    cost: 1,
                                    unlocks: [],
                                    nodes: []
                                },
                                {
                                    name: "test upgrade",
                                    description: "",
                                    cost: 1,
                                    unlocks: [],
                                    nodes: []
                                },
                                
                            ]
                        },
                        {
                            name: "sub sub upgrade",
                            description: "it goes deeper",
                            cost: 1,
                            unlocks: [],
                            nodes: []
                        }
                    ]
                },
                {
                    name: "sub upgrade",
                    description: "hey look this upgrade can be developed further",
                    cost: 1,
                    unlocks: [],
                    nodes: []
                }
            ]
        }
    ]
}
]