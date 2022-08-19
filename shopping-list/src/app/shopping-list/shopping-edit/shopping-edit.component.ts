import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient-model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  shoppingEditForm!: FormGroup;
  editIngredientIndex!: number;
  editedItem!: Ingredient;
  editMode = false;

  constructor(private ShoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingEditForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
    });

    this.ShoppingListService.startedEditing.subscribe(
      (ingredientIndex: number) => {
        this.editIngredientIndex = ingredientIndex;
        this.editedItem =
          this.ShoppingListService.getIngredient(ingredientIndex);
        this.editMode = true;
        this.updateInputsWithSelectedItemData();
      }
    );
  }

  get nameControl(): FormControl {
    return this.shoppingEditForm.get('name') as FormControl;
  }

  get amountControl(): FormControl {
    return this.shoppingEditForm.get('amount') as FormControl;
  }

  addNewIngredient() {
    if (this.editMode) {
      this.ShoppingListService.updateIngredient(
        this.editIngredientIndex,
        this.nameControl.value,
        this.amountControl.value
      );
    } else {
      this.ShoppingListService.addNewIngredient(
        this.nameControl.value,
        this.amountControl.value
      );
    }

    this.shoppingEditForm.reset();
  }

  updateInputsWithSelectedItemData() {
    this.shoppingEditForm.setValue({
      name: this.editedItem.name,
      amount: this.editedItem.amount,
    });
  }

  onClear() {
    this.shoppingEditForm.reset();
  }

  onDelete() {
    this.onClear();
    this.ShoppingListService.deleteIngredient(this.editIngredientIndex);
  }

  ngOnDestroy(): void {
    this.ShoppingListService.startedEditing.unsubscribe();
  }
}
