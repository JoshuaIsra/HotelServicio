import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ApirerservasService } from '../../services/apirerservas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent {
  private ReservaService = inject(ApirerservasService);
  private _router = inject(Router);
  Reservas:any = [];
  ngOnInit(): void {
    this.loadAllReservas();
  }
  constructor() {}

  loadAllReservas(): void {
    this.ReservaService.getRerservas().subscribe((data) => {
      this.Reservas = data;
      console.log(data);
    });
  }
  goToEdit(id: any): void {
    this._router.navigate(['/edit-reserva', id]);
  }

  goToNew(): void {
    this._router.navigate(['/reservas-form']);
  }

  deleteReserva(id: any): void {
    this.ReservaService.deleteReserva(id).subscribe((data) => {
      this.loadAllReservas();
    });
  }

}
