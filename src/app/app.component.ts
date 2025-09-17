import { Component } from '@angular/core';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CountryListComponent } from "./components/country-list/country-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, CountryListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projeto-paises';
}
