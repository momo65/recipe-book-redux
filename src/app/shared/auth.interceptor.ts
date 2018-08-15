import {Injectable} from '@angular/core';
import {HttpInterceptor,HttpRequest,HttpHandler,HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {take,switchMap} from 'rxjs/operators';

import * as fromRecipes from '../recipes/store/recipes.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private store:Store<fromRecipes.FeatureState>){}

  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    return this.store.select('auth').pipe(take(1),switchMap(
      (authState)=>{
        const copiedReq=req.clone({params:req.params.set('auth',authState.token)});
        return (next.handle(copiedReq));
      }
    ));
  }
}
