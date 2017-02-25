module.exports = class Starfield {
  constructor(elem, starCount, speed, fps) {
    this.elem = elem;
    this.ctx = this.elem.getContext('2d');
    this.starCount = starCount || 1000;
    this.fps = fps || 60;
    this.speed = speed || 1;

    // Set up resizing
    this.elem.width = this.elem.offsetWidth;
    this.elem.height = this.elem.offsetHeight;
    window.addEventListener('resize', () => this.resize());

    // Build a list of stars with X Y and Z coordinates
    this.stars = [];
    for (let i = 0; i < this.starCount; i += 1) {
      this.stars.push(this.getStar(false));
    }

    // Begin render loop
    this.start();
  }

  getStar(back) {
    const rand = (low, high) => (Math.random() * (high - low)) + low;
    const polToCart = (r, theta) => [
      r * Math.cos(theta),
      r * Math.sin(theta),
    ];

    const maxRadius = Math.min(this.elem.width, this.elem.height) / 4 / 2;
    const pos = polToCart(
      rand(maxRadius / 25, maxRadius),
      rand(0, Math.PI * 2),
    );

    return {
      x: pos[0],
      y: pos[1],
      z: back ? 25 : rand(0, 25),
      // Random char from code 33 to code 129
      text: String.fromCharCode((Math.floor(Math.random() * 96) + 33)),
    };
  }

  // When the window is resized, adjust canvas coordinate system
  resize() {
    this.elem.width = this.elem.offsetWidth;
    this.elem.height = this.elem.offsetHeight;
    this.draw();
  }

  // Render
  draw() {
    this.ctx.clearRect(0, 0, this.elem.width, this.elem.height);

    for (let i = 0; i < this.stars.length; i += 1) {
      const star = this.stars[i];
      const progress = (1 - (star.z / 25));
      const lightness = Math.round(progress * 255);
      this.ctx.fillStyle = `rgb(${lightness}, ${lightness}, ${lightness})`;
      this.ctx.font = `300 ${progress * 20}px Roboto Mono`;

      const projectedX = (100 / star.z) * star.x;
      const projectedY = (100 / star.z) * star.y;
      const finalX = projectedX + (this.elem.width / 2);
      const finalY = projectedY + (this.elem.height / 2);

      this.ctx.fillText(
        star.text, finalX, finalY,
      );

      star.z -= this.speed / 10;
      if (star.z < 0 ||
          finalX < 0 ||
          finalY < 0 ||
          finalX > this.elem.width ||
          finalY > this.elem.height) {
        this.stars[i] = this.getStar(true);
      }
    }
  }

  // Begin render loop
  start() {
    this.interval = setInterval(
      () => requestAnimationFrame(() => this.draw()),
      1000 / this.fps,
    );
  }

  // Pause render loop
  stop() {
    clearInterval(this.interval);
  }
};
