import { Stairs } from "./stairs.js";
import { Handrail } from "./handrail.js";
// ("use strict");

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
//FIXME I think I need to refactor Input class. I tried to separate it into a separate file but was getting errors.
//I think it has to do with using the DOM
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

selection.addEventListener("input", input.choiceSelected);
