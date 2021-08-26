import { Component } from '@angular/core';
import {NavigationConfiguration} from "../navigation/models/navigation";

@Component({
  selector: 'base-root',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {
  title = 'BMan';
}
