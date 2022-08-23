import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    private recipeService: RecipeService,
    private router: Router
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
    /* 
    const newRecipe = new Recipe(
      this.recipeEditForm.value['name'],
      this.recipeEditForm.value['description'],
      this.recipeEditForm.value['imagePath'],
      this.recipeEditForm.value['ingredients']
    );
    IS EQUAL TO:
    this.recipeEditForm.value (object )
    
    */
    if (this.editMode) {
      this.recipeService.updateRecipe(
        this.id,
        /*newRecipe*/ this.recipeEditForm.value
      );
    } else {
      this.recipeService.addRecipe(this.recipeEditForm.value);
    }

    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddIngredient() {
    (this.recipeEditForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9[0-9]*$/),
        ]),
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (this.recipeEditForm.get('ingredients') as FormArray).removeAt(index);
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
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9[0-9]*$/),
              ]),
            })
          );
        });
      }
    }

    this.recipeEditForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }
}
