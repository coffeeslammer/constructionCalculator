export class Stairs {
  stairOl = document.querySelector(".step-hypot");

  #maxRiseHeight = 7.75;
  #height = 0;
  #steps = 0;
  #rise = 0;
  #run = 10.5;
  #stepHypot = 0;
  #headroom = 82;
  #floor = 10; //these are for future use
  #treads = 11.5;
  #treadThickness = 1;
  #opening = 0;
  #angle = 0;

  set stairHeight(height) {
    this.#height = height;
  }
  set stairRun(newRun) {
    this.#run = newRun;
  }
  //this is if for some reason you need to override the max rise
  set riser(newRise) {
    this.#maxRiseHeight = newRise;
  }
  set headRoom(headHeight) {
    this.#headroom = headHeight;
  }
  set floorSize(joist) {
    this.#floor = joist;
  }
  set treadThickness(tread) {
    this.#treads = tread;
  }

  stairMath() {
    this.calculateSteps();
    this.calculateRise();
    this.calculateStepHypot();
    this.calculateAngle();
    this.calculateStairOpening();
    this.renderStairHypot();
  }
  calculateStairOpening() {
    this.#opening = this.#headroom / Math.tan(Math.atan2(this.#rise, this.#run));
  }
  calculateSteps() {
    this.#steps = Math.ceil(this.#height / this.#maxRiseHeight);
  }
  calculateRise() {
    this.#rise = this.#height / this.#steps;
  }
  calculateStepHypot() {
    this.#stepHypot = Math.sqrt(this.#run ** 2 + this.#rise ** 2);
  }
  calculateAngle() {
    this.#angle = +((Math.atan2(this.#rise, this.#run) * 180) / Math.PI).toFixed(3);
  }
  checkOptions() {
    if (document.querySelector("#chbx-run").checked) {
      console.log(+document.querySelector("#stair-run-input").value);
      //FIXME this opens a whole can of worms for more error checking
      //there could be a dozen inputs that each need to be error checked
      this.stairRun = +document.querySelector("#stair-run-input").value;
    } else {
      this.stairRun = 10.5; //FIXME for now I need this because if you check the box then uncheck it nothing happens
      //may need a reset option or something
    }
    if (document.getElementById("chbx-max-rise-override").checked) {
      this.riser = +document.getElementById("stair-max-rise-override-input").value;
    } else {
      this.riser = 7.75;
    }
  }
  renderStairHypot() {
    document.querySelector(".stair-answer").innerHTML = `<ul>
    <li>Your rise is: ${this.#rise.toFixed(3)}</li>
        <li>Steps: ${this.#steps}</li>
        <li>Angle: ${this.#angle.toFixed(3)}</li>
        <li>Step hypot: ${this.#stepHypot.toFixed(3)}</li>
        <li>Min opening is: ${this.#opening.toFixed(3)}</li>
        <li> Stair length is: ${this.#run * this.#steps}</li></ul>`;

    if (this.stairOl.innerHTML !== "") {
      this.stairOl.innerHTML = "";
    }

    let nextHypot = this.#stepHypot;

    for (let i = 0; i < this.#steps; i++) {
      let stepHypotLI = document.createElement("li");
      stepHypotLI.textContent = nextHypot.toFixed(3);
      nextHypot += this.#stepHypot;
      console.log(stepHypotLI.textContent);
      this.stairOl.append(stepHypotLI);
    }
  }
}
