import { Component, inject, Input, OnInit } from '@angular/core';
import { Habitaciones } from '../../Model/Habitaciones';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { jsDocComment } from '@angular/compiler';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClienteService } from '../../services/api-cliente.service';
import { CommonModule } from '@angular/common';
import { ApirerservasService } from '../../services/apirerservas.service';
import { dateRangeValidator } from '../../pages/reserva-form/reserva-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private reservaService = inject(ApirerservasService);
  private clienteService = inject(ApiClienteService);
  private habitacionService = inject(ApiService);
  
  clientes: any[] = [];
  habitaciones: any[] = [];
  form!: FormGroup;
  reser: any = null;

constructor() { 
  this.form = this.fb.group({
    fecha_reserva: ['', Validators.required],
    fecha_inicio: ['', Validators.required],
    fecha_fin: ['', Validators.required],
    cliente_id: ['', Validators.required],
    habitacion_id: ['', Validators.required],
    estadoReserva: ['Confirmada', Validators.required],
  }, { validators: dateRangeValidator() });
  }

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];
    this.form.patchValue({ fecha_reserva: today });

    this.clienteService.getClientes().subscribe(clientes => {
      console.log('Clientes:', clientes);
      this.clientes = clientes;
    });

    this.habitacionService.getHabitaciones().subscribe(habitaciones => {
      console.log('Habitaciones:', habitaciones);
      this.habitaciones = habitaciones;
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id && !isNaN(+id)) {
      this.reservaService.getReserva(+id).subscribe(
        reserva => {
          this.reser = reserva;
          this.form.patchValue({
            fecha_reserva: reserva.fecha_reserva,
            fecha_inicio: reserva.fecha_inicio,
            fecha_fin: reserva.fecha_fin,
            cliente_id: reserva.cliente_id,
            habitacion_id: reserva.habitacion_id,
            estadoReserva: reserva.estadoReserva
          });
        },
        error => {
          console.error('Error al obtener la reserva:', error);
        }
      );
    }
  }

  dateValidator(group: FormGroup): { [key: string]: boolean } | null {
    const fechaInicio = group.get('fecha_inicio')?.value;
    const fechaFin = group.get('fecha_fin')?.value;
  
    if (fechaInicio && fechaFin && new Date(fechaInicio) > new Date(fechaFin)) {
      return { invalidDateRange: true };
    }
    return null;
  }
  

  save(): void {
  //   const reservaform = this.form.value;
  //   const reserva = {
  //     fecha_reserva: reservaform.fecha_reserva,
  //     fecha_inicio: reservaform.fecha_inicio,
  //     fecha_fin: reservaform.fecha_fin,
  //     cliente_id: reservaform.cliente_id,
  //     habitacion_id: reservaform.habitacion_id,
  //     estadoReserva: reservaform.estadoReserva
  //   };
  //   if (this.reser) {
  //     this.reservaService.updateReserva(this.reser.id, reserva).subscribe(() => this.router.navigate(['/reserva']));
  //   } else {
  //     this.reservaService.createReserva(reserva).subscribe(() => this.router.navigate(['/reserva']));
  //     alert('Reserva creada con exito');
  //   }
  // }
  const reservaform = this.form.value;
  const reserva = {
    fecha_reserva: reservaform.fecha_reserva,
    fecha_inicio: reservaform.fecha_inicio,
    fecha_fin: reservaform.fecha_fin,
    cliente_id: reservaform.cliente_id,
    habitacion_id: reservaform.habitacion_id,
    estadoReserva: reservaform.estadoReserva
  };

  const updateHabitacionEstado = (habitacionId: number, estado: boolean) => {
    this.habitacionService.updateHabitacionEstado(habitacionId, estado).subscribe(() => {
      console.log('Estado de la habitación actualizado');
    });
  };

  if (this.reser) {
    this.reservaService.updateReserva(this.reser.id, reserva).subscribe(() => {
      updateHabitacionEstado(reserva.habitacion_id, false);
      this.router.navigate(['/reserva']);
    });
  } else {
    this.reservaService.createReserva(reserva).subscribe(() => {
      updateHabitacionEstado(reserva.habitacion_id, false);
      this.router.navigate(['/reserva']);
      alert('Reserva creada con éxito');
    });
  }
}







}