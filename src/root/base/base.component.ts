import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NavigationConfiguration} from "../navigation/models/NavigationConfiguration";
import {BaseNavigationService} from "../navigation/services/base-navigation.service";

@Component({
  selector: 'base-root',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {
  title = 'BMan';
}
