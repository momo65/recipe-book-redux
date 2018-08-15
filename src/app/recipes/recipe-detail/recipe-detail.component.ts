import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';

import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';
import * as fromRecipes from '../store/recipes.reducers';
import * as recipesActions from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipesState$:Observable<{recipes:Recipe[]}>;
  id:number;

  constructor(private router:Router,private route:ActivatedRoute,
    private store:Store<fromRecipes.FeatureState>) { }

  ngOnInit() {
    this.recipesState$=this.store.select('recipes');
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
      }
    );
  }

  onAddToShoppingList(){
    this.store.dispatch(new recipesActions.DoAddShoppingList(this.id));
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route});
  }

  onDeleteRecipe(){
    this.store.select('auth').pipe(take(1)).subscribe(
      (authState)=>{
        if(authState.authenticated){
          this.store.dispatch(new recipesActions.DeleteRecipe(this.id));
          this.router.navigate(['/recipes']);
        }
      }
    );
  }
}
