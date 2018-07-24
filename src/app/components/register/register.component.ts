import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Users } from '../../Entities/Users';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  itemList: AngularFireList<Users>;

  email: string = "";
  password: string = "";

  users: Users = new Users();

  constructor(private fire: AngularFireAuth,
    private route: Router,
    private _flashMessagesService: FlashMessagesService, private db: AngularFireDatabase
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

      this.fire.auth.createUserWithEmailAndPassword(this.email, this.password).then(user => {

        console.log("user is : " + user.user.uid);
        // save into database users 
        this.itemList = this.db.list("/users");

        this.users.email = this.email;
        this.users.uid = user.user.uid;
        this.itemList.push(this.users);


        this.route.navigate(['home']);

      }).catch(error => {
        console.log(error);


      });


    }
  }
}
