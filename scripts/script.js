"use strict";

const lengthInput = document.querySelector("#dimension-input");
// const picketList = document.querySelector(".pickets-list");
const btn = document.querySelector(".btn");
const form = document.querySelector(".form-rate");
const handRails = document.querySelector(".handrail-section");
const stairSection = document.querySelector(".stairs-section");
const inputLabel = document.querySelector("#base-input-label"); //FIXME this needs a different name, not using label

let tempChoice; //FIXME this is a temp global to determine what choice was made
//for now I need it global until I refactor

// function calculatePickets(dimension) {
//   let picketMaxSpace = 5.5;
//   let picketThickness = 1.5;

//   let pickets = Math.ceil((dimension - picketThickness) / picketMaxSpace);
//   renderPickets((dimension - picketThickness) / pickets, pickets);
// }
//FIXME give preCheck a better name, doesn't make much sense.
function preCheck(choice) {
  if (choice.innerHTML !== "") {
    choice.innerHTML = "";
  }
  if (!document.querySelector(".invalid").classList.contains("hidden")) {
    document.querySelector(".invalid").classList.add("hidden");
  }
}
// function renderPickets(spacing, picket) {
//   let nextPicket = spacing;
//   for (let i = 0; i < picket; i++) {
//     let picketLI = document.createElement("li");
//     picketLI.textContent = nextPicket.toFixed(3);
//     nextPicket += spacing;
//     console.log(picketLI.textContent);
//     picketList.append(picketLI);
//   }
// }
function radioChoice(dimensions) {
  console.log(tempChoice); //TODO debugging
  if (tempChoice === "stairs") {
    const stair = new Stairs(dimensions);
    preCheck(stair.stairOl);
    inputLabel.textContent = "Enter overall height";
    stair.stairMath();
  } else if (tempChoice === "handRail") {
    const handrail = new Handrail(dimensions);
    preCheck(handrail.picketList);

    inputLabel.textContent = "Enter length of handrail";
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
      radioChoice(+usableDimension);
    }
  } else {
    radioChoice(+checkDimension);
  }
}
//FIXME this needs to be set up to not care what choice I do just break input down to usable numbers
function evaluateInput() {
  const picketDimension = lengthInput.value;
  console.log(picketDimension);
  if (isNaN(picketDimension)) {
    console.log("is not a number");
    const railLength = breakingInputDown(picketDimension);
    if (isNaN(railLength)) {
      document.querySelector(".invalid").classList.remove("hidden");
    } else {
      if (picketList.innerHTML !== "") {
        picketList.innerHTML = "";
      }
      if (!document.querySelector(".invalid").classList.contains("hidden")) {
        document.querySelector(".invalid").classList.add("hidden");
      }
      calculatePickets(railLength);
    }
  } else {
    //Checks to make sure there isn't a list already rendered
    //If there is then this clears it
    if (picketList.innerHTML !== "") {
      picketList.innerHTML = "";
    }
    const stair = new Stairs(+picketDimension); //TODO testing
    stair.stairMath(+picketDimension);
    calculatePickets(+picketDimension);
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
  );
  console.log(length);
  return length;
}

function submitRating(e) {
  e.preventDefault();
  tempChoice = new FormData(e.target).get("rating");
  console.log(tempChoice);
  if (tempChoice === "handRail") {
    handRails.classList.remove("no-show");
    document.querySelector("details").removeAttribute("open");
  } else if (tempChoice === "stairs") {
    stairSection.classList.remove("no-show");
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
form.addEventListener("submit", submitRating);

//===============Future Idea for drawing========================
// function draw() {
//   const canvas = document.querySelector("#canvas");

//   if (!canvas.getContext) {
//     return;
//   }
//   const ctx = canvas.getContext("2d");

//   // set line stroke and line width
//   ctx.strokeStyle = "red";
//   ctx.lineWidth = 3;

//   // draw a red line
//   ctx.beginPath();
//   ctx.moveTo(100, 500);
//   ctx.lineTo(500, 300);
//   ctx.stroke();
// }
// draw();
