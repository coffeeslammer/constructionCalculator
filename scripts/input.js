export class Input {
  setError(elementInput) {
    elementInput.classList.add("invalid-input");
  }

  improperCharCheck(dimension) {
    dimension = dimension.replace(/(')|(\")|(\/)/g, "");
    return isNaN(dimension);
  }

  validInputCheck(elementInput) {
    if (elementInput.value === "") {
      setError(elementInput);
    } else if (this.improperCharCheck(elementInput.value)) {
      const temp = this.breakingInputDown(elementInput.value);
      if (!isNaN(temp)) {
        return temp;
      }
    } else if (!isNaN(elementInput.value)) {
      console.log(`${elementInput.value} here`);
      return elementInput.value;
    } else {
      this.setError(elementInput);
    }
  }

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
