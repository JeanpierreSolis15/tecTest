import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto } from '../models/producto.models';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

export class PeticionesService {
  public url:string;

  constructor(
    public http:HttpClient,
    public firestore: AngularFirestore,
    public auth: AngularFireAuth,
    private storage:Storage
  ) {
    this.url="https://fytfya98oj.execute-api.us-east-2.amazonaws.com/produccion/"
  }
  
  //api-productos/producto/add-producto
  getProducto():Observable<any>{
    return this.http.get(this.url+'api-productos/producto/get-producto');
  }

  getListUser():Observable<any>{
    return this.http.get(this.url+'api-productos/producto/get-producto');
  }

  addProducto(producto):Observable<any>{
    return this.http.post<Producto>(this.url+'api-productos/producto/add-producto',producto)
  }

  loginWithEmail(data) {
    return this.auth.signInWithEmailAndPassword(data.email, data.password);
  }

  signup(data) {
    return this.auth.createUserWithEmailAndPassword(data.email, data.password);
  }

  saveDetails(data) {
    return this.firestore.collection("users").doc(data.uid).set(data);
  }
  getDetails(data) {
    return this.firestore.collection("users").doc(data.uid).valueChanges();
  }

  saveLocalResultQr(result){
    this.storage.set('KEY_DATA_QR',result)
  }
}
