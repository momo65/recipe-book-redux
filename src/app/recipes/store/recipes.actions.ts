import {Action} from '@ngrx/store';

import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';

export const ADD_RECIPE="ADD_RECIPE";
export const UPDATE_RECIPE="UPDATE_RECIPE";
export const DELETE_RECIPE="DELETE_RECIPE";
export const SET_RECIPES="SET_RECIPES";
export const DO_ADD_SHOPPING_LIST="DO_ADD_SHOPPING_LIST";
export const DO_STORE_RECIPES="DO_STORE_RECIPES";
export const DO_GET_RECIPES="DO_GET_RECIPES";

export class AddRecipe implements Action{
  readonly type="ADD_RECIPE";

  constructor(public payload:Recipe){}
}

export class UpdateRecipe implements Action{
  readonly type="UPDATE_RECIPE";

  constructor(public payload:{index:number,recipe:Recipe}){}
}

export class DeleteRecipe implements Action{
  readonly type="DELETE_RECIPE";

  constructor(public payload:number){}
}

export class SetRecipes implements Action{
  readonly type="SET_RECIPES";

  constructor(public payload:Recipe[]){}
}

export class DoAddShoppingList implements Action{
  readonly type="DO_ADD_SHOPPING_LIST";

  constructor(public payload:number){}
}

export class DoStoreRecipes implements Action{
  readonly type="DO_STORE_RECIPES";
}

export class DoGetRecipes implements Action{
  readonly type="DO_GET_RECIPES";
}

export type RecipesActions=AddRecipe|UpdateRecipe|DeleteRecipe|SetRecipes|DoAddShoppingList|DoStoreRecipes|DoGetRecipes;
