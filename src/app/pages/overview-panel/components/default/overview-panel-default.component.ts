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
  }
}
