"use strict";

const lengthInput = document.querySelector(".dimension-input");
const btn = document.querySelector(".calculate-btn");
const selection = document.getElementById("calculation-select");

function preRenderCheck(choice) {
  //this is a check to see if a <li> list was printed and if so clears it
  if (choice.innerHTML !== "") {
    choice.innerHTML = "";
  }
}

//TODO these classList may need to get there own generic function because after
//creating so many choices this could get really messy
//thinking maybe a render class and a input handel class so these would be a render class
function showStairs() {
  document.querySelector("h1").textContent = "Enter overall height"; //The h1 under testing
  document.querySelector(".handrail-section").classList.add("no-show");
  document.querySelector(".stairs-section").classList.remove("no-show");
}
function showHandrail() {
  document.querySelector("h1").textContent = "Enter length of handrail";
  document.querySelector(".stairs-section").classList.add("no-show");
  document.querySelector(".handrail-section").classList.remove("no-show");
}

class Input {
  constructor() {
    this.handelInput = this.handelInput.bind(this);
  }
  handelInput() {
    const checkDimension = lengthInput.value;

    if (checkDimension === "") {
      lengthInput.classList.add("invalid-input");
    } else {
      lengthInput.classList.remove("invalid-input"); //TODO seems there should be a better way to handle this
    }
    if (isNaN(checkDimension)) {
      const usableDimension = this.breakingInputDown(checkDimension);
      if (isNaN(usableDimension)) {
        document.querySelector(".invalid").classList.remove("hidden");
      } else {
        this.compareInputChoice(+usableDimension);
      }
    } else {
      this.compareInputChoice(+checkDimension);
    }
  }
  compareInputChoice(dimensions) {
    if (selection.value === "stairs") {
      // const stair = new Stairs(); //TODO this may be a scope issue creating the class here
      stair.getDimension(dimensions);
      preRenderCheck(stair.stairOl); //probably should use a setter instead of the constructor that way I can create it globally

      stair.stairMath();
    } else if (selection.value === "handrails") {
      // const handrail = new Handrail(dimensions);
      handrail.getDimension(dimensions);
      preRenderCheck(handrail.picketList);
      handrail.calculatePickets();
    } else if (selection.value === "roof") {
      //do this
    }
  }
  //TODO this doesn't seem like it should be a input class but a conversion class or something like it
  //because I would like to make it switch from imperial to metric
  breakingInputDown(dismantling) {
    let foot = 0;
    let inch = 0;
    let numerator = 0;
    let denominator = 1;
    let footMark = 0;
    let inchMark = 0;
    let divMark = 0;
    let length = 0;

    if (dismantling.indexOf("'") !== -1) {
      footMark = dismantling.indexOf("'");
      foot = +dismantling.slice(0, footMark);
      length = foot * 12;
    }
    if (dismantling.indexOf('"') !== -1) {
      inchMark = dismantling.indexOf('"');
      inch = +dismantling.slice(footMark + 1, inchMark);
      length += inch;
    }
    if (dismantling.indexOf("/") !== -1) {
      divMark = dismantling.indexOf("/");
      numerator = +dismantling.slice(inchMark + 1, divMark);
      denominator = +dismantling.slice(divMark + 1);
      if (denominator > 0) {
        length += numerator / denominator;
      }
    }
    console.log(`foot is ${foot} inch ${inch} num ${numerator} and den is ${denominator}`); //TODO debugging
    console.log(length);
    return length;
  }
  choiceSelected() {
    if ("stairs" === selection.value) {
      console.log("you selected stairs"); //TODO debugging remove when done
      showStairs();
    }
    if ("handrails" === selection.value) {
      console.log("you selected handrails"); //TODO debugging remove when done
      showHandrail();
    }
    if ("roof" === selection.value) {
      console.log("you selected roof"); //TODO debugging remove when done
    }
  }
}
class Stairs {
  // constructor(dimensionInput, run = 10.5) {
  //   this.height = dimensionInput;
  //   this.run = run;
  // }
  getDimension(dimensionInput) {
    this.height = dimensionInput;
  }
  stairOl = document.querySelector(".step-hypot");

  height = 0;
  steps = 0;
  rise = 0;
  run = 10.5;
  stepHypot = 0;
  headroom = 93;
  floor = 10;
  treads = 11.5;
  treadThickness = 1;
  opening = 0;
  angle = 0;

  stairMath() {
    this.steps = Math.ceil(this.height / 7.75);
    this.rise = this.height / this.steps;
    this.stepHypot = Math.sqrt(this.run ** 2 + this.rise ** 2);
    this.angle = +((Math.atan2(this.rise, this.run) * 180) / Math.PI).toFixed(3);
    this.opening = this.headroom / Math.tan(Math.atan2(this.rise, this.run));

    console.log(this.stepHypot); //TODO testing
    console.log(this.rise);
    console.log(this.angle);
    this.renderStairHypot();
  }
  renderStairHypot() {
    document.querySelector(".stair-answer").textContent = `Your rise is ${this.rise.toFixed(
      3
    )}, angle ${this.angle.toFixed(3)}, step hypot ${this.stepHypot.toFixed(
      3
    )} and min opening is ${this.opening} with stair length of ${this.run * this.steps}`;

    let nextHypot = this.stepHypot;

    for (let i = 0; i < this.steps; i++) {
      let stepHypotLI = document.createElement("li");
      stepHypotLI.textContent = nextHypot.toFixed(3);
      nextHypot += this.stepHypot;
      console.log(stepHypotLI.textContent);
      this.stairOl.append(stepHypotLI);
    }
  }
}
class Handrail {
  constructor(picketMaxSpace = 4, picketThickness = 1.5) {
    this.picketMaxSpace = picketMaxSpace + picketThickness;
    this.#picketThickness = picketThickness;
  }
  #length = 0;
  #picketThickness = 1.5;
  #pickets = 0;
  #picketSpacing = 0;

  getDimension(length) {
    this.#length = length;
  }
  //TODO create more setting functions for spacing and thickness
  picketList = document.querySelector(".pickets-list");

  calculatePickets() {
    this.#pickets = Math.ceil((this.#length - this.#picketThickness) / this.picketMaxSpace);
    this.#picketSpacing = (this.#length - this.#picketThickness) / this.#pickets;
    this.renderPickets();
  }
  renderPickets() {
    console.log(this.#pickets);
    let nextPicket = this.#picketSpacing;
    //this prints out a list of all the pickets dimensions
    for (let i = 0; i < this.#pickets; i++) {
      let picketLI = document.createElement("li");
      picketLI.textContent = nextPicket.toFixed(3);
      nextPicket += this.#picketSpacing;
      console.log(picketLI.textContent); //TODO debugging
      this.picketList.append(picketLI);
    }
  }
}
const input = new Input();
const stair = new Stairs();
const handrail = new Handrail();

btn.addEventListener("click", input.handelInput);

selection.addEventListener("click", input.choiceSelected);
