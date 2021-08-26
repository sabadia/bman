import {Common} from "@shared/classes/common";
import {Navigation} from "./models/navigation";

const  NavigationList: Navigation[] = [
  {
    Id: Common.Guid.RandomGuid,
    Url: '/panel',
    Name: 'Posts',
    Icon: 'home',
  },
  {
    Id: Common.Guid.RandomGuid,
    Url: '/authorization',
    Name: 'Categories',
    Icon: 'category',

  },
  {
    Id: Common.Guid.RandomGuid,
    Url: '/about',
    Name: 'About',
    Icon: 'description',
  },

];
export {NavigationList}
