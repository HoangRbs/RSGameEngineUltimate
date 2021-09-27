// how to use
// let timer = new Timer();

// code between

// timer.end();

export default class Timer {
  constructor() {
    this.start = performance.now();
    this.end = this.start;
  }

  // to see time elapsed since the object is created, must call this function
  endTimer() {
    this.end = performance.now();
    console.log(`Time elapsed: ${(this.end - this.start) / 1000} seconds`);
  }
}
