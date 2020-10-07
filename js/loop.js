class Loop {
  constructor(context, player, background, platforms) {
    this.context = context;
    this.player = player;
    this.background = background;
    this.platforms = platforms;
  }

  update(timestamp) {
    this.player.update(timestamp);
  };

  render() {
    this.background.render(
      this.context.canvas.width,
      this.context.canvas.height,
    );
    this.platforms.forEach(platform => platform.render());
    this.player.render();
  };

  step(timestamp) {
    this.update(timestamp);
    this.render();
    requestAnimationFrame(this.step.bind(this));
  };
}