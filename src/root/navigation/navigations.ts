import {Navigation} from "@entities/navigation";
import {Role} from "@entities/role";
import {Common} from "@shared/classes/common";

const  NavigationList: Navigation[] = [

];



const RoleBasedNavigation = {
  SuperAdmin: {
    Key: '',
    RoleHierarchyBaseValue: 0,
    AuthFailedUrl: 'authorization',
    NavigationList: [Navigation]
  }
}
export {NavigationList}
