import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Habitaciones } from '../../Model/Habitaciones';

@Component({
  selector: 'app-habitacion-form',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './habitacion-form.component.html',
  styleUrl: './habitacion-form.component.css'
})
export class HabitacionFormComponent implements OnInit {
  private fb=inject(FormBuilder);
  private router=inject(Router);
  private route=inject(ActivatedRoute);
  private habiatcionService=inject(ApiService);

  // form = this.fb.group({
  //   precio_noche: ['', Validators.required],
  //   estado: ['',Validators.required],
  //   capacidad_personas: ['',Validators.required],
  //   servicios: ['',Validators.required],
  //   numero_camas: ['',Validators.required],
  //   tipo_cama: ['',Validators.required]
  // })

  form?:FormGroup;
  habit?:Habitaciones

  constructor() { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.habiatcionService.getHabitacion(+id).subscribe(habitacion => {
        this.habit = habitacion;
        this.form = this.fb.group({
          precio_noche: [habitacion.precio_noche, Validators.required],
          estado: [habitacion.estado,Validators.required],
          capacidad_personas: [habitacion.capacidad_personas,Validators.required],
          servicios: [habitacion.servicios,Validators.required],
          numero_camas: [habitacion.numero_camas,Validators.required],
          tipo_cama: [habitacion.tipo_cama,Validators.required]
        });
      })
      }else{
        this.form = this.fb.group({
          precio_noche: ['', Validators.required],
          estado: ['',Validators.required],
          capacidad_personas: ['',Validators.required],
          servicios: ['',Validators.required],
          numero_camas: ['',Validators.required],
          tipo_cama: ['',Validators.required]

        });
      }
    }

    save() {
      const habitacionForm = this.form!.value;
      habitacionForm.estado = habitacionForm.estado ? '1' : '0'; // Convertir booleano a entero
    
      if (this.habit) {
        this.habiatcionService.updateHabitacion(this.habit.id, habitacionForm).subscribe(() => {
          this.router.navigate(['/habitacion']);
        });
      } else {
        this.habiatcionService.createHabitacion(habitacionForm).subscribe(() => {
          this.router.navigate(['/habitacion']);
        });
      }
    }
    
      

}
  




  

