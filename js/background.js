export default class Background {
  constructor(context) {
    this.context = context;
    this.image = new Image();
    this.audio = new Audio();
    this.audio.loop = true;
    this.isPlaying = false;
  }

  init(imageSrc, audioSrc) {
    return Promise.all([
      new Promise((resolve) => {
        this.image.src = imageSrc;
        this.image.addEventListener('load', resolve);
      }),
      new Promise((resolve) => {
        this.audio.src = audioSrc;
        this.audio.addEventListener('canplaythrough', resolve);
      }),
    ]);
  };

  playMusic() {
    if (!this.isPlaying) {
      this.audio.currentTime = 0;
      this.audio.play();
      this.isPlaying = true;
    }
  };

  render(width, height) {
    this.context.drawImage(this.image, 0, 0, width, height);
  };
}