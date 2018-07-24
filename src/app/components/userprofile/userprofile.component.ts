import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { CountryService } from '../../services/country.service';
import { Skill } from '../../Entities/Skill';
import { Users } from '../../Entities/Users';


import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from "angularfire2/storage";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  itemList: AngularFireList<any> = null;
  skills: any[] = [];

  email: string;
  userId: any;

  countries: any = [{}];


  uuser: Users = new Users();

  // angular storage 
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;


  downloadUrl: Observable<string>;

  imgUrl: any;

  constructor(private _flashMessagesService: FlashMessagesService,
    public router: Router,
    private db: AngularFireDatabase,
    private country: CountryService,
    private afStorage: AngularFireStorage
  ) {


    // 




    this.email = localStorage.getItem("email");
    this.userId = localStorage.getItem("uid");


    // get list Of Firebase
    this.itemList = db.list("/users", ref => ref.orderByChild('uid').equalTo(this.userId));
    this.itemList.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        let v = action.payload.toJSON();
        v["$key"] = action.key;
        this.skills.push(v as Skill);
        // console.log(this.skills);
        this.uuser = this.skills[0];
        // set to local storage 
        localStorage.setItem("userkey", action.key);



      });
    });
    console.log(this.skills);

  }
  getAllCountries() {
    this.country.getData().subscribe(data => {
      this.countries = data;
      console.log(this.countries);


    });
  }
  upload(event) {

    // save image into database 
    const file = event.target.files[0];
    const filePath = Math.random().toString(30).substring(2);
    const task = this.afStorage.upload(filePath, file).then(() => {
      const ref = this.afStorage.ref(filePath);
      const downloadURL = ref.getDownloadURL().subscribe(url => {
        if (url) {
          const Url = url; // for ts
          this.imgUrl = url // with this you can use it in the html
          console.log(Url);


          // update databse to url image 
          let userKey = localStorage.getItem("userkey");
          this.itemList.update(userKey, {
            image: this.imgUrl
          });
        }
      });
    });

  }
  ngOnInit() {

    console.log(this.email);
    this.getAllCountries();


  }
  onEdit() {


  }
  onSubmit({ value, valid }: { value: Skill, valid: boolean }) {
    console.log("Done");

    if (!valid) {
      // subscribe to home component messages
      // this._flashMessagesService.show('We are in about component!', { cssClass: 'alert-success' });
      console.log("Invalid");

      this._flashMessagesService.show('Error Form Data ', { cssClass: 'uk-margin-top uk-text-center uk-alert-danger  uk-alert ', timeout: 5000 });

    } else {
      let userKey = localStorage.getItem("userkey");
      console.log("Key is 2  : " + userKey);

      // set email and user Id again From local storage 
      // value['email'] = this.email;
      // value['uid'] = this.userId;

      // set update object user 
      this.itemList.update(userKey, value);
      this.skills = [];


    }
  }

}
