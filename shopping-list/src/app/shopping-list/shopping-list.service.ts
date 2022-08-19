// import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient-model';

export class ShoppingListService {
  // ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 5),
  ];

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  onIngredientChange() {
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addNewIngredient(nameInput: string, amountInput: number) {
    this.ingredients.push(new Ingredient(nameInput, amountInput));

    // Using of emit here:
    /* Because on getIngredients() we returning a new copy of our ingredients, and when we add a new ingredient to our array, we add it
       to the original array and we only have access to the copy (different addresses in memory).

       The solution is: to add new eventEmitter, then emit it from here with a new copy.
       then on the component (on shopping-list), subscribe to it.

       So in final we have (on shopping-list):
       1. get for our first initial copy.
       2. after adding a new ingredient, emit a new copy with the new ingredient, then subscribe to it.

    */
    this.onIngredientChange();
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.onIngredientChange();
  }

  updateIngredient(index: number, nameInput: string, amountInput: number) {
    this.ingredients[index] = new Ingredient(nameInput, amountInput);
    this.onIngredientChange();
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.onIngredientChange();
  }
}
