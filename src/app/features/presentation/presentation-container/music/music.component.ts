import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval, Subscription, switchMap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SpotifyService } from 'src/app/shared/services/spotify.service';

interface Song {
  path: string;
  displayName: string;
  cover: string;
  artist: string;
}

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
})
export class MusicComponent implements OnDestroy, AfterViewInit {
  imageSrc: string;
  currentSong: Song;
  currentTime: number;
  duration: number;
  progressPercent: number;
  isPlaying: boolean;
  music: HTMLAudioElement;
  songs: Song[];
  musicIndex: number;
  //Spotify
  topTracks: any[] = [];
  currentTrack: any;
  isLoggedIn = false;

  private subscription: Subscription = new Subscription();

  constructor(
    private spotifyService: SpotifyService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.imageSrc = '';
    this.currentSong = {} as Song;
    this.currentTime = 0;
    this.duration = 0;
    this.progressPercent = 0;
    this.isPlaying = false;
    this.music = new Audio();

    this.songs = [
      {
        path: 'assets/audio/life.mp3',
        displayName: 'Life',
        cover: 'assets/audio/life.jpg',
        artist: 'Hamza',
      },
      {
        path: 'assets/audio/laisse-tomber.mp3',
        displayName: 'Laisse tomber',
        cover: 'assets/audio/v.jpg',
        artist: 'Vald',
      },
      {
        path: 'assets/audio/casino.mp3',
        displayName: 'Casino',
        cover: 'assets/audio/casino.jpg',
        artist: 'Disiz',
      },
      {
        path: 'assets/audio/si-j-arretais.mp3',
        displayName: "Si j'arrêtais",
        cover: 'assets/audio/agartha.jpg',
        artist: 'Vald',
      },
      {
        path: 'assets/audio/lucy.mp3',
        displayName: 'Lucy',
        cover: 'assets/audio/flip.jpg',
        artist: 'Lomepal',
      },
      {
        path: 'assets/audio/bitch.mp3',
        displayName: 'Bitch',
        cover: 'assets/audio/bitch.jpg',
        artist: 'Lefa feat Vald',
      },
      {
        path: 'assets/audio/san.mp3',
        displayName: 'San',
        cover: 'assets/audio/lfef.jpg',
        artist: 'Orelsan',
      },
      {
        path: 'assets/audio/ruff-ryderz.mp3',
        displayName: 'Ruff Ryderz',
        cover: 'assets/audio/vv5.jpg',
        artist: 'Vald',
      },
      {
        path: 'assets/audio/decisions.mp3',
        displayName: 'Décisions',
        cover: 'assets/audio/mystr-jos.jpg',
        artist: 'Josman',
      },
      {
        path: 'assets/audio/elle-pleut.mp3',
        displayName: 'Elle pleut',
        cover: 'assets/audio/lev.jpg',
        artist: 'Nekfeu feat Nemir',
      },
      {
        path: 'assets/audio/diviser-pour-mieux-regner.mp3',
        displayName: 'Diviser pour mieux régner',
        cover: 'assets/audio/horizon-vertical.jpg',
        artist: 'Vald',
      },
      {
        path: 'assets/audio/uranus.mp3',
        displayName: 'Uranus',
        cover: 'assets/audio/dans-la-legende.jpg',
        artist: 'PNL',
      },
      {
        path: 'assets/audio/halloween.mp3',
        displayName: 'Halloween',
        cover: 'assets/audio/ce-monde-est-cruel.jpg',
        artist: 'Vald',
      },
      {
        path: 'assets/audio/rrm.mp3',
        displayName: 'Réalité Rap Musique',
        cover: 'assets/audio/rrm.jpg',
        artist: 'Ben PLG',
      },
      {
        path: 'assets/audio/gustame.mp3',
        displayName: 'Gustamé',
        cover: 'assets/audio/gustame.jpg',
        artist: 'Vald',
      },
      {
        path: 'assets/audio/dehors-dans-la-night.mp3',
        displayName: 'Dehors dans la night',
        cover: 'assets/audio/trinity.jpg',
        artist: 'Laylow',
      },
      {
        path: 'assets/audio/meteore.mp3',
        displayName: 'Météore',
        cover: 'assets/audio/deo-favente.jpg',
        artist: 'SCH',
      },
      {
        path: 'assets/audio/love.mp3',
        displayName: 'Λ. Lové',
        cover: 'assets/audio/ipseite.jpg',
        artist: 'Damso',
      },
      {
        path: 'assets/audio/odeur-de-l-essence.mp3',
        displayName: "L'odeur de l'essence",
        cover: 'assets/audio/civilisation.jpg',
        artist: 'Orelsan',
      },
      {
        path: 'assets/audio/aaa.mp3',
        displayName: 'aaa',
        cover: 'assets/audio/aaa.jpg',
        artist: 'Alpha Wann feat Nekfeu',
      },
      {
        path: 'assets/audio/addiction.mp3',
        displayName: 'Addiction',
        cover: 'assets/audio/paradise.jpg',
        artist: 'Hamza',
      },
      {
        path: 'assets/audio/trop-gentil.mp3',
        displayName: 'Trop gentil',
        cover: 'assets/audio/rrm2.jpg',
        artist: 'Ben PLG',
      },
      {
        path: 'assets/audio/cervelle.mp3',
        displayName: 'Cervelle',
        cover: 'assets/audio/rooftop.jpg',
        artist: 'SCH',
      },
      {
        path: 'assets/audio/humanoide.mp3',
        displayName: 'Humanoïde',
        cover: 'assets/audio/cyborg.jpg',
        artist: 'Nekfeu',
      },
      {
        path: 'assets/audio/reflexions-basses.mp3',
        displayName: 'Réflexions Basses',
        cover: 'assets/audio/xeu.jpg',
        artist: 'Vald',
      },
    ];
    this.musicIndex = 0;
  }

