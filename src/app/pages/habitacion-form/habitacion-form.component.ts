import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Habitaciones } from '../../Model/Habitaciones';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-habitacion-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule,CommonModule],
  templateUrl: './habitacion-form.component.html',
  styleUrl: './habitacion-form.component.css',
})
export class HabitacionFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private habiatcionService = inject(ApiService);

  form?: FormGroup;
  habit?: Habitaciones;

  constructor() {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.habiatcionService.getHabitacion(+id).subscribe((habitacion) => {
        this.habit = habitacion;
        this.form = this.fb.group({
          precio_noche: [
            habitacion.precio_noche,
            [Validators.required, Validators.min(0)],
          ],
          estado: [habitacion.estado, Validators.required],
          capacidad_personas: [
            habitacion.capacidad_personas,
            [Validators.required, Validators.min(0)],
          ],
          servicios: [habitacion.servicios, Validators.required],
          numero_camas: [
            habitacion.numero_camas,
            [Validators.required, Validators.min(0)],
          ],
          tipo_cama: [habitacion.tipo_cama, Validators.required],
          tipo_habitacion: [habitacion.tipo_habitacion, Validators.required],
        });
      });
    } else {
      this.form = this.fb.group({
        precio_noche: ['', [Validators.required, Validators.min(0)]],
        estado: ['', Validators.required],
        capacidad_personas: ['', [Validators.required, Validators.min(0)]],
        servicios: ['', Validators.required],
        numero_camas: ['', [Validators.required, Validators.min(0)]],
        tipo_cama: ['', Validators.required],
        tipo_habitacion: ['', Validators.required],
      });
    }
  }

  save() {
    if (this.form?.invalid) {
      alert('Por favor, Llene los datos del Formularios.');
      return;
    }

    const habitacionForm = this.form!.value;
    habitacionForm.estado = habitacionForm.estado ? '1' : '0'; // Convertir booleano a entero

    if (this.habit) {
      this.habiatcionService
        .updateHabitacion(this.habit.id, habitacionForm)
        .subscribe(() => {
          this.router.navigate(['/habitacion']);
        });
    } else {
      this.habiatcionService
        .createHabitacion(habitacionForm)
        .subscribe(() => {
          this.router.navigate(['/habitacion']);
        });
    }
  }
}
