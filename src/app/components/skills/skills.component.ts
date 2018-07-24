import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message-service.service';
import 'rxjs';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Skill } from '../../Entities/Skill';
import { Router } from '@angular/router';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  itemList: AngularFireList<Skill> = null;


  skills: Skill[] = [];
  countries: any = [{}];

  constructor(
    private _flashMessagesService: FlashMessagesService,
    public router: Router,
    private db: AngularFireDatabase,
    private country: CountryService,
  ) {
    console.log("init");

    // get list Of Firebase
    this.itemList = db.list("/skills");
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

  getAllCountries() {
    this.country.getData().subscribe(data => {
      this.countries = data;
      console.log(this.countries);


    });
  }


  buttonDetailsClick(skillId) {

    console.log(skillId);

    // navigate to details 

    this.router.navigate(["details/" + skillId]);



  }

}
