import { AfterViewInit, Component, OnDestroy } from '@angular/core';

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

  constructor() {
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
        path: 'assets/audio/bitch.mp3',
        displayName: 'Bitch',
        cover: 'assets/audio/bitch.jpg',
        artist: 'Lefa feat Vald',
      },
      {
        path: 'assets/audio/lucy.mp3',
        displayName: 'Lucy',
        cover: 'assets/audio/flip.jpg',
        artist: 'Lomepal',
      },
      {
        path: 'assets/audio/si-j-arretais.mp3',
        displayName: "Si j'arrêtais",
        cover: 'assets/audio/agartha.jpg',
        artist: 'Vald',
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
      top: 2000,
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
    this.music.src = song.path;
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
    this.currentTime = this.music.currentTime;
    this.duration = this.music.duration;
    this.progressPercent = (this.currentTime / this.duration) * 100;
  }

  setProgressBar(e: MouseEvent): void {
    // const width = (e.target as HTMLElement).offsetWidth;
    // const clickX = e.offsetX;
    // this.music.currentTime = (clickX / width) * this.music.duration;

    const width = (e.target as HTMLDivElement).offsetWidth;
    const clickX = e.offsetX;
    const duration = this.music.duration;
    const newTime = (clickX / width) * duration;
    this.music.currentTime = newTime;
    console.log('width ' + width);
    console.log('e ' + width);
    console.log('target ' + e.target);
    console.log('clickX ' + clickX);
    console.log('newTime ' + newTime);
  }

  formatTime(time: number): string {
    const format = (t: number): string =>
      String(Math.floor(t)).padStart(2, '0');
    const minutes = format(time / 60);
    const seconds = format(time % 60);
    return `${minutes}:${seconds}`;
  }

  ngOnInit(): void {
    this.loadMusic(this.songs[this.musicIndex]);
    this.music.addEventListener('ended', () => this.changeMusic(1));
    this.music.addEventListener('timeupdate', () => this.updateProgressBar());
  }

  ngOnDestroy(): void {
    if (this.music) {
      this.music.pause();
      this.music = null;
    }
  }
}
