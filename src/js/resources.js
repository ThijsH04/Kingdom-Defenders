class Resources {
    constructor(coins=0,base=0,support=0,magic=0,elemental=0,summon=0, items=[]) {
        this.coins = coins
        this.crystals = {
            base,
            support,
            magic,
            elemental,
            summon
        }
        this.items = items // special items maybe
    }
}