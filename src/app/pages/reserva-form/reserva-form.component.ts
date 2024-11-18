import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApirerservasService } from '../../services/apirerservas.service';
import { ApiClienteService } from '../../services/api-cliente.service';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reserva-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './reserva-form.component.html',
  styleUrls: ['./reserva-form.component.css']
})
export class ReservaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private reservaService = inject(ApirerservasService);
  private clienteService = inject(ApiClienteService);
  private habitacionService = inject(ApiService);

  clientes: any[] = [];
  habitaciones: any[] = [];
  form: FormGroup;
  reser: any = null;

  constructor() {
    this.form = this.fb.group({
      fecha_reserva: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      cliente_id: ['', Validators.required],
      habitacion_id: ['', Validators.required],
      estadoReserva: ['', Validators.required],
    });
  }

  ngOnInit(): void {
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
  
  save(): void {
    const reservaform = this.form.value;
    const reserva = {
      fecha_reserva: reservaform.fecha_reserva,
      fecha_inicio: reservaform.fecha_inicio,
      fecha_fin: reservaform.fecha_fin,
      cliente_id: reservaform.cliente_id,
      habitacion_id: reservaform.habitacion_id,
      estadoReserva: reservaform.estadoReserva
    };
    if (this.reser) {
      this.reservaService.updateReserva(this.reser.id, reserva).subscribe(() => this.router.navigate(['/reserva']));
    } else {
      this.reservaService.createReserva(reserva).subscribe(() => this.router.navigate(['/reserva']));
    }
  }
}
