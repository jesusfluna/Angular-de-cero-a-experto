import { Injectable, resolveForwardRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s:string]: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  noBinLaden(control:FormControl): ErrorValidate {
    if (control.value?.toLowerCase() === "binladen"){
      return { noBinLaden: true }
    }
    return null;
  }

  passwordsIguales(pass1:string, pass2:string){
    return  ( formGroup: FormGroup ) => {
      const p1Control = formGroup.controls[pass1];
      const p2Control = formGroup.controls[pass2];

      if (p1Control.value === p2Control.value){
        p2Control.setErrors(null);
      }else{
        p2Control.setErrors({noEsIgual: true});
      }
    }
  }

  existeUsuario(control:FormControl): Promise<ErrorValidate> | Observable<ErrorValidate>{
    
    if (!control.value){
      return Promise.resolve(null);
    }
    
    let res: Promise<ErrorValidate> = new Promise((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'strider'){
          resolve({ existe: true});
        }else{
          resolve(null);
        }
      }, 3500);
    });

    return res;
  }
}
