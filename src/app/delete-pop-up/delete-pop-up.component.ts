import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-pop-up',
  templateUrl: './delete-pop-up.component.html',
  styleUrls: ['./delete-pop-up.component.css']
})
export class DeletePopUpComponent implements OnInit {

  userId: number = 0;
  dataArray = new Array<any>();

  constructor(private dialogRef: MatDialogRef<DeletePopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userId = data.id;
  }

  ngOnInit(): void {
    this.dataSourceCall();
  }

  dataSourceCall() {
    const data = localStorage.getItem('studentArray'); if (data !== null) {
      this.dataArray = JSON.parse(data)
    }
  }

  yesDeleteData() {
    this.dataSourceCall();
    for (let i = 0; i < this.dataArray.length; i++) {
      const element = this.dataArray[i];
      if (this.userId == element.id) {
        this.dataArray.splice(i, 1);
      }
    }
    localStorage.setItem('studentArray', JSON.stringify(this.dataArray));
    this.dialogRef.close();
  }

  noDeleteData() {
    this.dialogRef.close();
  }

}
