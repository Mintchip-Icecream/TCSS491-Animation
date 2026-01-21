class Player {
    constructor(game) {
        this.game = game;
        this.animations = [];
        this.loadAnimations();
        this.isRight = true;
        this.animationState = "Idle";
        this.x = 100;
        this.y = 480;
        this.speed = 800;
        this.haltedState = false;
    };

    loadAnimations() {
        this.animations = [];
        this.idle = new Animator(ASSET_MANAGER.getAsset("./IdleRun-Sheet.png"), 0, 0, 32, 32, 2, 1, 0, false, true);
        this.animations["Idle"] = this.idle;

        this.run = new Animator(ASSET_MANAGER.getAsset("./IdleRun-Sheet.png"), 0, 32, 32, 32, 6, .1, 0, false, true);
        this.animations["Run"] = this.run;

        this.idleAttack = new Animator(ASSET_MANAGER.getAsset("./IdleRun-Sheet.png"), 0, 64, 32, 32, 6, .05, 0, false, false);
        this.animations["IdleAttack"] = this.idleAttack;
    }

    update() {
        // halt input if attacking
        if (this.haltedState === true) {return;}

        if (this.game.click) { // changed the game engine code so that if there is no longer any click, then game.click is null
            this.setAnimationState("IdleAttack"); 
            this.haltedState = true;
        }
        else if (this.game.keys.a === true) {
            this.setAnimationState("Run"); 
            if (this.x > 50) {
                this.isRight = false;
                this.x -= this.speed * this.game.clockTick;
            }
        }
        else if (this.game.keys.d === true) {
            this.setAnimationState("Run");
            if (this.x < 800) {
                this.isRight = true;
                this.x += this.speed * this.game.clockTick;
            }
        }
        else {this.setAnimationState("Idle");}
    };

    draw(ctx) {
        if (this.haltedState === true && this.animations[this.animationState].isDone()) {this.goDefaultState();}

        this.animations[this.animationState].drawFrame(this.game.clockTick, ctx, this.x, this.y, !this.isRight);
    }

    setAnimationState(state) {
        this.animationState = state;
    }

    goDefaultState() {
        this.haltedState = false;
        this.animations[this.animationState].resetTimer();
        this.setAnimationState("Idle")
    }
}