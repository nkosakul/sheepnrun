class Player {
  static idle = 'idle';

  constructor(context) {
    this.context = context;
    this.images = {
      [Player.idle]: { image: new Image(), steps: 4 },
    };

    this.currentState = Player.idle;

    this.x = 0;
    this.y = 0;
    this.sourceHeight = 464;
    this.sourceWidth = 325;
    this.height = this.sourceHeight / 3;
    this.width = this.sourceWidth / 3;
  }

  init() {
    const images = Object.entries(this.images);

    this.images[Player.idle].image.src = 'assets/Black_Sheep_Idle.png';

    return Promise.all([
      new Promise((resolve) =>
        this.images[Player.idle].image.addEventListener('load', () =>
          resolve(),
        ),
      ),
    ]);
  }

  render() {
    const image = this.images[this.currentState];
    this.context.drawImage(
      image.image,
      0,
      0,
      this.sourceWidth,
      this.sourceHeight,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}