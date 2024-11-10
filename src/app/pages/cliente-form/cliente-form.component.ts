import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiClienteService } from '../../services/api-cliente.service';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css'
})
export class ClienteFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private clienteService = inject(ApiClienteService);

  form: FormGroup;
  clien: any = null;

  constructor() {
    this.form = this.fb.group({
      estado: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.clienteService.getCliente(+id).subscribe(cliente => {
        this.clien = cliente;
        this.form.setValue({
          estado: cliente.estado,
          nombre: cliente.persona.nombre,
          apellido: cliente.persona.apellido,
          email: cliente.persona.correo,
          direccion: cliente.persona.direccion,
          telefono: cliente.persona.telefono
        });
      });
    }
  }

  save() {
    const clienteform = this.form.value;
    const persona = {
      nombre: clienteform.nombre,
      apellido: clienteform.apellido,
      correo: clienteform.email,
      telefono: clienteform.telefono,
      direccion: clienteform.direccion
    };

    const cliente = {
      estado: clienteform.estado
    };

    const clienteData = {
      persona: persona,
      cliente: cliente
    };

    if (this.clien) {
      this.clienteService.updateCliente(this.clien.id, clienteData).subscribe(() => {
        this.router.navigate(['/cliente']);
      });
    } else {
      this.clienteService.createCliente(clienteData).subscribe(() => {
        this.router.navigate(['/cliente']);
      });
    }
  }
}
