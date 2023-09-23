"use strict";

const lengthInput = document.querySelector("#dimension-input");
// const picketList = document.querySelector(".pickets-list");
const btn = document.querySelector(".btn");
const decidedCalculation = document.querySelector(".chooseCalculation");
// const handRails = document.querySelector(".handrail-section");
// const stairSection = document.querySelector(".stairs-section");
const inputLabel = document.querySelector("#base-input-label"); //FIXME this needs a different name, not using label

let tempChoice; //FIXME this is a temp global to determine what choice was made
//for now I need it global until I refactor

//FIXME give preCheck a better name, doesn't make much sense.
function preCheck(choice) {
  if (choice.innerHTML !== "") {
    choice.innerHTML = "";
  }
  if (!document.querySelector(".invalid").classList.contains("hidden")) {
    document.querySelector(".invalid").classList.add("hidden");
  }
}

function compareChoice(dimensions) {
  console.log(tempChoice); //TODO debugging
  if (tempChoice === "stairs") {
    const stair = new Stairs(dimensions);
    preCheck(stair.stairOl);
    // inputLabel.textContent = "Enter overall height";
    stair.stairMath();
  } else if (tempChoice === "handrails") {
    const handrail = new Handrail(dimensions);
    preCheck(handrail.picketList);

    // inputLabel.textContent = "Enter length of handrail";
    handrail.calculatePickets();
  } else if (tempChoice === "roof") {
    //do this
  }
}
function inputBreakdown() {
  const checkDimension = lengthInput.value;
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
  console.log(
    `foot is ${foot} inch ${inch} num ${numerator} and den is ${denominator}`
  ); //TODO debugging
  console.log(length);
  return length;
}

function submittedCalculationChoice(e) {
  e.preventDefault();
  tempChoice = new FormData(e.target).get("calculationChoice");
  console.log(tempChoice);
  if (tempChoice === "handrails") {
    //TODO I may need a generic function here. This could get pretty big
    //the more calculation options I add in
    inputLabel.textContent = "Enter length of handrail";
    document.querySelector(".stairs-section").classList.add("no-show");
    document.querySelector(".handrail-section").classList.remove("no-show");
    document.querySelector("details").removeAttribute("open");
  } else if (tempChoice === "stairs") {
    inputLabel.textContent = "Enter overall height";
    document.querySelector(".handrail-section").classList.add("no-show");
    document.querySelector(".stairs-section").classList.remove("no-show");
    document.querySelector("details").removeAttribute("open");
  }
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

  stairMath() {
    let stairAngle = 0;

    this.steps = Math.ceil(this.height / 7.75);
    this.rise = this.height / this.steps;
    this.stepHypot = Math.sqrt(this.run ** 2 + this.rise ** 2);

    console.log(this.stepHypot); //TODO testing
    console.log(this.rise);
    this.renderStairHypot();
  }
  renderStairHypot() {
    document.querySelector(".stair-answer").textContent = this.rise;

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
    this.pickets = Math.ceil(
      (this.length - this.picketThickness) / this.picketMaxSpace
    );
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
btn.addEventListener("click", inputBreakdown);
decidedCalculation.addEventListener("submit", submittedCalculationChoice);
