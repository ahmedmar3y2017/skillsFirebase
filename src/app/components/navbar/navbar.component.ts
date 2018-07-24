import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Observable<firebase.User>;

  isLoginnedIn: Boolean = false;
  email: String = "";


  constructor(private afAuth: AngularFireAuth,
    private route: Router) {

    this.user = afAuth.authState;

    let status = localStorage.getItem("isLoginnedIn");
    console.log(status);

    if (status === 'true') {
      this.isLoginnedIn = true;
    } else {
      this.isLoginnedIn = false;
    }



    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {

    //     this.isLoginnedIn = true;

    //   } else {
    //     this.isLoginnedIn = false;
    //     this.route.navigate(['login']);

    //   }


    // });


  }

  ngOnInit() {
  }

  logOut() {
    this.afAuth.auth.signOut();
    this.isLoginnedIn = false;
    localStorage.setItem("isLoginnedIn", "false");
    this.route.navigate(['login']);

  }

}
