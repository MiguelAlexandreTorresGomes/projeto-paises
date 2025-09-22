import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CountryService } from '../../services/country.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule, MatIcon,FormsModule,RouterLink],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss'
})
export class CountryListComponent {
  countries: any[] = [];
  regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];
  searchText: string = '';
  isDropdownOpen = false;
  loading = true;

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.loadAllCountries();
  }

  loadAllCountries() {
    this.loading = true;
    this.countryService.getAllCountries().subscribe({
      next: (data) => {
        this.countries = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar países', err);
        this.loading = false;
      }
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  filterByRegion(region: string) {
    if (!region) {
      this.loadAllCountries();
      return;
    }
    this.loading = true;
    this.countryService.getByRegion(region).subscribe({
      next: (data) => {
        this.countries = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao filtrar países', err);
        this.loading = false;
      }
    });
  }
  filterByCountry(name: string) {
    name = name.trim();
    if (!name) {
      this.loadAllCountries();
      return;
    }
    this.loading = true;
    this.countryService.getCountryByName(name).subscribe({
      next: (data) => {
        this.countries = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao filtrar países', err);
        this.countries = [];
        this.loading = false;
      }
    });
  }
}
