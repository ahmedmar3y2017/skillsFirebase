import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-skill',
  templateUrl: './update-skill.component.html',
  styleUrls: ['./update-skill.component.css']
})
export class UpdateSkillComponent implements OnInit {
  id: any;
  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // get id parameter
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
  }

}
