"use strict";

const lengthInput = document.querySelector(".dimension-input");
const btn = document.querySelector(".btn");
const stairInput = document.getElementById("stair-height-input");
const selection = document.getElementById("calculation-select");

//FIXME give preCheck a better name, doesn't make much sense.
function preCheck(choice) {
  if (choice.innerHTML !== "") {
    choice.innerHTML = "";
  }
  // if (!document.querySelector(".invalid").classList.contains("hidden")) {
  //   document.querySelector(".invalid").classList.add("hidden");
  // }
}
function invalidInput() {}
//==================================testing=======================================
// var value = e.value;
// const text = selection.options[selection.selectedIndex].text;
// console.log(text);

function testingSelect() {
  // console.log(e.target.value);
  if ("stairs" === selection.value) {
    console.log("you selected stairs");
    showStairs();
  }
  if ("handrails" === selection.value) {
    console.log("you selected handrails");
    showHandrail();
  }
  if ("roof" === selection.value) {
    console.log("you selected roof");
  }
}
//====================================end test===================================
function compareChoice(dimensions) {
  console.log(selection.value); //TODO debugging
  if (selection.value === "stairs") {
    const stair = new Stairs(dimensions);
    preCheck(stair.stairOl);
    // inputLabel.textContent = "Enter overall height";
    stair.stairMath();
  } else if (selection.value === "handrails") {
    const handrail = new Handrail(dimensions);
    preCheck(handrail.picketList);

    // inputLabel.textContent = "Enter length of handrail";
    handrail.calculatePickets();
  } else if (selection.value === "roof") {
    //do this
  }
}
//FIXME this is where I need to test what choice was made
//it is already known by the time user gets here
function handelInput() {
  const checkDimension = lengthInput.value; //can this just be generic input?

  if (checkDimension === "") {
    lengthInput.classList.add("invalid-input");
  } else {
    lengthInput.classList.remove("invalid-input"); //TODO seems there should be a better way to handle this
  }
  if (isNaN(checkDimension)) {
    const usableDimension = breakingInputDown(checkDimension);
    if (isNaN(usableDimension)) {
      document.querySelector(".invalid").classList.remove("hidden");
    } else {
      compareChoice(+usableDimension);
    }
  } else {
    compareChoice(+checkDimension);
  }
}
function showStairs() {
  document.querySelector(".test").textContent = "Enter overall height"; //The h1
  document.querySelector(".handrail-section").classList.add("no-show");
  document.querySelector(".stairs-section").classList.remove("no-show");
  btn.classList.remove("no-show");
  // document.querySelector("details").removeAttribute("open");
}
function showHandrail() {
  document.querySelector(".test").textContent = "Enter length of handrail";
  document.querySelector(".stairs-section").classList.add("no-show");
  document.querySelector(".handrail-section").classList.remove("no-show");
}
function breakingInputDown(dismantling) {
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

class Stairs {
  constructor(dimensionInput, run = 10.5) {
    this.height = dimensionInput;
    this.run = run;
  }
  stairOl = document.querySelector(".step-hypot");

  steps = 0;
  rise = 0;
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
  constructor(length, picketMaxSpace = 5.5, picketThickness = 1.5) {
    this.length = length;
    this.picketMaxSpace = picketMaxSpace;
    this.picketThickness = picketThickness;
  }
  picketList = document.querySelector(".pickets-list");

  pickets = 0;
  picketSpacing = 0;
  calculatePickets() {
    this.pickets = Math.ceil((this.length - this.picketThickness) / this.picketMaxSpace);
    this.picketSpacing = (this.length - this.picketThickness) / this.pickets;
    this.renderPickets();
  }
  renderPickets() {
    console.log(this.pickets);
    let nextPicket = this.picketSpacing;
    //this prints out a list of all the pickets dimensions
    for (let i = 0; i < this.pickets; i++) {
      let picketLI = document.createElement("li");
      picketLI.textContent = nextPicket.toFixed(3);
      nextPicket += this.picketSpacing;
      console.log(picketLI.textContent); //TODO debugging
      this.picketList.append(picketLI);
    }
  }
}
btn.addEventListener("click", handelInput); //TODO I think I need to pass the choice here so it will know
// decidedCalculation.addEventListener("submit", submittedCalculationChoice);
selection.addEventListener("click", testingSelect);
