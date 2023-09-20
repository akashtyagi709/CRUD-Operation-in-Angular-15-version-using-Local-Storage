import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from '../add-edit/add-edit.component';
import { DeletePopUpComponent } from '../delete-pop-up/delete-pop-up.component';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {

  dataSource: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSourceCall();
  }

  dataSourceCall() {
    const data = localStorage.getItem('studentArray');
    if (data !== null) {
      this.dataSource = JSON.parse(data);
    }
  }


  onAdd() {
    this.dialog.open(AddEditComponent, {
      width: '650px',
      height: '400px',
      data: { 'id': null },
      disableClose: true
    })
      .afterClosed()
      .subscribe((confirm) => {
        this.dataSourceCall();
      })
  }

  onEdit(id: number) {
    this.dialog.open(AddEditComponent, {
      width: '650px',
      height: '400px',
      data: { 'id': id },
      disableClose: true
    })
      .afterClosed()
      .subscribe((confirm) => {
        this.dataSourceCall();
      })
  }


  onDelete(id: number) {
    this.dialog.open(DeletePopUpComponent, {
      width: '350px',
      height: '200px',
      data: { 'id': id },
      disableClose: true
    })
      .afterClosed()
      .subscribe((confirm) => {
        this.dataSourceCall();
      })
  }


  onTableDataChange(event: any) {
    this.dataSourceCall();
    this.page = event;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.dataSourceCall();
  }
}
