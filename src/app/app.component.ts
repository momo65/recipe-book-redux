import { Component,OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyBJdAS32N--WCLoqDUygpODZScR39INVrU",
      authDomain: "new-ng-recipe-57c34.firebaseapp.com"
    });
  }
}
