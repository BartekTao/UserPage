import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';

class User {
  name!: string;
  age!: number;
  registered!: string;
  email!: string;
  balance!: string;
}

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  displayedColumns: string[] = ['name', 'age', 'registered', 'email', 'balance'];
  rowData!: User[];
  dataSource!: User[];

  constructor(private httpClient: HttpClient, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.httpClient.get("assets/users.json").subscribe(data =>{
      let res = Object.assign(new Array<User>, data);
      res.forEach((user) =>{
        let date = this.datePipe.transform(new Date(user.registered.substring(0, 19)),"dd-MM-yyyy dd:mm:ss")?.toString()
        if (date) {
          user.registered = date;
        }else {
          user.registered = '';
        }
        user.balance = parseFloat(user.balance.replace(/,/g, '')).toFixed(2);
      });
      this.dataSource = res;
      this.rowData = res;
    })
  }

}
