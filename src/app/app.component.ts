import { Component } from '@angular/core';
import { AutorizadorService } from './autorizador.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vass';
  usuarios: any;
  persona: any;
  personaupdate:any;
  mostrar: boolean;
  nuevo: boolean;
  modificar: boolean;
  formprueba: FormGroup;
  formActualiza: FormGroup;
  actualizar:any;


  constructor( private fb: FormBuilder,
               private auth: AutorizadorService,
             ) {

    this.formprueba = fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      website: ['', Validators.required],
      street: ['', Validators.required],
      suite: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
      lat: ['', Validators.required],  
      lng: ['', Validators.required], 
      namecompany: ['', Validators.required],
      catchPhrase: ['', Validators.required],
      bs: ['', Validators.required]
    });


    this.formActualiza = fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
    });    

    auth.getUsuarios()
      .subscribe((resp: any) => {
        console.log(resp);
        this.usuarios = resp;
      }, error => {
        console.log(error);
      })

    this.mostrar = false;
    this.nuevo = false;
    this.modificar=false;
  }

  goRuta2(valores) {
    console.log(valores);
    this.persona = valores;
    this.mostrar = true;
  }

  updateDatos(valores){

    this.modificar=true;
    console.log(valores);
    var datos={
      userId:valores.id,
      name:valores.name,
      correo:valores.email,
      telefono:valores.phone
    }

    this.personaupdate=datos

    this.formActualiza.value.id = valores.id;
    this.formActualiza.value.name = valores.name;
    this.formActualiza.value.email = valores.email;
    this.formActualiza.value.phone = valores.phone;

    console.log(this.formActualiza)

  }


  borrarUser(id) {
    console.log(id);

    this.auth.deleteUsuarios(id)
      .subscribe((resp: any) => {
        console.log(resp);
      }, error => {
        console.log(error);
      })

  }

  nuevoUser(valor) {
    this.nuevo = valor;
    console.log(this.nuevo);
  }


  guardarDatos(){
   
    var datos={
      name: this.formprueba.value.name,
      username: this.formprueba.value.username,
      email: this.formprueba.value.email,
      address: {
        street: this.formprueba.value.street,
        suite: this.formprueba.value.suite,
        city: this.formprueba.value.city,
        zipcode: this.formprueba.value.zipcode,
        geo: {
          lat: this.formprueba.value.lat,
          lng: this.formprueba.value.lng
        }
      },
      phone: this.formprueba.value.phone,
      website: this.formprueba.value.website,
      company: {
        name:  this.formprueba.value.namecompany,
        catchPhrase: this.formprueba.value.catchPhrase,
        bs: this.formprueba.value.bs
      }
    }

    console.log(datos);

    this.auth.postUsuarios(datos)
    .subscribe((resp: any) => {
      console.log(resp);
      var id=resp.id;
      alert('registro creado:' + id);
    }, error => {
      console.log(error);
    })
  }

  ActualizarDatos(){
 
    this.auth.putUsuarios(this.formActualiza)
      .subscribe((resp: any) => {
        console.log(resp);
        var id=resp.id;
        alert('registro actualizado:' + id);
      }, error => {
        console.log(error);
      })

  }


}
