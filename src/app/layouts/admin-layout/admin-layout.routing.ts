import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { VehicleSelectionComponent } from 'src/app/pages/vehicle-selection/vehicle-selection.component';
import { PanelSelectionComponent } from 'src/app/pages/panel-selection/panel-selection.component';
import { PersonalDetailsComponent } from 'src/app/pages/personal-details/personal-details.component';
import { QuotationComponent } from 'src/app/pages/quotation/quotation.component';
import { MakeAppointmentComponent } from 'src/app/pages/make-appointment/make-appointment.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },

    { path: 'select-vehicle', component: VehicleSelectionComponent },
    { path: 'select-panels', component: PanelSelectionComponent },
    { path: 'personal-details', component: PersonalDetailsComponent },
    { path: 'vehicle-quotation', component: QuotationComponent },
    { path: 'make-appoinment', component: MakeAppointmentComponent }


];
