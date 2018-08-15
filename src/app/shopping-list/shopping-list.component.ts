import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {Ingredient} from '../shared/ingredient.model';
import * as fromRecipes from '../recipes/store/recipes.reducers';
import * as slActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  slState$:Observable<{ingredients:Ingredient[]}>;

  constructor(private store:Store<fromRecipes.FeatureState>) {}

  ngOnInit() {
    this.slState$=this.store.select('shoppingList');
  }

  onEditItem(i:number){
    this.store.dispatch(new slActions.EditIngredient(i));
  }
}
