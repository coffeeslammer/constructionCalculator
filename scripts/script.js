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
function breakDown() {
  const test = input.value;
  console.log(test.indexOf("'"));
  if (test.indexOf("'") !== -1) {
    console.log("do this");
    const foot = test.slice(0, test.indexOf("'"));
    console.log(test);
  } else {
    console.log("did this instead");
  }
  // let pickets = Math.ceil((+input.value - 1.5) / 5.5);
}

btn.addEventListener("click", breakDown);

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
