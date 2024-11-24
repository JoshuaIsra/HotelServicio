import { Component, inject } from '@angular/core';
import { ApipersonalService } from '../../services/apipersonal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css'
})
export class PersonalComponent {
  private personalService =inject(ApipersonalService);
  personal: any = [];
  private _router = inject(Router);
  constructor() { }
  ngOnInit(): void {
    this.loadAllPersonal();
  }
  loadAllPersonal(): void{
      this.personalService.getPersonal().subscribe((data) => {
        this.personal = data;
        console.log(data);
      });
  }

  goToEdiit(id: any): void {
    this._router.navigate(['/edit-personal', id]);      
  }

  goToNew(): void {
    this._router.navigate(['/personal-form']);
  }

  deletePersonal(id: any): void {
    this.personalService.deletePersonal(id).subscribe((data) => {
      this.loadAllPersonal();
    });
  } 
}
