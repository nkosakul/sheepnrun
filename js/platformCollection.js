class PlatformCollection {
  constructor(context) {
    this.context = context;
    this.platforms = [];
    this.updateEvery = 35;
    this.lastUpdate = 0;
    this.y = 282;
    this.count = 0;
  }

  async init() {
    this.platforms = [
      new Platform(this.context),
      new Gap(this.context),
      new Platform(this.context),
      new Platform(this.context),
      new Gap(this.context),
      new Platform(this.context),
      new Platform(this.context),
      new Platform(this.context),
      new Gap(this.context),
      new Platform(this.context),
    ];

    const initializedPlatforms = this.platforms.map((platform) =>
      platform.init(),
    );

    return Promise.all(initializedPlatforms).then(() => {
      this.platforms.forEach((platform, index) => {
        platform.updatePosition(index * platform.width, this.y);
      });
    });
  };

  shouldUpdate(timestamp) {
    return timestamp - this.lastUpdate >= this.updateEvery;
  };

  update(timestamp) {
    if (this.shouldUpdate(timestamp)) {
      this.platforms.forEach((platform, index) => {
        if (platform.x + platform.width < 0) {
          const p = this.platforms.splice(index, 1)[0];
          const lastPlatform = this.platforms[this.platforms.length - 1];
          p.updatePosition(lastPlatform.x + lastPlatform.width, p.y);
          this.platforms.push(p);
        } else {
          platform.updatePosition(platform.x - 5, platform.y);
        }
      });
    }
  };

  render() {
    this.platforms.forEach((platform) => {
      platform.render();
    });
  };
}
