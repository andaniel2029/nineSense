import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Observable, Subject, from } from 'rxjs';

import { ConnectionService } from '../connection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public msg: Subject<any> = new Subject();
  public msgArray: Observable<Array<any>> = new Observable<Array<any>>();

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private connectionService: ConnectionService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern('[0-9, a-z, A-Z, .]*')]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5), Validators.pattern('[0-9, a-z, A-Z, .]*')]],
      message: ['', [Validators.required, Validators.minLength(9)]]
    });
  }

  public onChange(target: any) {
    this.msg.next(target.value);
    target.value = '';
  }

  public onMsgReceive(msg: string) { }

  onSubmit() {
    this.connectionService.sendMessage(this.angForm.value).subscribe(() => {
      alert('Your message has been sent.');
      this.angForm.reset();
    }, error => {
      console.log('Error', error);
    });
  }

}
