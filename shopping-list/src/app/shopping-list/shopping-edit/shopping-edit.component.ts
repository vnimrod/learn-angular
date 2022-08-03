import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  constructor(private ShoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  addNewIngredient(
    nameInput: HTMLInputElement,
    amountInput: HTMLInputElement,
    event: Event
  ) {
    event.preventDefault();
    this.ShoppingListService.addNewIngredient(
      nameInput.value,
      Number(amountInput.value)
    );
  }
}
