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
    //Go to this place
    //some class to do the work
  } else {
    console.log("is a number");
    calculatePickets(+picketDimension);
    //Go here and do the math
    //maybe another class to do the job
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
