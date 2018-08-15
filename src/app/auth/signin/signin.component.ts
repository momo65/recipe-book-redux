import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';

import * as fromRecipes from '../../recipes/store/recipes.reducers';
import * as authActions from '../store/auth.actions';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private store:Store<fromRecipes.FeatureState>) { }

  ngOnInit() {
  }

  onSignin(f:NgForm){
    this.store.dispatch(new authActions.DoSignin({email:f.value.email,password:f.value.password}));
    f.setValue({
      email:f.value.email,
      password:null
    });
  }
}
