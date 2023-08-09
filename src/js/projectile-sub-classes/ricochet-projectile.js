class RicochetProjectile extends Projectile {
    constructor(args){
        super(args);
        this.bounces = args.bounces;
    }

    hit(enemy) {
        this.bounce(enemy);
        this.attacked = [];
        super.hit(enemy);
    }

    bounce(e){
        if(this.x+this.w<e.x+e.w/2&&this.x-this.w>e.x-e.w/2){
            this.a = Math.PI*2-this.a;
        } else {
            this.a = Math.PI - this.a;
        }
        // this.x < e.x + e.w &&
        // this.x + this.w > e.x &&
        // this.y < e.y + e.h &&
        // this.h + this.y > e.y
    }
}
