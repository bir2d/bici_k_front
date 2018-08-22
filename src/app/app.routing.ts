import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { BasicComponent } from './layouts/basic/basic.component';
import {  GeneralService as AuthGuard } from './servicios/general/general.service';
export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [{
      path: '',
      redirectTo: '/starter',
      pathMatch: 'full'
    }, {
      path: '',
      loadChildren: './material-component/material.module#MaterialComponentsModule'
    }, {
      path: 'starter',
      loadChildren: './starter/starter.module#StarterModule'
    }]
  }
  ,{
    path: 'login',
    component: BasicComponent,
    children: [ {
      path: '',
      loadChildren: './login/login.module#LoginModule',
      
    }
    ]
  }
]

