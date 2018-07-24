import { Component, OnInit, OnDestroy } from '@angular/core';
import { Skill } from '../../Entities/Skill';
import { CountryService } from '../../services/country.service';
import { MessageService } from '../../services/message-service.service';
import { Subscription } from 'rxjs';

import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-addskill',
  templateUrl: './addskill.component.html',
  styleUrls: ['./addskill.component.css']
})
export class AddskillComponent implements OnInit {

  itemList: AngularFireList<Skill>;

  email: string = '';
  uid: any;
  sskills: Skill = new Skill();
  countries: any = [{}];
  constructor(private country: CountryService,
    private _flashMessagesService: FlashMessagesService,
    public router: Router,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {

    this.itemList = db.list("/skills");
    let emailUser = localStorage.getItem("email");
    this.email = emailUser;
    console.log(this.email);

    let idUser = localStorage.getItem("uid");
    this.uid = idUser;
    console.log(this.uid);


  }

  ngOnInit() {

    this.getAllCountries();
  }
  getAllCountries() {
    this.country.getData().subscribe(data => {
      this.countries = data;
      console.log(this.countries);


    });
  }
  onSubmit({ value, valid }: { value: Skill, valid: boolean }) {
    console.log("Done");

    if (!valid) {
      // subscribe to home component messages
      // this._flashMessagesService.show('We are in about component!', { cssClass: 'alert-success' });
      this._flashMessagesService.show('Error Form Data ', { cssClass: 'uk-margin-top uk-text-center uk-alert-danger  uk-alert ', timeout: 5000 });

    } else {
      // save into Firebase
      this.sskills["email"] = this.email;
      this.sskills["uid"] = this.uid;
      this.itemList.push(this.sskills);
      this.resetFields();
      this.router.navigate(['myskill']);

    }

  }
  resetFields() {
    // reset Object Values 
    this.sskills = new Skill();
  }




}
