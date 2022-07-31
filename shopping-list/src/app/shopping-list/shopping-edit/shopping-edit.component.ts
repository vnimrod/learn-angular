import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @Output() newIngredient = new EventEmitter<{
    nameInput: string;
    amountInput: number;
  }>();

  constructor() {}

  ngOnInit(): void {}

  addNewIngredient(
    nameInput: HTMLInputElement,
    amountInput: HTMLInputElement,
    event: Event
  ) {
    event.preventDefault();
    this.newIngredient.emit({
      nameInput: nameInput.value,
      amountInput: Number(amountInput.value),
    });
  }
}
