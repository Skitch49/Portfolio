import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-voyage',
  templateUrl: './voyage.component.html',
  styleUrls: ['./voyage.component.scss'],
})
export class VoyageComponent implements OnInit {
  center: any;
  infoWindow: any;
  pointsInteret: any[] = [];
  currentMarker: google.maps.Marker;

  constructor() {}

  ngAfterViewInit(): void {
    window.scrollTo({
      top: 2000,
      behavior: 'smooth',
    });
  }

  ngOnInit() {
    const loader = new Loader({
      apiKey: 'AIzaSyA3Wzw6wNkRyQ2ZF143gxOofa19qtfjdlU', // Remplacez par votre clé d'API Google Maps
      version: 'weekly',
    });

    loader.load().then(async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.center = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            this.pointsInteret.push({
              nom: 'Vous êtes ici',
              position: this.center,
              animation: google.maps.Animation.DROP,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: 'blue',
                fillOpacity: 1,
                strokeColor: 'white',
                strokeWeight: 2,
                scale: 10,
              },
            });

            this.initMap();
          },
          (error) => {
            console.error('Erreur de géolocalisation : ', error);
            this.center = { lat: 48.8584, lng: 2.2945 };
            this.initMap();
          }
        );
      } else {
        this.center = { lat: 48.8584, lng: 2.2945 };
        this.initMap();
      }
    });
  }

  initMap() {
    const mapOptions = {
      zoom: 5.3,
      center: this.center,
    };

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Liste des points d'intérêt, y compris la position de l'utilisateur
    this.pointsInteret.push(
      {
        nom: 'Paris',
        position: { lat: 48.8588897, lng: 2.320041 },
      },
      {
        nom: 'La Rochelle',
        position: { lat: 46.1591126, lng: -1.1520434 },
      },
      {
        nom: 'Nantes',
        position: { lat: 47.2181, lng: -1.5528 },
      },
      {
        nom: 'Angers',
        position: { lat: 47.4784, lng: -0.5632 },
      },
      {
        nom: 'Tours',
        position: { lat: 47.3941, lng: 0.6848 },
      },
      {
        nom: 'Le Mans',
        position: { lat: 48.0061, lng: 0.1996 },
      },
      {
        nom: 'Pornic',
        position: { lat: 47.117, lng: -2.0806 },
      },
      {
        nom: 'Saint-Jean-de-Monts',
        position: { lat: 46.798, lng: -2.1176 },
      },
      {
        nom: "Les Sables-d'Olonne",
        position: { lat: 46.4998, lng: -1.7837 },
      },
      {
        nom: 'Royan',
        position: { lat: 45.628, lng: -1.0289 },
      },
      {
        nom: 'La Grande-Motte',
        position: { lat: 43.5567, lng: 4.0834 },
      },
      {
        nom: 'Mandailles',
        position: { lat: 44.5294, lng: 2.7277 },
      },
      {
        nom: 'Nîmes',
        position: { lat: 43.8374, lng: 4.3601 },
      },
      {
        nom: 'Madrid',
        position: { lat: 40.4168, lng: -3.7038 },
      },
      {
        nom: 'Seville',
        position: { lat: 37.3891, lng: -5.9845 },
      },
      {
        nom: 'Malaga',
        position: { lat: 36.7213, lng: -4.4214 },
      },
      {
        nom: 'Saint Malo',
        position: { lat: 48.6493, lng: -2.0256 },
      },
      {
        nom: 'Dinan',
        position: { lat: 48.4543, lng: -2.0477 },
      },
      {
        nom: 'Le Mont Saint Michel',
        position: { lat: 48.6361, lng: -1.5115 },
      },
      {
        nom: 'Caen',
        position: { lat: 49.1829, lng: -0.37 },
      },

      {
        nom: 'Antalya',
        position: { lat: 36.8969, lng: 30.7133 },
      },
      {
        nom: 'Tunis',
        position: { lat: 36.8065, lng: 10.1815 },
      },
      {
        nom: 'Cannes',
        position: { lat: 43.5528, lng: 7.0174 },
      },
      {
        nom: 'Nice',
        position: { lat: 43.7102, lng: 7.262 },
      },
      {
        nom: 'Monaco',
        position: { lat: 43.7384, lng: 7.4246 },
      },
      {
        nom: 'Menton',
        position: { lat: 43.775, lng: 7.497 },
      },
      {
        nom: 'Chartres',
        position: { lat: 48.4439, lng: 1.489 },
      },
      {
        nom: 'Erquy',
        position: { lat: 48.6328, lng: -2.4679 },
      },
      {
        nom: 'Guérande',
        position: { lat: 47.3267, lng: -2.4189 },
      },
      {
        nom: 'Biarritz',
        position: { lat: 43.4832523, lng: -1.5592776 },
      },
      {
        nom: 'Angoulême',
        position: { lat: 45.6484505, lng: 0.1561947 },
      },
      {
        nom: 'Bordeaux',
        position: { lat: 44.841225, lng: -0.5800364 },
      },
      {
        nom: 'Lourdes',
        position: { lat: 43.0940904, lng: -0.0464975 },
      },
      {
        nom: 'Pic de Madaméte',
        position: { lat: 42.8579228, lng: 0.1366154 },
      },
      {
        nom: 'Saint-Lary-Soulan',
        position: { lat: 42.816936, lng: 0.3219538 },
      },
      {
        nom: 'Mont Perdu',
        position: { lat: 42.6755485, lng: 0.0343568 },
      },
      {
        nom: 'Pau',
        position: { lat: 43.2957547, lng: -0.3685668 },
      },
      {
        nom: 'Dune du Pilat',
        position: { lat: 44.597758, lng: -1.206551 },
      },
      {
        nom: 'La Canée',
        position: { lat: 35.5155, lng: 24.0207 },
      },
      {
        nom: 'Réthymnon',
        position: { lat: 35.3668, lng: 24.476 },
      },
      {
        nom: 'Matala',
        position: { lat: 34.9935604319572, lng: 24.749431588368672 },
      },
      {
        nom: 'Héraklion',
        position: { lat: 35.3404, lng: 25.1442 },
      },
      {
        nom: 'Agios Nikolaos',
        position: { lat: 35.1887, lng: 25.7154 },
      }
    );

    this.infoWindow = new google.maps.InfoWindow();

    this.pointsInteret.forEach((point) => {
      const marker = new google.maps.Marker({
        position: point.position,
        map: map,
        title: point.nom,
        animation: google.maps.Animation.DROP,
        icon: point.icon,
      });

      marker.addListener('click', () => {
        if (this.currentMarker && this.currentMarker === marker) {
          this.infoWindow.close();
          this.currentMarker = null;
        } else {
          this.infoWindow.setContent(
            '<div class="info-window">' + point.nom + '</div>'
          );

          this.infoWindow.open(map, marker);
          this.currentMarker = marker;
        }
      });
    });
  }
}
