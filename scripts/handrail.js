export class Handrail {
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
