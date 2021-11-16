import { PeticionesService } from 'src/app/services/peticiones.service';
import { ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Map } from "mapbox-gl";
import * as mapboxgl from "mapbox-gl";
import { Producto } from 'src/app/models/producto.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  model: Producto = {
    STOCK: 0,
    CODIGO_PRODUCTO: 0,
    ID_PRODUCTO: this.generate(),
    NOMBRE_PRODUCTO: '',
    CAPACIDAD: '',
  };

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: mapboxgl.Map;
  userList: any = [];
  constructor(
    private Pservice: PeticionesService,
    private barcodeScanner: BarcodeScanner) {
    Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set("pk.eyJ1IjoiYWxlbmRvIiwiYSI6ImNrM2ViaXVyZjFlNmszYnFqMHB0bmFmbGcifQ.JHTD6PbUodS4XngjM53FUQ");
  }

  async ngOnInit() {
    //this.onQRRead()
    this.loadMap();
    this.getList()
  }

  async getList() {
    this.Pservice.getListUser().subscribe(
      (result) => {
        console.log(result);
        this.userList = result;
        return result;
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  loadMap() {
    this.map = new Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/outdoors-v10', // stylesheet location
      center: [12.57446, 41.84959], // starting position [lng, lat]
      zoom: 9 // starting zoom
    });
    // Add geolocate control to the map.

    this.map.resize();

    this.map.addControl(new mapboxgl.NavigationControl());
  }

  onQRRead() {
    this.barcodeScanner
      .scan()
      .then(async (barcodeData: any) => {
        const result = JSON.parse(barcodeData.text);
        console.log(result)
        this.createMarker(result)
        this.Pservice.saveLocalResultQr(result)
        this.model = {
          STOCK: result.STOCK,
          CODIGO_PRODUCTO: result.CODIGO_PRODUCTO,
          ID_PRODUCTO: this.generate(),
          NOMBRE_PRODUCTO: result.NOMBRE_PRODUCTO,
          CAPACIDAD: result.CAPACIDAD,
        }
        this.Pservice
          .addProducto(JSON.stringify(this.model))
          .subscribe((response: Producto) => {
            console.log(response);
          });
        this.getList()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createMarker(data) {
    const marker = new mapboxgl.Marker({
      draggable: true
    }).setLngLat([data.long, data.lat])
      .addTo(this.map);
    marker.on('drag', (res) => {
      console.log(res)
    })
  }
  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generate() {
    while (this.getRandomInt) {
      return this.getRandomInt(0, 99999);
    }
  }
}

//cancelled: false
//format: "QR_CODE"
//text: "3"