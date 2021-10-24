import { Component, OnInit } from '@angular/core';
import {UserService} from "@shared/services/user.service";
import {User} from "@entities/user";
import {BaseNavigationService} from "../../../../../root/navigation/services/base-navigation.service";

@Component({
  selector: 'app-default',
  templateUrl: './overview-panel-default.component.html',
  styleUrls: ['./overview-panel-default.component.scss']
})
export class OverviewPanelDefaultComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {

  }
}
