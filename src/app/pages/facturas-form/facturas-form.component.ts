import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApifacturasService } from '../../services/apifacturas.service';
import { ApirerservasService } from '../../services/apirerservas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-facturas-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './facturas-form.component.html',
  styleUrl: './facturas-form.component.css',
})
export class FacturasFormComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private facturaService = inject(ApifacturasService);
  private reservaService = inject(ApirerservasService);

  form!: FormGroup;
  fact: any = null;
  reservas: any = [] = [];

  constructor() {
    this.form = this.fb.group({
      reserva_id: ['', Validators.required],
      fechaEmision: ['', Validators.required],
      montoTotal: ['', Validators.required],
      metodoPago: ['', Validators.required],
      estadoPago: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Cargar reservas
    this.reservaService.getRerservas().subscribe({
      next: (reservas) => {
        console.log('Reservas cargadas:', reservas);
        this.reservas = reservas;
      },
      error: (err) => console.error('Error obteniendo reservas:', err),
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      console.log('ID de factura recibido:', id);
      this.facturaService.getFactura(+id).subscribe({
        next: (factura) => {
          console.log('Factura cargada:', factura);
          this.fact = factura;
          this.form.setValue({
            reserva_id: factura.reserva_id,
            fechaEmision: factura.fechaEmision,
            montoTotal: factura.montoTotal,
            metodoPago: factura.metodoPago,
            estadoPago: factura.estadoPago,
          });
        },
        error: (err) => console.error('Error cargando factura:', err),
      });
    } else {
      console.log('No se encontró un ID de factura en la URL.');
    }
  }

  save() {
    if (this.form.invalid) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    const facturaForm = this.form.value;
    const factura = {
      reserva_id: facturaForm.reserva_id,
      fechaEmision: facturaForm.fechaEmision,
      montoTotal: facturaForm.montoTotal,
      metodoPago: facturaForm.metodoPago,
      estadoPago: facturaForm.estadoPago,
    };

    if (this.fact) {
      // Actualizar factura existente
      this.facturaService.updateFactura(this.fact.idFactura, factura).subscribe({
        next: () => {
          this.router.navigate(['/facturas']);
        },
        error: (err) => {
          console.error('Error actualizando factura:', err);
        },
      });
    } else {
      // Crear nueva factura
      this.facturaService.crearFactura(factura).subscribe({
        next: () => {
          this.router.navigate(['/facturas']);
        },
        error: (err) => {
          console.error('Error creando factura:', err);
        },
      });
    }
  }
}
