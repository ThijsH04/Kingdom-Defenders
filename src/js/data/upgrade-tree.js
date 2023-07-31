const upgrades = [
    {
        type: "Normal",
        nodes: [
            {
                name: "Normal Class",
                description: "Below here, you can unlock all the upgrades for normal-class towers, as well as some other related upgrades.",
                cost: new Resources(),
                unlocks: [
                    new Unlockable("Cannon Tower", paths=[[0,0],[1,0],[2,0],[3,0]]),
                    // unlock all towers for testing purposes
                    new Unlockable("Missile Launcher", paths=[[0,0],[1,0],[2,0],[3,0]]),
                    new Unlockable("Shrapnel Tower", paths=[[0,0],[1,0],[2,0],[3,0]]),
                    new Unlockable("Earthquake Tower", paths=[[0,0],[1,0],[2,0],[3,0]]),
                    new Unlockable("Lightning Tower", paths=[[0,0],[1,0],[2,0],[3,0]]),
                    new Unlockable("Mage Tower", paths=[[0,0],[1,0],[2,0],[3,0]]),
                ],
                nodes: [
                    {
                        name: "Double Cannon",
                        description: "Unlock the Double Cannon.",
                        cost: new Resources(coins=1),
                        unlocks: [
                            
                        ],
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
                        unlocks: [
                            new Unlockable("Cannon Tower", paths=[[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2]])
                        ],
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