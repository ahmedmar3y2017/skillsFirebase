import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Skill } from '../../Entities/Skill';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id: any;
  skillOne: Skill = new Skill();
  constructor(private router: Router,
    private route: ActivatedRoute,
    private db: AngularFireDatabase) {
    // get id parameter
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);

  }

  ngOnInit() {
    this.db.object('/skills/' + this.id).snapshotChanges().subscribe(action => {

      let v = action.payload.toJSON();
      v["$key"] = action.key;
      // if (action.email != undefined) {
      //   v["email"] = action.email;

      // }
      this.skillOne = v as Skill;
      // this.skills.push(v as Skill);
      console.log(this.skillOne);

    });
  }


}
