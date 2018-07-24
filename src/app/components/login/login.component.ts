import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Skill } from '../../Entities/Skill';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  email: string = "";
  password: string = "";

  constructor(private fire: AngularFireAuth,
    private route: Router,
    private _flashMessagesService: FlashMessagesService,
  ) { }

  ngOnInit() {
  }

  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    console.log("Done");

    if (!valid) {
      // subscribe to home component messages
      // this._flashMessagesService.show('We are in about component!', { cssClass: 'alert-success' });
      this._flashMessagesService.show('Error Login Data ! ', { cssClass: 'uk-margin-top uk-text-center uk-alert-danger  uk-alert ', timeout: 5000 });

    } else {

      this.fire.auth.signInWithEmailAndPassword(this.email, this.password).then(user => {

        console.log(user);
        localStorage.setItem("isLoginnedIn", "true");
        localStorage.setItem("email", this.fire.auth.currentUser.email);
        this.fire.authState.subscribe(auth => {
          if (auth) {
            localStorage.setItem("uid", auth.uid);


          }


        })
        this.route.navigate(['addskill']);

      }).catch(error => {
        console.log(error);


      });


    }
  }
}
