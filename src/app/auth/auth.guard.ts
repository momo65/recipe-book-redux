import {Injectable} from '@angular/core';
import {CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import * as fromRecipes from '../recipes/store/recipes.reducers';

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private store:Store<fromRecipes.FeatureState>){}

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean>{
    return this.store.select('auth').pipe(map(
      (authState)=>{
        return authState.authenticated;
      }
    ));
  }
}
