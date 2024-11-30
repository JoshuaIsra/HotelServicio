import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApipersonalService } from '../../services/apipersonal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personal-form',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './personal-form.component.html',
  styleUrl: './personal-form.component.css'
})
export class PersonalFormComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private personalService = inject(ApipersonalService);

  form!: FormGroup;//quitar el !
  personal: any = null;
  constructor() {
    this.form=this.fb.group({
      nombre: ['',[Validators.required,Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      apellido: ['',[Validators.required,Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      email: ['',[Validators.required,Validators.email]],
      direccion: ['',Validators.required],
      telefono: ['', [Validators.required,Validators.pattern('^[0-9]{10}$')]],
      rol:['',Validators.required],
      turno:['',Validators.required],
      salario:['',[Validators.required,Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      type_personal:['',Validators.required]
    });

  }
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.personalService.getPersonalId(+id).subscribe(personal=>{
        this.personal=personal;
        this.form.setValue({
          nombre: personal.persona.nombre,
          apellido: personal.persona.apellido,
          email: personal.persona.correo,
          direccion: personal.persona.direccion,
          telefono: personal.persona.telefono,
          rol: personal.rol,
          turno: personal.turno,
          salario: personal.salario,
          type_personal: personal.type_personal
        });
      });
    }
  }
  save(){
    if (this.form.invalid) {
      alert('Por favor completa los campos obligatorios correctamente.');
      return;
    }

    const personalForm = this.form.value;
    const persona = {
      nombre: personalForm.nombre,
      apellido: personalForm.apellido,
      correo: personalForm.email,
      telefono: personalForm.telefono,
      direccion: personalForm.direccion
    };
    const personal = {
      persona: persona,
      personal:{
        rol: personalForm.rol,
        turno: personalForm.turno,
        salario: personalForm.salario,
        type_personal: personalForm.type_personal
      }

    };
    if(this.personal){
      this.personalService.updatePersonal(this.personal.id,personal).subscribe(()=>{
        this.router.navigate(['/personal']);
      });
    }else{
      this.personalService.createPersonal(personal).subscribe(()=>{
        this.router.navigate(['/personal']);
      });
    }
  }


}
