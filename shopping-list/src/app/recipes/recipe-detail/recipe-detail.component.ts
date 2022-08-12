import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe | undefined;
  id!: number;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });

    // we can remove the id above and use only navigation:
    // ['../'] will to /recipes -> then we add id -> then /edit
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route })
  }

  addToShoppingList() {
    // this.recipeService.addNewIngredientToShoppingList(
    //   this.recipe.ingredients
    // );
  }
}
