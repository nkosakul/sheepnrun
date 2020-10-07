class Loop {
  constructor(context, player, background, platformCollection) {
    this.context = context;
    this.player = player;
    this.background = background;
    this.platformCollection = platformCollection;
    this.isAnimating = false;
  }

  update(timestamp) {
    this.player.update(timestamp);
    this.isAnimating && this.platformCollection.update(timestamp);
  };

  render() {
    this.background.render(
      this.context.canvas.width,
      this.context.canvas.height,
    );
    this.platformCollection.render();
    this.player.render();
  };

  toggleAnimation() {
    this.isAnimating = !this.isAnimating;
  };

  step(timestamp) {
    this.update(timestamp);
    this.render();
    requestAnimationFrame(this.step.bind(this));
  };
}