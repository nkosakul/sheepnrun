class Gap {
  constructor(context) {
    this.context = context;

    this.x = 0;
    this.y = 0;
    this.height = 130;
    this.width = 200;
  }

  init() {
    return Promise.resolve();
  }

  render() {}
}