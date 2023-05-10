export default class HorizontalScroll {
  elem: HTMLUListElement;

  speed: number;

  isScroll!: boolean;

  interval: number;

  prevX!: number;

  prevTime!: number;

  checkSpeedInterval!: number;

  destroySpeedInterval!: number;

  lastX!: number;

  lastTime!: number;

  lastSpeed!: number;

  decelerationTime: number;

  frames: number;

  fps: number;

  decelerationInterval!: number;

  constructor(elem: HTMLUListElement) {
    this.elem = elem;
    this.speed = 0;
    this.prevX = 0;
    this.prevTime = 0;
    this.lastX = 0;
    this.lastTime = 0;
    this.decelerationTime = 2;
    this.frames = 30 * this.decelerationTime;
    this.fps = 30;
    this.interval = 1000 / this.fps;

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.trackSpeed = this.trackSpeed.bind(this);

    this.deceleration = this.deceleration.bind(this);
  }

  onMouseDown(pageX: number) {
    this.isScroll = true;
    this.prevX = pageX;
    this.prevTime = Date.now();

    // console.log('pre-start', this.isScroll, this.checkSpeedInterval);
    this.elem!.addEventListener('mousemove', this.onMouseMove);
    this.checkSpeedInterval = setInterval(() => this.trackSpeed(), this.interval);
    return this.checkSpeedInterval;
  }

  onMouseUp(checkSpeedInterval: number) {
    this.checkSpeedInterval = checkSpeedInterval;
    this.speed = this.lastSpeed;
    console.log(this.speed, this.lastSpeed);
    this.deceleration();
    this.isScroll = false;
    this.destroySpeedInterval = setInterval(() => this.destroy(), 2000);
    this.elem!.removeEventListener('mousemove', this.onMouseMove);
    clearInterval(checkSpeedInterval);
  }

  onMouseMove(event: MouseEvent) {
    if (this.isScroll) {
      this.lastX = event.pageX;
      this.lastTime = Date.now();
      return;
    }
    this.lastX = 0;
    this.lastTime = 0;
  }

  trackSpeed() {
    if (!this.lastTime || this.lastTime === this.prevTime) {
      this.speed = 0;
    } else {
      this.speed = (this.lastX - this.prevX) / (this.lastTime - this.prevTime) || 0;
    }
    if (this.speed !== 0) this.lastSpeed = this.speed;
    this.prevX = this.lastX;
    this.prevTime = this.lastTime;
    console.log(this.lastSpeed);
  }

  deceleration() {
    this.decelerationInterval = setInterval(() => {
      if (this.speed === 0) {
        clearInterval(this.decelerationInterval);
        return;
      }
      this.speed -= this.lastSpeed / this.frames;
      this.elem.scrollTo(this.elem.scrollLeft + this.speed, 0);
    }, this.interval);
  }

  destroy() {
    this.elem!.removeEventListener('mousemove', this.onMouseMove);
    clearInterval(this.destroySpeedInterval);
    // this.elem!.removeEventListener('mouseover', this.onMouseDown);
    // this.elem!.removeEventListener('mouseout', this.onMouseUp);
  }
}
