import {ActionReducerMap} from '@ngrx/store';

import * as fromSL from '../shopping-list/store/shopping-list.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

export interface AppState{
  shoppingList:fromSL.State,
  auth:fromAuth.State
}

export const reducers:ActionReducerMap<AppState>={
  shoppingList:fromSL.shoppingListReducer,
  auth:fromAuth.authReducer
};
