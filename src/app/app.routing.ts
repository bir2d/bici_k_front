import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { BasicComponent } from './layouts/basic/basic.component';
import { GeneralService as AuthGuard } from './servicios/general/general.service';
export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [{
      path: '',
      redirectTo: '/administracion/bicicletas',
      pathMatch: 'full'
    }, {
      path: '',
      loadChildren: './material-component/material.module#MaterialComponentsModule'
    }, {
      path: 'starter',
      loadChildren: './starter/starter.module#StarterModule'
    }]
  }
  , {
    path: 'administracion',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [{
      path: '',
      loadChildren: './material-component/material.module#MaterialComponentsModule'
    }, {
      path: 'candados',
      loadChildren: './administracion/candados/candados.module#CandadosModule'

    }, {
      path: 'bicicletas',
      loadChildren: './administracion/bicicletas/bicicletas.module#BicicletasModule'
    },
    {
      path: 'empleados',
      loadChildren: './administracion/empleados/empleados.module#EmpleadosModule'
    }, {
      path: 'reservas',
      loadChildren: './administracion/reservas/reservas.module#ReservasModule'

    }

    ]

  }
  , {
    path: 'login',
    component: BasicComponent,
    children: [{
      path: '',
      loadChildren: './login/login.module#LoginModule',

    }
    ]
  }
]

