import {Ingredient} from '../../shared/ingredient.model';
import * as slActions from './shopping-list.actions';

export interface State{
  ingredients:Ingredient[],
  indexUpdate:number
}

const initialState:State={
  ingredients:[
    new Ingredient('Apples',5),
    new Ingredient('Tomatoes',10)
  ],
  indexUpdate:-1
};

export function shoppingListReducer(state=initialState,action:slActions.SLActions){
  switch(action.type){
    case slActions.ADD_INGREDIENT:
      return{
        ...state,ingredients:[...state.ingredients,action.payload]
      };
    case slActions.ADD_INGREDIENTS:
      return{
        ...state,ingredients:[...state.ingredients,...action.payload]
      };
    case slActions.UPDATE_INGREDIENT:
      let ingredients=[...state.ingredients];
      const ingredient=ingredients[state.indexUpdate];
      const newIngredient={
        ...ingredient,
        ...action.payload
      };
      ingredients[state.indexUpdate]=newIngredient;
      return{
        ...state,ingredients:ingredients,indexUpdate:-1
      };
    case slActions.DELETE_INGREDIENT:
      let ingredientsD=[...state.ingredients];
      ingredientsD.splice(state.indexUpdate,1);
      return{
        ...state,ingredients:ingredientsD,indexUpdate:-1
      };
    case slActions.EDIT_INGREDIENT:
      return{
        ...state,indexUpdate:action.payload
      }
    default:
      return state;
  }
}
