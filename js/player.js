class Player {
  static idle = 'idle';
  static moving = 'moving';

  constructor(context) {
    this.context = context;
    this.images = {
      [Player.idle]: { image: new Image(), steps: 4 },
      [Player.moving]: { image: new Image(), steps: 6 },
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
  }

  init() {
    const images = Object.entries(this.images);

    this.images[Player.idle].image.src = 'assets/Black_Sheep_Idle.png';
    this.images[Player.moving].image.src = 'assets/Black_Sheep_Run.png';

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
    ]);
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
