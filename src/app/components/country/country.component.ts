import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, MatIcon],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent {
  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService
  ) { }

  loading = true;
  country: any;
  borderNames: { [key: string]: string } = {};

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const code = params.get('code');
      if (code) {
        this.loadCountry(code);
      } else {
        console.error('Código do país não fornecido');
        this.loading = false;
      }
      this.countryService.getAllCountries().subscribe(data => {
        this.borderNames = data.reduce((acc: any, c: any) => {
          acc[c.cca3] = c.name.common;
          return acc;
        }, {});
      });
    });
  }

  loadCountry(code: string) {
    this.loading = true;
    this.countryService.getCountryByCode(code).subscribe({
      next: (data) => {
        this.country = data[0];
        this.loading = false;
        console.log(this.country)

      },
      error: (err) => {
        console.error('Erro ao buscar país', err);
        this.loading = false;
      }
    });
  }
getCurrencies(): string {
  if (!this.country?.currencies) return '';
  return Object.values(this.country.currencies)
               .map((currency: any) => currency.name)
               .join(', ');
}





}