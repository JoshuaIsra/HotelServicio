import { Component, inject, OnInit } from '@angular/core';
import { ApiClienteService } from '../../services/api-cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit {
  private clienteservice = inject(ApiClienteService);
  clientes :any = [];
  private _router = inject(Router);

  constructor() { }

  ngOnInit(): void {
    this.loadAllClientes();
  }

  loadAllClientes(): void {
    this.clienteservice.getClientes().subscribe((data) => {
      this.clientes = data;
      console.log(data);
    });
  }
  
  goToEdiit(id: any): void {
    this._router.navigate(['/edit-cliente', id]);
  }
  goToNew(): void {

    this._router.navigate(['/cliente-form']);
  }
  deleteCliente(id: any): void {
    this.clienteservice.deleteCliente(id).subscribe((data) => {
      this.loadAllClientes();
    });


  }
  
}
