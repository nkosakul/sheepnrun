document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('sheep-and-run');
  const context = canvas.getContext('2d');

  const background = new Background(context);
  const backbroundPromise = background.init('assets/background1.png', 'audio/music1.wav');

  const platformCollection = new PlatformCollection(context);
  const platformPromise = platformCollection.init();

  const player = new Player(context);
  const playerPromise = player.init();

  Promise.all([backbroundPromise, platformPromise, playerPromise]).then(() => {
    const loop = new Loop(context, player, background, platformCollection);

    requestAnimationFrame(loop.step.bind(loop));

    document.addEventListener('keyup', e => {
      if (e.key === 'Enter') {
        loop.toggleAnimation();
      } else if (e.code === 'Space') {
        // jump
        player.jump();
      }
    });
  });
});
