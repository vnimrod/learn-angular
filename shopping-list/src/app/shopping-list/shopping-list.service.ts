// import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient-model';

export class ShoppingListService {
  // ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredientsChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 5),
  ];

  getIngredients() {
    return this.ingredients.slice();
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
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
