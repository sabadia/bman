import { Component, OnInit } from '@angular/core';
import {UserService} from "@shared/services/user.service";
import {User} from "@entities/user";

@Component({
  selector: 'app-default',
  templateUrl: './overview-panel-default.component.html',
  styleUrls: ['./overview-panel-default.component.scss']
})
export class OverviewPanelDefaultComponent implements OnInit {

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    const user = new User({
      DisplayName: 'Mahamudul Hasan',
      Email: '919.hasan@gmail.com',
    }).EntityJson
    console.log(user);
    // this.userService.add(user);
    this.userService.get(
    //   [{
    //   fieldPath: 'id',
    //   opStr: '==',
    //   value: "013c3b1b-0c49-4504-bc99-e350831a9457"
    // }]
    ).subscribe(data => console.log(data));
  }

}
