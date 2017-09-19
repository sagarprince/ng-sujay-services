import { Component, OnInit } from '@angular/core';

import { SweetAlertController } from '../../shared/modules/sweet-alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public sweetAlertCtrl: SweetAlertController) { }

  ngOnInit() {

  }

  login() {   

    this.sweetAlertCtrl.open({
      title: 'Heading',
      message: 'Test message here',
      type: 'success',
      animationType: 'slide-from-top'
    })
    .onApprove((result) => {
      console.log('hi');
      console.log(result);                 

      this.sweetAlertCtrl.open({
          title: 'Are you sure?',
          message: 'You will not be able to recover this imaginary file!',
          type: 'warning',
          animationType: 'slide-from-top',
          isConfirm: true,
          showCancelButton: true
      })
      .onApprove((result) => {
        console.log('bye');
        console.log(result);                 

        this.sweetAlertCtrl.open({
            title: 'Heading 3',
            message: 'Test message here',
            type: 'error',
            animationType: 'slide-from-bottom'
        })
        .onApprove((result) => {
          console.log('bye 2');
          console.log(result);                 
        });        
      })
    });
  }

}
