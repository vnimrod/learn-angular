import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  recipeEditForm!: FormGroup;
  id!: number;
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  get controls() {
    return (this.recipeEditForm.get('ingredients') as FormArray).controls;
  }

  onSubmit() {
    console.log(this.recipeEditForm);
  }

  onAddIngredient() {
    (this.recipeEditForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(),
        amount: new FormControl(),
      })
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([] as FormGroup[]);

    // we use edit mode here because we want to save the data of the recipe when we click on it(will be on inputs) and then edit
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe?.ingredients) {
        recipe.ingredients.forEach((ingredient) => {
          // we push here new FormGroup because that every ingredient have 2 form control inputs
          return recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name),
              amount: new FormControl(ingredient.amount),
            })
          );
        });
      }
    }

    this.recipeEditForm = new FormGroup({
      name: new FormControl(recipeName),
      imagePath: new FormControl(recipeImagePath),
      description: new FormControl(recipeDescription),
      ingredients: recipeIngredients,
    });
  }
}
