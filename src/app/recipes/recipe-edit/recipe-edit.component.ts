import { Component, OnInit} from '@angular/core';
import {FormGroup,FormControl,FormArray,Validators} from '@angular/forms';
import {ActivatedRoute,Params,Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subscription}from 'rxjs';

import {Recipe} from '../recipe.model';
import * as fromRecipes from '../store/recipes.reducers';
import *as recipesActions from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{
  recipeForm:FormGroup;
  id:number;
  editMode=false;

  constructor(private route:ActivatedRoute,private router:Router,private store:Store<fromRecipes.FeatureState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.editMode=params['id']!=null;
        this.initForm();
      }
    )
  }

  onSubmit(){
    const name=this.recipeForm.get('name').value;
    const imagePath=this.recipeForm.get('imagePath').value;
    const description=this.recipeForm.get('description').value;
    const ingredients=this.recipeForm.get('ingredients').value;
    const recipe=new Recipe(name,imagePath,description,ingredients);
    if(this.editMode){
      this.store.dispatch(new recipesActions.UpdateRecipe({index:this.id,recipe:recipe}));
    }else{
      this.store.dispatch(new recipesActions.AddRecipe(recipe));
    }
    this.router.navigate(['/recipes']);
  }

  onCancel(){
    this.router.navigate(['/recipes']);
  }

  onDeleteIngredient(i:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name:new FormControl(null,Validators.required),
        amount:new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  private initForm(){
    let recipeName='';
    let recipeImagePath='';
    let recipeDescription='';
    let recipeIngredients=new FormArray([]);
    if(this.editMode){
      let recipe;
      this.store.select('recipes').subscribe(
        (recipesState)=>{
          let recipes=recipesState.recipes;
          recipe=recipes[this.id];
          recipeName=recipe.name;
          recipeImagePath=recipe.imagePath;
          recipeDescription=recipe.description;
          if(recipe['ingredients']){
            for(let ingredient of recipe.ingredients){
              recipeIngredients.push(new FormGroup({
                'name':new FormControl(ingredient.name,Validators.required),
                'amount':new FormControl(ingredient.amount,[
                  Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              }));
            }
          }
        }
      );
    }
    this.recipeForm=new FormGroup({
      'name':new FormControl(recipeName,Validators.required),
      'imagePath':new FormControl(recipeImagePath,Validators.required),
      'description':new FormControl(recipeDescription,Validators.required),
      'ingredients':recipeIngredients
    });
  }
}
