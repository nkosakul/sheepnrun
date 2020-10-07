class Player {
  static idle = 'idle';
  static moving = 'moving';
  static jump = 'jump';

  constructor(context) {
    this.context = context;
    this.images = {
      [Player.idle]: { image: new Image(), steps: 4 },
      [Player.moving]: { image: new Image(), steps: 6 },
      [Player.jump]: { image: new Image(), steps: 8 },
    };

    this.currentState = Player.idle;

    this.x = 0;
    this.y = 202;
    this.sourceHeight = 464;
    this.sourceWidth = 325;
    this.height = this.sourceHeight / 3;
    this.width = this.sourceWidth / 3;

    this.lastUpdate = 0;
    this.updateEvery = 200;
    this.isRunning = false;
    this.isDead = false;
  }

  init() {
    const images = Object.entries(this.images);

    this.images[Player.idle].image.src = 'assets/Black_Sheep_Idle.png';
    this.images[Player.moving].image.src = 'assets/Black_Sheep_Run.png';
    this.images[Player.jump].image.src = 'assets/Black_Sheep_Jump.png';

    return Promise.all([
      new Promise((resolve) =>
        this.images[Player.idle].image.addEventListener('load', () =>
          resolve(),
        ),
      ),
      new Promise((resolve) =>
        this.images[Player.moving].image.addEventListener('load', () =>
          resolve(),
        ),
      ),
      new Promise((resolve) =>
        this.images[Player.jump].image.addEventListener('load', () =>
          resolve(),
        ),
      ),
    ]);
  };

  jump() {
    if (this.currentState === Player.moving) {
      this.currentState = Player.jump;
      this.updateEvery = 100;
      this.y = this.y - 55;
      this.currentAnimationStep = 0;
    }
  };

  die() {
    this.isDead = true;
  };

  setIsMoving(isRunning) {
    this.currentAnimationStep = 0;
    if (isRunning) {
      this.currentState = Player.moving;
      this.updateEvery = 100;
    } else {
      this.currentState = Player.idle;
      this.updateEvery = 200;
    }
  };

  advanceAnimationStep() {
    const maxStep = this.images[this.currentState].steps;
    this.currentAnimationStep =
      this.currentAnimationStep + 1 < maxStep
        ? this.currentAnimationStep + 1
        : 0;
  };

  shouldUpdate(timestamp) {
    return timestamp - this.lastUpdate >= this.updateEvery;
  };

  update(timestamp) {
    if (this.shouldUpdate(timestamp)) {
      this.advanceAnimationStep();
      if (
        this.currentState === Player.jump &&
        this.currentAnimationStep === 0
      ) {
        this.currentState = Player.moving;
        this.y = this.y + 55;
      }

      this.lastUpdate = timestamp;
    }
  };

  render() {
    const image = this.images[this.currentState];
    const sourceStartX = this.currentAnimationStep * this.sourceWidth;

    this.context.drawImage(
      image.image,
      sourceStartX,
      0,
      this.sourceWidth,
      this.sourceHeight,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  };
}
