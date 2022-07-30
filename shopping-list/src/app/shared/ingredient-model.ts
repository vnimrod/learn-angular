export class Ingredient {
  // adding accessor (public) before both arguments, and behind the scenes it will create the same effect like below and assign the value auto
  constructor(public name: string, public amount: number) {}
}

// export class Ingredient {
//   public name: string;
//   public amount: number;

//   constructor(name: string, amount: number) {
//     this.name = name
//     this.amount = amount;
//   }
// }
