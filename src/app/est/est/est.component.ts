import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EstService } from './est.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-est',
  templateUrl: './est.component.html',
  styleUrls: ['./est.component.scss']
})
export class EstComponent {


  private est$!: Subscription;

  public isSave:boolean = false;

  public estForm: FormGroup = this.fb.group({
    Nombre: ['', [Validators.required, Validators.minLength(6)]],
    Email: ['', [Validators.required, Validators.email]],
  });

  constructor(  private fb: FormBuilder,
                private srvEst: EstService,
                private service: MessageService
  ) { }

  public submit(){
    this.est$ = this.srvEst.insert(this.estForm.getRawValue())
      .subscribe(
        resp => {
          this.isSave = true;
          this.estForm.reset();
          this.est$?.unsubscribe();
        },
        err => {
          let msj:string = 'Error desconocido!!';
          switch (err.status) {
            case 409:
              msj= err.error;
              break;
            case 0:
              msj= 'Servidor no disponible!!';
              break;
          }
          this.service.add({ key: 'tst',life:9999, severity: 'error', summary: 'Error', detail: msj });
        });
  }
}
