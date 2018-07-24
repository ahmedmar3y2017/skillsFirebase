import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Skill } from '../Entities/skill';
@Injectable({
  providedIn: 'root'
})
export class FirebaseserviceService {
  Workers: Observable<Skill[]>;

  private dbPath = 'skills';

  WorkersRef: AngularFireList<Worker> = null;

  constructor(private db: AngularFireDatabase) {

    this.WorkersRef = db.list(this.dbPath);


  }
  createWorker(worker: Worker): void {
    this.WorkersRef.push(JSON.parse(JSON.stringify(Worker)));
  }

  updateWorker(key: string, value: any): void {
    this.WorkersRef.update(key, value).catch(error => this.handleError(error));
  }

  deleteWorker(key: string): void {
    this.WorkersRef.remove(key).catch(error => this.handleError(error));
  }

  getWorkersList(): AngularFireList<Worker> {
    return this.WorkersRef;
  }
  getWorkerDetails(id: any) {
    return this.db.object('/skills/' + id);
  }

  deleteAll(): void {
    this.WorkersRef.remove().catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }
}
