class Tutorial {
    constructor(game) {
        this.tutorialItems = []
        this.setupTutorials(game)
    }
    setupTutorials(game) {
        // tutorial for adding tutorials:
        // add tutorialItem objects to this.tutorialItems here
        // this.tutorialItems.push(new TutorialItem("help text", boxWidth, boxHeight,triggerFunction,untriggerFunction))
        // triggerFunction should return a list [x,y] if the tutorial will be triggered and false if it wont be triggered
        // untriggerFunction should return true if the tutorial will be hidden again and false if it wont
        // leave untriggerFunction empty for manual close button
        this.tutorialItems.push(new TutorialItem("Select a tower and click a tile to build a tower!", 5, 3, ()=>{if(game.mode == "game") return [game.map.width/2,game.map.height/2]}, ()=>{return game.map.towers.towers.length > 0}))
        this.tutorialItems.push(new TutorialItem("Click towers to upgrade them!", 5, 2, ()=>{if(game.map.towers.towers.length > 0) return [game.map.towers.towers[0].x,game.map.towers.towers[0].y]}, ()=>{return Towers.selectedPlacedTower!=null}))
    }
    update(game) {
        for(let t=0;t<this.tutorialItems.length;t++) {
            this.tutorialItems[t].update(game.mode, game.tileSize)
        }
    }
}