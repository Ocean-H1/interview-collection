export default class TrafficLight {
  constructor(lights) {
    this._lights = lights;
    this._currentIndex = 0;
    this._time = Date.now();
  }

  get currentLight() {
    return this._lights[this._currentIndex];
  }

  // 更新状态
  _update() {
    let disTime = this._disTime();
    const total = this._lights.reduce((prev, cur) => {
      return prev + cur.duration;
    }, 0);
    disTime %= total;
    this._time += total * Math.floor(disTime / total);

    while (1) {
      disTime -= this.currentLight.duration;
      if (disTime < 0) break;
      else {
        // 需要切换状态
        this._time += this.currentLight.duration * 1000;
        this._currentIndex = (this._currentIndex + 1) % this._lights.length;
      }
    }
  }

  // 计算当前已经过的时间 (s)
  _disTime() {
    return (Date.now() - this._time) / 1000;
  }

  getCurrentLight() {
    this._update();
    return {
      color: this.currentLight.color,
      remain: this.currentLight.duration - this._disTime()
    };
  }
}