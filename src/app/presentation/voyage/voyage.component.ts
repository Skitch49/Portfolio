import { Component, OnInit } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader";

@Component({
  selector: 'app-voyage',
  templateUrl: './voyage.component.html',
  styleUrls: ['./voyage.component.scss']
})
export class VoyageComponent implements OnInit {

  center: any;
  infoWindow: any;
  pointsInteret: any[] = [];
  currentMarker: google.maps.Marker;

  constructor() { }

  ngOnInit() {
    const loader = new Loader({
      apiKey: "AIzaSyA3Wzw6wNkRyQ2ZF143gxOofa19qtfjdlU", // Remplacez par votre clé d'API Google Maps
      version: "weekly",
    });

    loader.load().then(async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
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
              scale: 10
            }
          });

          this.initMap();
        }, error => {
          console.error('Erreur de géolocalisation : ', error);
          this.center = { lat: 48.8584, lng: 2.2945 };
          this.initMap();
        });
      } else {
        this.center = { lat: 48.8584, lng: 2.2945 };
        this.initMap();
      }
    });
  }

  initMap() {
    const mapOptions = {
      zoom: 6,
      center: this.center
    };

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);


        // Liste des points d'intérêt, y compris la position de l'utilisateur
        this.pointsInteret.push(
          {
            nom: 'Paris',
            position: { lat: 48.8588897, lng: 2.320041 }
          },
          {
            nom: 'La Rochelle',
            position: { lat: 46.1591126, lng: -1.1520434 }
          },
          {
            nom: 'Nantes',
            position: { lat: 47.2181, lng: -1.5528 }
          },
          {
            nom: 'Angers',
            position: { lat: 47.4784, lng: -0.5632 }
          },
          {
            nom: 'Saumur',
            position: { lat: 47.2602, lng: -0.0781 }
          },
          {
            nom: 'Tours',
            position: { lat: 47.3941, lng: 0.6848 }
          },
          {
            nom: 'Le Mans',
            position: { lat: 48.0061, lng: 0.1996 }
          },
          {
            nom: 'Pornic',
            position: { lat: 47.1170, lng: -2.0806 }
          },
          {
            nom: 'Saint-Jean-de-Monts',
            position: { lat: 46.7980, lng: -2.1176 }
          },
          {
            nom: 'Les Sables-d\'Olonne',
            position: { lat: 46.4998, lng: -1.7837 }
          },
          {
            nom: 'Royan',
            position: { lat: 45.6280, lng: -1.0289 }
          },
          {
            nom: 'La Grande-Motte',
            position: { lat: 43.5567, lng: 4.0834 }
          },
          {
            nom: 'Futuroscope',
            position: { lat: 46.6667, lng: 0.3667 }
          },
          {
            nom: 'Thouars',
            position: { lat: 46.9818, lng: -0.2087 }
          },
          {
            nom: 'Mandailles',
            position: { lat: 44.5294, lng: 2.7277 }
          },
          {
            nom: 'Nîmes',
            position: { lat: 43.8374, lng: 4.3601 }
          },
          {
            nom: 'Madrid',
            position: { lat: 40.4168, lng: -3.7038 }
          },
          {
            nom: 'Antalya',
            position: { lat: 36.8969, lng: 30.7133 }
          },
          {
            nom: 'Tunis',
            position: { lat: 36.8065, lng: 10.1815 }
          },
          {
            nom: 'Cannes',
            position: { lat: 43.5528, lng: 7.0174 }
          },
          {
            nom: 'Nice',
            position: { lat: 43.7102, lng: 7.2620 }
          },
          {
            nom: 'Monaco',
            position: { lat: 43.7384, lng: 7.4246 }
          },
          {
            nom: 'Menton',
            position: { lat: 43.7750, lng: 7.4970 }
          },
          {
            nom: 'Chartres',
            position: { lat: 48.4439, lng: 1.4890 }
          },
          {
            nom: 'Phare du cap Fréhel',
            position: { lat: 48.68411372890535, lng: -2.318787480958804 }
          },
          {
            nom: 'Erquy',
            position: { lat: 48.6328, lng: -2.4679 }
          },
          {
            nom: 'Guérande',
            position: { lat: 47.3267, lng: -2.4189 }
          },
          {
            nom: 'Noirmoutier',
            position: { lat: 47.0039, lng: -2.2400 }
          },
          {
            nom: 'Ile de Ré',
            position: { lat: 46.1795, lng: -1.3217 }
          },
          {
            nom: 'Ile d\'Oléron',
            position: { lat: 45.9546, lng: -1.3064 }
          },
          {
            nom: 'Fort Boyard',
            position: { lat: 45.9981, lng: -1.2146 }
          },
          {
            nom: 'Saint Brevin',
            position: { lat: 47.2443, lng: -2.1770 }
          },
          {
            nom: 'La Bernerie en Retz',
            position: { lat: 47.0962, lng: -2.0285 }
          },
          {
            nom: 'Saint Hilaire de Riez',
            position: { lat: 46.7329, lng: -1.9580 }
          },
          {
            nom: 'Bretignolles sur Mer',
            position: { lat: 46.6264, lng: -1.8756 }
          },
          {
            nom: 'Niort',
            position: { lat: 46.3241, lng: -0.4585 }
          }
    
          
          // Ajoutez d'autres points d'intérêt selon vos besoins
        );

    // Créer une instance d'info-bulle
    this.infoWindow = new google.maps.InfoWindow();

    this.pointsInteret.forEach(point => {
      const marker = new google.maps.Marker({
        position: point.position,
        map: map,
        title: point.nom,
        animation: google.maps.Animation.DROP,
        icon: point.icon
      });

      marker.addListener('click', () => {
        if (this.currentMarker && this.currentMarker === marker) {
          this.infoWindow.close();
          this.currentMarker = null;
        } else {
          this.infoWindow.setContent(point.nom);
          this.infoWindow.open(map, marker);
          this.currentMarker = marker;
        }
      });
    });
  }
}