import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {ShoppingListComponent} from './shopping-list.component';
import {ShoppingListEditComponent} from './shopping-list-edit/shopping-list-edit.component';

@NgModule({
  declarations:[
    ShoppingListComponent,
    ShoppingListEditComponent
  ],
  imports:[
    FormsModule,
    CommonModule
  ]
})
export class ShoppingListModule{}
