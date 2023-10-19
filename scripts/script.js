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
    this.handelDimensionInput = this.handelDimensionInput.bind(this);
  }
  emptyInputErrorCheck(elementInput) {
    if (elementInput.value === "") {
      elementInput.classList.add("invalid-input");
    } else if (elementInput.classList.contains("invalid-input")) {
      elementInput.classList.remove("invalid-input");
    }
  }
  setError(elementInput) {
    elementInput.classList.add("invalid-input");
  }
  clearError(elementInput) {
    elementInput.classList.remove("invalid-input");
  }
  improperCharCheck(dimension) {
    console.log(typeof dimension);
    dimension = dimension.replace(/(')|(\")|(\/)/g, "");
    return isNaN(dimension);
  }
  handelDimensionInput(elementInput) {
    const checkDimension = elementInput.value;
    this.emptyInputErrorCheck(elementInput);
    // let usableDimension;
    //This is if using foot (') and/or (") for entering dimension
    if (isNaN(checkDimension)) {
      if (this.improperCharCheck(checkDimension)) {
        // usableDimension = this.breakingInputDown(checkDimension);
        //}
        // if (isNaN(usableDimension)) {
        // if (isNaN(usableDimension))
        //{
        console.log("there is invalid input here");
        return -1;
        // document.querySelector(".invalid").classList.remove("hidden"); //BUG this doesn't exist
      } else {
        const usableDimension = this.breakingInputDown(checkDimension);
        // this.compareInputChoice(+usableDimension);
        if (isNaN(usableDimension)) {
          console.log("There seems to be an error");
          return -1;
        } else {
          return +usableDimension;
        }
      }
    } else {
      return +checkDimension;
      // this.compareInputChoice(+checkDimension);
    }
  }
  //FIXME this now is checking to many choices. I need to it to just check which section to go to
  //then have a way to check all options for that section only
  compareInputChoice(dimensions) {
    if (selection.value === "stairs") {
      // if (document.querySelector("#chbx-run").checked) {
      //   console.log(+document.querySelector("#stair-run-input").value);
      //   //FIXME this opens a whole can of worms for more error checking
      //   //there could be a dozen inputs that each need to be error checked
      //   stair.stairRun = +document.querySelector("#stair-run-input").value;
      // }
      stair.checkOptions();
      stair.stairHeight = dimensions;
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
  // getDimension(dimensionInput) {
  //   this.#height = dimensionInput;
  // }
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
  //FIXME this is very vague for a method name. Doesn't say much of what it is doing.
  stairMath() {
    this.#steps = Math.ceil(this.#height / this.#maxRiseHeight);
    this.#rise = this.#height / this.#steps;
    this.#stepHypot = Math.sqrt(this.#run ** 2 + this.#rise ** 2);
    this.#angle = +((Math.atan2(this.#rise, this.#run) * 180) / Math.PI).toFixed(3);
    this.#opening = this.#headroom / Math.tan(Math.atan2(this.#rise, this.#run));

    console.log(this.#stepHypot); //TODO testing
    console.log(this.#rise);
    console.log(this.#angle);
    this.renderStairHypot();
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
    //TODO this I think should be a render class
    // document.querySelector(".stair-answer").innerHTML = `Your rise is ${this.#rise.toFixed(
    //   3
    // )}<br>Steps ${this.#steps}<br>Angle ${this.#angle.toFixed(
    //   3
    // )}<br>Step hypot ${this.#stepHypot.toFixed(3)} <br>Min opening is ${this.#opening.toFixed(
    //   3
    // )}<br>Stair length is ${this.#run * this.#steps}`;
    document.querySelector(".stair-answer").innerHTML = `<ul>
    <li>Your rise is ${this.#rise.toFixed(3)}</li>
        <li>Steps ${this.#steps}</li>
        <li>Angle ${this.#angle.toFixed(3)}</li>
        <li>Step hypot ${this.#stepHypot.toFixed(3)}</li>
        <li>Min opening is ${this.#opening.toFixed(3)}</li>
        <li> Stair length is ${this.#run * this.#steps}</li></ul>`;

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

btn.addEventListener("click", () => {
  let check = 0;
  check = input.handelDimensionInput(lengthInput);
  if (check === -1) {
    console.log("Do invalid stuff here");
    input.setError(lengthInput);
  } else {
    if (lengthInput.classList.contains("invalid-input")) {
      lengthInput.classList.remove("invalid-input");
    }
    input.compareInputChoice(input.handelDimensionInput(lengthInput)); //BUG need error check to not return
  }
});

selection.addEventListener("click", input.choiceSelected);
