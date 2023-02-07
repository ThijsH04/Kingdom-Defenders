class WorldMap {
    constructor(name, levels = []) {
        this.levels = levels
        this.name = name
        this.map = worldDataList[id]
    }
}

class Level {
    constructor(id, name, description) {
        this.id = id
        this.name = name
        this.description = description
        this.completed = false
    }
}