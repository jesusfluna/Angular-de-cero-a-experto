import  { Component } from '@angular/core'

@Component({
    selector: 'app-body',
    templateUrl: 'body.component.html'
})
export class BodyComponent{
    mostrar:boolean = true;
    frase: any = {
        mensaje: "un gran poder requiere una gran responsabilidad",
        autor: "Ben Parker"
    }

    personajes:string[] = ["Spiderman","Venom","Octopus"]

}