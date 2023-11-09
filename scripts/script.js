import { Stairs } from "./stairs.js";
import { Handrail } from "./handrail.js";
import { Input } from "./input.js";
// ("use strict");

const lengthInput = document.querySelector(".dimension-input");
const btn = document.querySelector(".calculate-btn");
const container = document.querySelector(".option-container");

function preHandler() {
  const number = input.validInputCheck(lengthInput);
  if (document.title === "Stairs") {
    stair.stairHeight = number;
    stair.stairMath();
  } else if (document.title === "Handrail") {
    handrail.getDimension(number);
    handrail.calculatePickets();
  }
}
//   emptyInputErrorCheck(elementInput) {
//     if (elementInput.value === "") {
//       elementInput.classList.add("invalid-input");
//     } else if (elementInput.classList.contains("invalid-input")) {
//       elementInput.classList.remove("invalid-input");
//     }
//   }

//   setError(elementInput) {
//     elementInput.classList.add("invalid-input");
//   }
//   clearError(elementInput) {
//     elementInput.classList.remove("invalid-input");
//   }
function toggle(e) {
  container.classList.toggle("active");
}
//----------------------------->Start of Code<----------------------------------------------------------------
const input = new Input();
const stair = new Stairs();
const handrail = new Handrail();

btn.addEventListener("click", preHandler);

container.addEventListener("click", toggle);
