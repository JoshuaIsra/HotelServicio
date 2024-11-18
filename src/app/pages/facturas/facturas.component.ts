import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Factura } from '../../Model/Facturas';
import { ApifacturasService } from '../../services/apifacturas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.css'
})
export class FacturasComponent {
  private facturaService = inject(ApifacturasService);
 facturas: Factura[] = [];
  private _router=inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.loadAllFacturas();
  }

  loadAllFacturas(): void {
    this.facturaService.getFacturas().subscribe((data) => {
      this.facturas = data;
      console.log(data);
  }) ;
  }

  goToEdit(id: any): void {
    this._router.navigate(['/edit-factura', id]);
  }

  goToNew(): void {
    this._router.navigate(['/facturas-form']);
  }

  deleteFactura(id: any): void {
    this.facturaService.deleteFactura(id).subscribe((data) => {
      this.loadAllFacturas();
    });
  }
}
