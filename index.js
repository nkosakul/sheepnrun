document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('sheep-and-run');
  const context = canvas.getContext('2d');

  const background = new Background(context);
  const backbroundPromise = background.init('assets/background1.png');
  const platforms = [
    new Platform(context),
    new Platform(context),
    new Gap(context),
    new Platform(context),
    new Platform(context),
    new Platform(context),
    new Gap(context),
    new Platform(context),
    new Gap(context),
  ];

  const platformPromises = platforms
    .map((platform, index) => {
      platform.x = index * platform.width;
      platform.y = 282;
      return platform;
    })
    .map((platform) => platform.init());

  const player = new Player(context);
  const playerPromise = player.init();

  Promise.all([backbroundPromise, ...platformPromises, playerPromise]).then(() => {
    const loop = new Loop(context, player, background, platforms);
    player.y = 202;
    requestAnimationFrame(loop.step.bind(loop));
  });
});
