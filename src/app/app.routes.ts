import { Routes } from '@angular/router';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryComponent } from './components/country/country.component';

export const routes: Routes = [
    {
        path:"",
        component:CountryListComponent,
    },
    {
        path:"country-list",
        component:CountryListComponent,
    },
       {
        path:"country/:code",
        component:CountryComponent,
    }
];
