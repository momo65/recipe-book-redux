import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';

import * as fromRecipes from '../../recipes/store/recipes.reducers';
import * as authActions from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private store:Store<fromRecipes.FeatureState>) { }

  ngOnInit() {
  }

  onSignup(f:NgForm){
    this.store.dispatch(new authActions.DoSignup({email:f.value.email,password:f.value.password}));
    f.setValue({
      email:f.value.email,
      password:null
    });
  }

}
