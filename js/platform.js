class Platform {
  constructor(context) {
    this.context = context;
    this.image = new Image();

    this.x = 0;
    this.y = 0;
    this.height = 130;
    this.width = 200;

    this.lastUpdate = 0;
    this.updateEvery = 350;
  }

  init() {
    return new Promise((resolve) => {
      this.image.src = 'assets/platform.png';
      this.image.addEventListener('load', resolve);
    });
  };
  
  advanceAnimationStep() {
    console.log('this.context :>> ', this.context);
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

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
  };

  render() {
    this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
  };
}