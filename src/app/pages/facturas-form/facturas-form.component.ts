import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApifacturasService } from '../../services/apifacturas.service';
import { Factura } from '../../Model/Facturas';
import { ApirerservasService } from '../../services/apirerservas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-facturas-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './facturas-form.component.html',
  styleUrl: './facturas-form.component.css'
})
export class FacturasFormComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route =inject(ActivatedRoute);
  private facturaService = inject(ApifacturasService);
  private reservaService = inject(ApirerservasService);

  form! : FormGroup;
  fact: any = null;
  reservas: any = [];
  constructor() {
    this.form=this.fb.group({
      reserva_id: ['', Validators.required],
      fechaEmision: ['', Validators.required],
      montoTotal: ['', Validators.required],
      metodoPago: ['', Validators.required],
      estadoPago: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.reservaService.getRerservas().subscribe(reservas => {
      console.log('Reservas:', reservas);
      this.reservas = reservas;
    });
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.facturaService.getFactura(+id).subscribe(factura => {
        this.fact = factura;
        this.form.setValue({
          reserva_id: factura.reserva_id,
          fechaEmision: factura.fechaEmision,
          montoTotal: factura.montoTotal,
          metodoPago: factura.metodoPago,
          estadoPago: factura.estadoPago
        });
      });
    }
    
  }

  save(){
    const facturaform = this.form.value;
    const factura = {
      reserva_id: facturaform.reserva_id,
      fechaEmision: facturaform.fechaEmision,
      montoTotal: facturaform.montoTotal,
      metodoPago: facturaform.metodoPago,
      estadoPago: facturaform.estadoPago
    };
  }
}
