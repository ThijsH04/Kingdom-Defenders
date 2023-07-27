class Stats{
    constructor(roundPlaced=-1){
        this.shots = 0;
        this.damageDealt = 0;
        this.roundPlaced = roundPlaced;
    }

    increaseShots(shots=1){
        this.shots += shots;
    }

    increaseDamageDealt(damageDealt){
        this.damageDealt += damageDealt;
    }

}