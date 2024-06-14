import {AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {DireccionDTO} from "../../models/DireccionDTO";
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class MapaComponent  implements OnChanges {

  map?: Map;
  @Input() direccion!: DireccionDTO;

  constructor(private http: HttpClient) { }

  ngOnChanges() {
    if (this.direccion) {
      this.getCoordinates(this.direccion.codigoPostal + ", " + this.direccion.calle + " " + this.direccion.numero).then(coordinates => {
        this.initializeMap(coordinates);
      }).catch(error => {
        console.error('Error getting coordinates:', error);
      });
    }
  }

  private getCoordinates(address: string): Promise<[number, number]> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    return this.http.get<any[]>(url).toPromise().then(response => {
      if (response) {
        if (response.length > 0) {
          const [lon, lat] = [response[0].lon, response[0].lat];
          return [parseFloat(lon), parseFloat(lat)];
        } else {
          throw new Error('Address not found');
        }
      }else {throw new Error('Address not found')}
    });
  }

  private initializeMap(coordinates: [number, number]) {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat(coordinates),
        zoom: 12
      })
    });

    // Agregar marcador
    const marker = new Feature({
      geometry: new Point(fromLonLat(coordinates))
    });

    const markerStyle = new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: 'https://openlayers.org/en/latest/examples/data/icon.png' // Icono del marcador
      })
    });

    marker.setStyle(markerStyle);

    const vectorSource = new VectorSource({
      features: [marker]
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource
    });

    this.map.addLayer(vectorLayer);
  }

}
