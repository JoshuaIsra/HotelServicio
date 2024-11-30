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
    const today = new Date().toISOString().split('T')[0]; 

    this.form = this.fb.group({
      reserva_id: ['', Validators.required],
      fechaEmision: [today, Validators.required],
      montoTotal: ['', [Validators.required, Validators.min(0)]],
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
            fechaEmision: factura.fechaEmision || new Date().toISOString().split('T')[0], // Usa la fecha existente o la actual
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


  cambio(event: any) {
    console.log('Cambio en el campo:', event.target.value);

    // Encuentra la reserva seleccionada
    const reserva = this.reservas.find((reserva: any) => reserva.id === +event.target.value);
    console.log('Reserva seleccionada:', reserva);

    if (reserva) {
        console.log('Fechas de reserva (crudas):', reserva.fecha_inicio, reserva.fecha_fin);

        // Verifica si las fechas y precio existen
        if (!reserva.fecha_inicio || !reserva.fecha_fin || !reserva.habitacion.precio_noche) {
            console.error('Datos incompletos para calcular el monto total.');
            this.form.get('montoTotal')?.setValue(null); // Limpia el campo si no hay datos válidos
            return;
        }

        // Extrae fechas y precio por noche
        let fechainicio: Date, fechafin: Date;
        try {
            fechainicio = new Date(reserva.fecha_inicio); // Cambia si el formato no es ISO
            fechafin = new Date(reserva.fecha_fin);
        } catch (e) {
            console.error('Error al convertir las fechas:', e);
            this.form.get('montoTotal')?.setValue(null);
            return;
        }

        // Verifica que las fechas sean válidas
        if (isNaN(fechainicio.getTime()) || isNaN(fechafin.getTime())) {
            console.error('Fechas inválidas:', fechainicio, fechafin);
            this.form.get('montoTotal')?.setValue(null); // Limpia el campo si las fechas no son válidas
            return;
        }

        // Calcula la diferencia de días
        const diffTime = Math.abs(fechafin.getTime() - fechainicio.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Milisegundos a días

        console.log('Días de reserva:', diffDays);

        // Calcula el monto total
        const montoTotal = diffDays * reserva.habitacion.precio_noche;
        console.log('Monto total:', montoTotal);

        // Actualiza el formulario con el monto total
        this.form.get('montoTotal')?.setValue(montoTotal);
    } else {
        console.error('Reserva no encontrada.');
        this.form.get('montoTotal')?.setValue(null); // Limpia el campo si no hay reserva
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