  ngAfterViewInit(): void {
    window.scrollTo({
      top: 975,
      behavior: 'smooth',
    });
  }

  togglePlay(): void {
    if (this.isPlaying) {
      this.pauseMusic();
    } else {
      this.playMusic();
    }
  }

  playMusic(): void {
    this.isPlaying = true;
    this.music.play();
  }

  pauseMusic(): void {
    this.isPlaying = false;
    this.music.pause();
  }

  loadMusic(song: Song): void {
    const cachedMusic = localStorage.getItem(song.path);

    if (cachedMusic) {
      this.music.src = cachedMusic;
    } else {
      this.music.src = song.path;
      localStorage.setItem(song.path, song.path);
    }

    this.currentSong = song;
    this.imageSrc = song.cover;
  }

  changeMusic(direction: number): void {
    this.musicIndex =
      (this.musicIndex + direction + this.songs.length) % this.songs.length;
    this.loadMusic(this.songs[this.musicIndex]);
    this.playMusic();
  }

  updateProgressBar(): void {
    if (!isNaN(this.music.currentTime) && !isNaN(this.music.duration)) {
      this.currentTime = this.music.currentTime;
      this.duration = this.music.duration;
      this.progressPercent = (this.currentTime / this.duration) * 100;
    }
  }

  setProgressBar(e: MouseEvent): void {
    const width = (e.target as HTMLDivElement).offsetWidth;
    const clickX = e.offsetX;
    const duration = this.music.duration;
    const newTime = (clickX / width) * duration;
    this.music.currentTime = newTime;
  }

  formatTime(time: number): string {
    const format = (t: number): string =>
      String(Math.floor(t)).padStart(2, '0');
    const minutes = format(time / 60);
    const seconds = format(time % 60);
    return `${minutes}:${seconds}`;
  }
login(): void {
    this.authService.login();
  }
  ngOnInit(): void {
    this.authService.handleAuthCallback();
    const token = this.authService.getAccessToken();
    if (token) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
      this.authService.login(); // Redirect to login if no token
    }
    this.getCurrentTrack();
    this.firstCurrentTrack();
    const firstSong = this.songs[this.musicIndex];
    this.loadMusic(firstSong);
    this.getTopTracks('medium_term', 20,'tracks');
    this.music.addEventListener('ended', () => this.changeMusic(1));
    this.music.addEventListener('timeupdate', () => this.updateProgressBar());
    this.subscribeToTimeRangeChanges();
    this.subscribeToLimitChanges();
    this.subscribeToTypeChanges();
  }

  ngOnDestroy(): void {
    if (this.music) {
      this.music.pause();
      this.music = null;
    }
    this.subscription.unsubscribe();
  }

  getTopTracks(timeRange: string, limit: number,type: string) {
    this.spotifyService.getTopTracks(timeRange, limit, type).subscribe((data) => {
      this.topTracks = data.items;
    });
  }

  getCurrentTrack() {
    if (this.isLoggedIn) {
      this.subscription.add(
        interval(20000)
          .pipe(switchMap(() => this.spotifyService.getCurrentlyPlayingTrack()))
          .subscribe((data) => {
            if (data) {
              this.currentTrack = data.item;
            } else {
              this.currentTrack = null;
            }
          })
      );
    }
  }
  firstCurrentTrack() {
    this.subscription.add(
      this.spotifyService.getCurrentlyPlayingTrack().subscribe((data) => {
        if (data) {
          this.currentTrack = data.item;
        } else {
          this.currentTrack = null;
        }
      })
    );
  }

  public formTopTrack: FormGroup = this.fb.group({
    type: ['tracks', Validators.required],
    time_range: [
      'medium_term',
      Validators.compose([Validators.required, Validators.minLength(4)]),
    ],
    limit: [20, Validators.required],
  });

  get timeRange() {
    return this.formTopTrack.get('time_range');
  }
  get limit() {
    return this.formTopTrack.get('limit');
  }

  get type() {
    return this.formTopTrack.get('type');
  }

  subscribeToTimeRangeChanges(): void {
    this.timeRange?.valueChanges.subscribe((timeRange) => {
      this.getTopTracks(timeRange, this.limit?.value, this.type?.value);
    });
  }

  subscribeToLimitChanges(): void {
    this.limit?.valueChanges.subscribe((limit) => {
      console.log('limit change' + limit);
      this.getTopTracks(this.timeRange?.value, limit, this.type?.value);
    });
  }

  subscribeToTypeChanges(): void {
    this.type?.valueChanges.subscribe((type) => {
      console.log('type change' + type);
      this.topTracks = [];
      this.getTopTracks(this.timeRange?.value, this.limit?.value, type);
    });
  }

  navigateToExternalLink(link: string) {
    window.open(link, '_blank'); // Ouvre le lien dans un nouvel onglet
  }
}
