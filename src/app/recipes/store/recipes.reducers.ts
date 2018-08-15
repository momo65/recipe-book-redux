import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';
import * as fromApp from '../../store/app.reducers';
import * as recipesActions from './recipes.actions';

export interface FeatureState extends fromApp.AppState{
  recipes:State
}

export interface State{
  recipes:Recipe[]
}

const initialState:State={
  recipes:[
    new Recipe(
      'Tasty Schnitzel'
    ,'A super-tasty Schnitzel - just awesome!'
    ,'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG'
    ,[
      new Ingredient('Meat',1),
      new Ingredient('French fries',20)
    ]
  ),
    new Recipe(
      'Big Fat Burger'
      ,'What else you need to say?'
      ,'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg'
      ,[
        new Ingredient('Buns',2),
        new Ingredient('Meat',3),
        new Ingredient('letuce',2),
        new Ingredient('cheese',3)
      ]
    )
  ]
};

export function recipesReducer(state=initialState,action:recipesActions.RecipesActions){
  switch(action.type){
    case recipesActions.ADD_RECIPE:
      return{
        ...state,recipes:[...state.recipes,action.payload]
      };
    case recipesActions.UPDATE_RECIPE:
      const recipes=[...state.recipes];
      const recipe=recipes[action.payload.index];
      const newRecipe={
        ...recipe,
        ...action.payload.recipe
      };
      recipes[action.payload.index]=newRecipe;
      return{
        ...state,recipes:recipes
      };
    case recipesActions.DELETE_RECIPE:
      const recipesD=[...state.recipes];
      recipesD.splice(action.payload,1);
      return{
        ...state,recipes:recipesD
      };
    case recipesActions.SET_RECIPES:
      const sRecipes=[...action.payload];
      return{
        ...state,recipes:sRecipes
      };
    default:
      return state;
  }
}
