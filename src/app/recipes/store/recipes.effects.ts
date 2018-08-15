import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Actions,Effect} from '@ngrx/effects';
import {map,withLatestFrom,switchMap} from 'rxjs/operators';
import {Store} from '@ngrx/store';

import * as recipesActions from './recipes.actions';
import * as slActions from '../../shopping-list/store/shopping-list.actions';
import * as fromRecipes from './recipes.reducers';
import {Recipe} from '../recipe.model';

@Injectable()
export class RecipesEffects{
  constructor(private actions$:Actions,private httpClient:HttpClient,
    private store:Store<fromRecipes.FeatureState>){}

  @Effect()
  addToSL$=this.actions$.ofType(recipesActions.DO_ADD_SHOPPING_LIST).pipe(withLatestFrom(
    this.store.select('recipes')
  ),map(
    ([action,recipesState])=>{
      const recipes=recipesState.recipes;
      const ingredients=recipes[action.payload].ingredients;
      return new slActions.AddIngredients(ingredients);
    }
  ));

  @Effect({dispatch:false})
  storeRecipes$=this.actions$.ofType(recipesActions.DO_STORE_RECIPES).pipe(withLatestFrom(
    this.store.select('recipes')
  ),switchMap(
    ([action,recipesState])=>{
      return this.httpClient.put('https://new-ng-recipe-57c34.firebaseio.com/recipes.json',recipesState.recipes);
    }
  ));

  @Effect()
  getRecipes$=this.actions$.ofType(recipesActions.DO_GET_RECIPES).pipe(switchMap(
    ()=>{
      return this.httpClient.get<Recipe[]>('https://new-ng-recipe-57c34.firebaseio.com/recipes.json');
    }
  ),map(
    (recipes)=>{
      let recipesV=recipes;
      for(let recipe of recipesV){
        if(!recipe['ingredients']){
          recipe['ingredients']=null;
        }
      }
      return recipesV;
    }
  ),map(
    (recipes)=>{
      return new recipesActions.SetRecipes(recipes);
    }
  ));
}
