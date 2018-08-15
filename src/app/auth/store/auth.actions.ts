import {Action} from '@ngrx/store';

import {Ingredient} from '../../shared/ingredient.model';

export const SIGNUP="SIGNUP";
export const SIGNIN="SIGNIN";
export const SET_TOKEN="SET_TOKEN";
export const LOGOUT="LOGOUT";
export const DO_SIGNUP="DO_SIGNUP";
export const DO_SIGNIN="DO_SIGNIN";
export const DO_LOGOUT="DO_LOGOUT";

export class Signup implements Action{
  readonly type=SIGNUP;
}

export class Signin implements Action{
  readonly type=SIGNIN;
}

export class SetToken implements Action{
  readonly type=SET_TOKEN;

  constructor(public payload:string){}
}

export class Logout implements Action{
  readonly type=LOGOUT;
}

export class DoSignup implements Action{
  readonly type=DO_SIGNUP;

  constructor(public payload:{email:string,password:string}){}
}

export class DoSignin implements Action{
  readonly type=DO_SIGNIN;

  constructor(public payload:{email:string,password:string}){}
}

export class DoLogout implements Action{
  readonly type=DO_LOGOUT;
}

export type AuthActions=Signup|Signin|SetToken|Logout|DoSignup|DoSignin|DoLogout;
