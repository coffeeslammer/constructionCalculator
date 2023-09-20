"use strict";

const input = document.querySelector("input");
const picketList = document.querySelector(".pickets-list");
const btn = document.querySelector(".btn");

// console.log(picketList);
// let picketThickness = 1.5;
// let picketSpaceBetween = 4;
// let pickets = Math.ceil((+input.value - 1.5) / 5.5);
// let picketSpacing = (+input.value - 1.5) / pickets;
// let nextPicket = picketSpacing;
// for (let i = 0; i < pickets; i++) {
//   let picketLI = document.createElement("li");
//   picketLI.textContent = nextPicket.toFixed(3);
//   nextPicket += picketSpacing;
//   console.log(picketLI.textContent);
//   picketList.append(picketLI);
// }
// console.log(Math.ceil(pickets));
function calculatePickets(dimension) {
  console.log(dimension);
  let pickets = Math.ceil((dimension - 1.5) / 5.5);
  renderPickets((dimension - 1.5) / pickets, pickets);
  // console.log(picketSpacing);
}
function renderPickets(spacing, picket) {
  let nextPicket = spacing;
  for (let i = 0; i < picket; i++) {
    let picketLI = document.createElement("li");
    picketLI.textContent = nextPicket.toFixed(3);
    nextPicket += spacing;
    console.log(picketLI.textContent);
    picketList.append(picketLI);
  }
}

function evaluateInput() {
  const picketDimension = input.value;
  if (isNaN(picketDimension)) {
    console.log("is not a number");
    const railLength = breakingInputDown(picketDimension);
    if (isNaN(railLength)) {
      //Unhide invalid in HTML
    } else {
      calculatePickets(railLength);
    }
    //Go to this place
    //some class to do the work
  } else {
    //Checks to make sure there isn't a list already rendered
    //If there is then this clears it
    if (picketList.innerHTML !== "") {
      picketList.innerHTML = "";
    }
    calculatePickets(+picketDimension);
    //Go here and do the math
    //maybe another class to do the job
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
  // regex = /\d;
  // console.log(picketDimension.match(/\D/));
  // picketDimension.match("/D");
  // // console.log(test.indexOf("'"));
  // if (picketDimension.indexOf("'") !== -1) {
  //   // console.log("do this");
  //   const foot = picketDimension.slice(0, picketDimension.indexOf("'"));
  //   console.log(picketDimension);
  // } else {
  //   console.log("did this instead");
  // }
  // let pickets = Math.ceil((+input.value - 1.5) / 5.5);
}

btn.addEventListener("click", evaluateInput);

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
