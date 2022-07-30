import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://live.staticflickr.com/5555/14778735501_bfb1d56ae9_b.jpg'
    ),
    new Recipe(
      'A Test Recipe2',
      'This is simply a test2',
      'https://live.staticflickr.com/5555/14778735501_bfb1d56ae9_b.jpg'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}

  onRecipeSelcted(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
