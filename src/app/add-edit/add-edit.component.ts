import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  formtext = 'Add';
  btntext = 'Submit';
  userForm!: FormGroup;
  length: number = 0;
  dataArray = new Array<any>();
  userId?: number;

  constructor(private dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public DATA: any) {
    this.userId = DATA.id;
  }


  ngOnInit(): void {
    this.userForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
    })

    if (this.userId == null) {
      this.dataSourceCall();
    }
    else {
      this.getDataById();
      this.formtext = 'Edit';
    }
  }

  dataSourceCall() {
    const data = localStorage.getItem('studentArray'); if (data !== null) {
      this.dataArray = JSON.parse(data)
      this.length = this.dataArray.length;
    }
  }

  getDataById() {
    this.dataSourceCall();
    this.btntext = 'Save';
    for (let i = 0; i < this.dataArray.length; i++) {
      const element = this.dataArray[i];
      if (this.userId == element.id) {
        this.userForm.get('id')?.setValue(element.id);
        this.userForm.get('name')?.setValue(element.name);
        this.userForm.get('email')?.setValue(element.email);
        this.userForm.get('phone')?.setValue(element.phone);
      }
    }
  }


  onSubmit() {
    let id = this.length + 1;
    this.userForm.get('id')?.setValue(id);
    this.dataArray.push(this.userForm.value);
    localStorage.setItem('studentArray', JSON.stringify(this.dataArray));
  }

  onEdit() {
    let id = this.userForm.get('id')?.value;
    let newDataArr = [];
    for (let i = 0; i < this.dataArray.length; i++) {
      const element = this.dataArray[i];
      if (this.userId == element.id) {
        newDataArr.push(this.userForm.value);
      }
      else {
        newDataArr.push(element);
      }
    }
    localStorage.setItem('studentArray', JSON.stringify(newDataArr));
  }
}