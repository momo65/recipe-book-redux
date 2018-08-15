import { Component, OnInit,ViewChild,OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable,Subscription} from 'rxjs';
import {take} from 'rxjs/operators';

import * as fromRecipes from '../../recipes/store/recipes.reducers';
import * as fromSL from '../store/shopping-list.reducers';
import * as slActions from '../store/shopping-list.actions';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit,OnDestroy{
  @ViewChild('f') slForm:NgForm;
  editMode=false;
  id:number;
  slState:Observable<fromSL.State>;
  subscription:Subscription;

  constructor(private store:Store<fromRecipes.FeatureState>) { }

  ngOnInit() {
    this.subscription=this.store.select('shoppingList').subscribe(
      (slState:fromSL.State)=>{
        this.id=slState.indexUpdate;
        this.editMode=(this.id!=-1);
        if(this.editMode){
          const ingredients=slState.ingredients;
          const ingredient=ingredients[this.id];
          this.slForm.setValue({
            name:ingredient.name,
            amount:ingredient.amount
          });
        }
      }
    );
  }

  onDelete(){
    this.store.select('auth').pipe(take(1)).subscribe(
      (authState)=>{
        if(authState.authenticated){
          this.store.dispatch(new slActions.DeleteIngredient());
          this.slForm.setValue({
            name:null,
            amount:null
          });
        }
      }
    );
  }

  onClear(){
    this.slForm.setValue({
      name:null,
      amount:null
    });
    this.store.dispatch(new slActions.EditIngredient(-1));
  }

  onSubmit(f:NgForm){
    this.store.select('auth').pipe(take(1)).subscribe(
      (authState)=>{
        if(authState.authenticated){
          const ingredient=new Ingredient(f.value.name,+f.value.amount);
          if(this.editMode){
            this.store.dispatch(new slActions.UpdateIngredient(ingredient));
            this.slForm.setValue({
              name:null,
              amount:null
            });
          }else{
            this.store.dispatch(new slActions.AddIngredient(ingredient));
            this.slForm.setValue({
              name:null,
              amount:null
            });
          }
        }
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.store.dispatch(new slActions.EditIngredient(-1));
  }
}
