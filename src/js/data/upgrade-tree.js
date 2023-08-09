const upgrades = [
    {
        type: "Normal",
        nodes: [
            {
                name: "Normal Class",
                description: "Below here, you can unlock all the upgrades for normal-class towers, as well as some other related upgrades.",
                cost: new Resources(),
                unlocks: [
                    new Unlockable("Cannon", paths=[[0,0],[1,0],[2,0],[3,0]]),
                    // unlock all towers for testing purposes
                    new Unlockable("Missile Launcher", paths=[[0,0],[1,0],[2,0],[3,0]]),
                    new Unlockable("Air Turret", paths=[[0,0],[1,0],[2,0],[3,0]]),
                    new Unlockable("Shrapnel Tower", paths=[[0,0],[1,0],[2,0],[3,0]]),
                    new Unlockable("Earthquake Tower", paths=[[0,0],[1,0],[2,0],[3,0]]),
                    new Unlockable("Lightning Tower", paths=[[0,0],[1,0],[2,0],[3,0]]),
                    new Unlockable("Mage Tower", paths=[[0,0],[1,0],[2,0],[3,0]]),
                    new Unlockable("Ricochet Tower", paths=[[0,0],[1,0],[2,0],[3,0]]),
                ],
                nodes: [
                    {
                        name: "Scattershot",
                        description: "Unlock the Scattershot.",
                        cost: new Resources(coins=1),
                        unlocks: [
                            new Unlockable("Scattershot", paths=[[0,0],[1,0],[2,0],[3,0]]),
                        ],
                        nodes: [
                            {
                                name: "Scattershot Upgrades",
                                description: "Unlock upgrades for the Scattershot.",
                                cost: new Resources(coins=1),
                                unlocks: [
                                    new Unlockable("Scattershot", paths=[[0,1],[1,1],[2,1]]),
                                ],
                                nodes: [
                                    {
                                        name: "Scattershot Upgrades",
                                        description: "Unlock upgrades for the Scattershot.",
                                        cost: new Resources(coins=1),
                                        unlocks: [
                                            new Unlockable("Scattershot", paths=[[0,2],[1,2],[2,2]]),
                                        ],
                                        nodes: [],
                                    }
                                ]
                            },
                            {
                                name: "Scattershot Upgrades",
                                description: "Unlock upgrades for the Scattershot.",
                                cost: new Resources(coins=1),
                                unlocks: [
                                    new Unlockable("Scattershot", paths=[[3,1]]),
                                ],
                                nodes: [
                                    {
                                        name: "Scattershot Upgrades",
                                        description: "Unlock upgrades for the Scattershot.",
                                        cost: new Resources(coins=1),
                                        unlocks: [
                                            new Unlockable("Scattershot", paths=[[3,2]]),
                                        ],
                                        nodes: [],
                                    },
                                    {
                                        name: "Cannon Upgrades",
                                        description: "Unlock upgrades for the Cannon.",
                                        cost: new Resources(coins=1),
                                        unlocks: [
                                            new Unlockable("Cannon", paths=[[3,1]]),
                                        ],
                                        nodes: [
                                            {
                                                name: "Cannon Upgrades",
                                                description: "Unlock upgrades for the Cannon.",
                                                cost: new Resources(coins=1),
                                                unlocks: [
                                                    new Unlockable("Cannon", paths=[[3,2]]),
                                                ],
                                                nodes: [],
                                            }
                                        ]
                                    }
                                ]
                            }

                        ]
                    },
                    {
                        name: "Cannon Upgrades",
                        description: "Unlock upgrades for the Cannon.",
                        cost: new Resources(coins=1),
                        unlocks: [
                            new Unlockable("Cannon", paths=[[0,1],[1,1]]),
                        ],
                        nodes: [
                            {
                                name: "Cannon Upgrades",
                                description: "Unlock upgrades for the Cannon.",
                                cost: new Resources(coins=1),
                                unlocks: [
                                    new Unlockable("Cannon", paths=[[0,2]]),
                                ],
                                nodes: [],
                            },
                            {
                                name: "Cannon Upgrades",
                                description: "Unlock upgrades for the Cannon.",
                                cost: new Resources(coins=1),
                                unlocks: [
                                    new Unlockable("Cannon", paths=[[1,2]]),
                                ],
                                nodes: [],
                            },
                        ]
                    },
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