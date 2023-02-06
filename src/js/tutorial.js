class Tutorial {
    constructor(mapData) {
        this.mapData = mapData
        this.tutorialItems = []
        this.setupTutorials()
    }
    setupTutorials() {
        // tutorial for adding tutorials:
        // add tutorialItem objects to this.tutorialItems here
        // this.tutorialItems.push(new TutorialItem("help text", boxWidth, boxHeight,triggerFunction,untriggerFunction))
        // triggerFunction should return a list [x,y] if the tutorial will be triggered and false if it wont be triggered
        // untriggerFunction should return true if the tutorial will be hidden again and false if it wont
        // leave untriggerFunction empty for manual close button
        this.tutorialItems.push(new TutorialItem("Click a tile to build a tower!", 5, 2, ()=>{return [this.mapData.width/2,this.mapData.height/2]}, ()=>{return this.mapData.towers.towers.length > 0}))
        this.tutorialItems.push(new TutorialItem("Click towers to upgrade them!", 5, 2, ()=>{if(this.mapData.towers.towers.length > 0) return [this.mapData.towers.towers[0].x,this.mapData.towers.towers[0].y]}))
    }
    update(tileSize) {
        for(let t=0;t<this.tutorialItems.length;t++) {
            this.tutorialItems[t].update(tileSize)
        }
    }
}