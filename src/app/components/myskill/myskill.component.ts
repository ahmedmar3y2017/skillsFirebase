import { Component, OnInit } from '@angular/core';

import { MessageService } from '../../services/message-service.service';
import 'rxjs';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Skill } from '../../Entities/Skill';
import { Router } from '@angular/router';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-myskill',
  templateUrl: './myskill.component.html',
  styleUrls: ['./myskill.component.css']
})
export class MyskillComponent implements OnInit {
  itemList: AngularFireList<Skill> = null;


  skills: Skill[] = [];
  countries: any = [{}];

  uid: any;


  constructor(
    private _flashMessagesService: FlashMessagesService,
    public router: Router,
    private db: AngularFireDatabase,
    private country: CountryService,
  ) {
    console.log("init");
    this.uid = localStorage.getItem("uid");
    // get list Of Firebase
    this.itemList = db.list("/skills", ref => ref.orderByChild('uid').equalTo(this.uid));
    this.itemList.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        let v = action.payload.toJSON();
        v["$key"] = action.key;
        this.skills.push(v as Skill);
        // console.log(this.skills);

      });
    });
    console.log(this.skills);


  }

  ngOnInit() {
    this.getAllCountries();

  }

  deleteAction(id) {

    console.log("Delete");

    console.log(id);

    this.itemList.remove(id);
    this.skills = [];



  }
  updateAction($event, item) {
    console.log("Update");

    console.log(event);
    console.log(item.$key);


    // this.router.navigate(['update-skill/' + item.$key]);


  }

  onSubmit({ value, valid }: { value: Skill, valid: boolean }) {
    console.log("Done");
    console.log("Key is : " + value['key']);

    if (!valid) {
      // subscribe to home component messages
      // this._flashMessagesService.show('We are in about component!', { cssClass: 'alert-success' });
      console.log("Invalid");

      this._flashMessagesService.show('Error Form Data ', { cssClass: 'uk-margin-top uk-text-center uk-alert-danger  uk-alert ', timeout: 5000 });

    } else {
      console.log(value);
      console.log("Key is : " + value['key']);
      // this.skills = [];
      this.itemList.set(value['key'], value);
      this.skills = [];


    }
  }
  getAllCountries() {
    this.country.getData().subscribe(data => {
      this.countries = data;
      console.log(this.countries);


    });
  }


}
