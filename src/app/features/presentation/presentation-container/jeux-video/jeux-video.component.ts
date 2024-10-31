import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SteamService } from 'src/app/shared/services/steam.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-jeux-video',
  templateUrl: './jeux-video.component.html',
  styleUrls: ['./jeux-video.component.scss'],
  animations: [
    trigger('transition', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(-100px)' }),
        animate(
          '500ms ease-in-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class JeuxVideoComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('game', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  isLarge: boolean = false;
  // Steam
  userInfo: any;
  allGames: any;
  private intervalId: any;

  private _CANVAS: any;
  private _CONTEXT: any;
  private _CURSOR!: any;

  colorList = [
    '#6B0119',
    '#BD0037',
    '#FF4500',
    '#FEA800',
    '#FFD435',
    '#FEF8B9',
    '#01A267',
    '#09CC76',
    '#7EEC57',
    '#02756D',
    '#009DAA',
    '#00CCBE',
    '#244FA4',
    '#3790EA',
    '#52E8F3',
    '#4839BF',
    '#695BFF',
    '#94B3FF',
    '#801D9F',
    '#B449BF',
    '#E4ABFD',
    '#DD117E',
    '#FE3781',
    '#FE99A9',
    '#000',
    '#6D462F',
    '#9B6926',
    '#FEB470',
    '#525252',
    '#888D90',
    '#D5D6D8',
    '#FFF',
  ];
  currentColorChoice = '#000';
  gridCellSize = 10;
  displayPixelWar: boolean = true;
  displayGames: any[] = [];
  constructor(
    private store: AngularFirestore,
    private apiSteam: SteamService,
    private fb: FormBuilder
  ) {
    this.checkScreenSize();
  }
  ngOnInit(): void {
    this.getUserInfoSteam();
    this.getUserGame();
    this.changeLimit();
    this.changeSort();
    this.intervalId = setInterval(() => {
      this.getUserInfoSteam();
    }, 20000);
  }

  checkScreenSize() {
    this.isLarge = window.innerWidth >= 1200;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.checkScreenSize.bind(this));
    document.removeEventListener('keydown', this.moveWithKeyboard.bind(this));
    clearInterval(this.intervalId);
  }

  moveWithKeyboard(e: KeyboardEvent) {
    const activeElement = document.activeElement as HTMLElement;
  
    // Ne pas exécuter moveWithKeyboard si le focus est sur un input
    if (activeElement.tagName === 'INPUT') {
      return;
    }
  
    e.preventDefault(); // Empêche le comportement par défaut uniquement quand le focus est sur le canvas
  
    const top = parseInt(this._CURSOR.style.top, 10) || 0;
    const left = parseInt(this._CURSOR.style.left, 10) || 0;
  
    switch (e.code) {
      case 'ArrowUp':
        if (top - this.gridCellSize >= 0) {
          this._CURSOR.style.top = top - this.gridCellSize + 'px';
        }
        break;
      case 'ArrowDown':
        if (top + this.gridCellSize < this._CANVAS.height) {
          this._CURSOR.style.top = top + this.gridCellSize + 'px';
        }
        break;
      case 'ArrowLeft':
        if (left - this.gridCellSize >= 0) {
          this._CURSOR.style.left = left - this.gridCellSize + 'px';
        }
        break;
      case 'ArrowRight':
        if (left + this.gridCellSize < this._CANVAS.width) {
          this._CURSOR.style.left = left + this.gridCellSize + 'px';
        }
        break;
      case 'Space':
        const x = this._CURSOR.offsetLeft;
        const y = this._CURSOR.offsetTop - this._CANVAS.offsetTop;
        if (this.currentColorChoice === '#FFF') {
          this.deletePixel(x, y);
        } else {
          this.createPixel(x, y, this.currentColorChoice);
          const pixel = { x: x, y: y, color: this.currentColorChoice };
          const pixelRef = this.store
            .collection('pixels')
            .doc(`${pixel.x}-${pixel.y}`);
  
          pixelRef.set(pixel, { merge: true }).catch((error) => {
            this.displayPixelWar = false;
            console.error('Erreur lors de la création du pixel: ', error);
          });
        }
        break;
    }
  }
  
  initCanvas() {
    this._CANVAS = this.canvas.nativeElement;
    this._CONTEXT = this._CANVAS.getContext('2d');
    this._CANVAS.width = 1200;
    this._CANVAS.height = 600;
    this._CURSOR = document.querySelector('#cursor') as HTMLElement;

    this.drawGrids(
      this._CONTEXT,
      this._CANVAS.width,
      this._CANVAS.height,
      this.gridCellSize,
      this.gridCellSize
    );

    // Initialise les pixels depuis Firebase
    this.store
      .collection('pixels')
      .get()
      .subscribe((snapshot) => {
        snapshot.forEach((doc: any) => {
          const { x, y, color } = doc.data();
          this.createPixel(x, y, color);
        });
      });
  }
  ngAfterViewInit(): void {
    this.initCanvas();
    document.addEventListener('keydown', this.moveWithKeyboard.bind(this));
    this._CANVAS.addEventListener('click', () => {
      this._CANVAS.focus();
    });
  
    window.scrollTo({
      top: 975,
      behavior: 'smooth',
    });
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const activeElement = document.activeElement as HTMLElement;
  
    if (activeElement === this._CANVAS) {
      this.moveWithKeyboard(event);
    }
  }
  createPixel(x, y, color) {
    this._CONTEXT.beginPath();
    this._CONTEXT.fillStyle = color;
    this._CONTEXT.fillRect(x, y, this.gridCellSize, this.gridCellSize);
  }
  deletePixel(x, y) {
    const pixelRef = this.store.collection('pixels').doc(`${x}-${y}`);
    pixelRef
      .delete()
      .then(() => {
        this._CONTEXT.beginPath();
        this._CONTEXT.fillStyle = '#E6E6E6';
        this._CONTEXT.fillRect(x, y, this.gridCellSize, this.gridCellSize);
        this._CONTEXT.clearRect(
          x + 1,
          y + 1,
          this.gridCellSize - 2,
          this.gridCellSize - 2
        );
      })

      .catch((error) => {
        this.displayPixelWar = false;
        console.error('Erreur lors de la suppression du pixel: ', error);
      });
  }
  clickOnCanvas() {
    const x = this._CURSOR.offsetLeft;
    const y = this._CURSOR.offsetTop - this._CANVAS.offsetTop;
    if (this.currentColorChoice === '#FFF') {
      this.deletePixel(x, y);
    } else {
      this.createPixel(x, y, this.currentColorChoice);
      // ajoute le pixel dans firebase
      const pixel = { x: x, y: y, color: this.currentColorChoice };
      const pixelRef = this.store
        .collection('pixels')
        .doc(`${pixel.x}-${pixel.y}`);

      pixelRef.set(pixel, { merge: true }).catch((error) => {
        this.displayPixelWar = false;
        console.error('Erreur lors de la création du pixel: ', error);
      });
    }
  }

  changeColorChoice(color) {
    this.currentColorChoice = color;
  }

  drawGrids(ctx, width, height, cellWidth, cellHeight) {
    ctx.beginPath();
    ctx.strokeStyle = '#ccc';

    for (let i = 0; i < width; i++) {
      ctx.moveTo(i * cellWidth, 0);
      ctx.lineTo(i * cellWidth, height);
    }
    for (let j = 0; j < height; j++) {
      ctx.moveTo(0, j * cellHeight);
      ctx.lineTo(width, j * cellHeight);
    }
    ctx.stroke();
  }
  moveCanvas(event) {
    const canvasRect = this._CANVAS.getBoundingClientRect();

    const x = event.clientX - canvasRect.left;
    const y = event.layerY - this._CANVAS.offsetTop;

    const gridX = Math.floor(x / this.gridCellSize) * this.gridCellSize;
    const gridY = Math.floor(y / this.gridCellSize) * this.gridCellSize;

    this._CURSOR.style.left = gridX + 'px';
    this._CURSOR.style.top = gridY + 'px';

    if (Math.floor(y / this.gridCellSize) * this.gridCellSize < 0) {
      this._CURSOR.style.top = '0px';
    }
    if (Math.floor(x / this.gridCellSize) * this.gridCellSize < 0) {
      this._CURSOR.style.left = '0px';
    }
  }

  getUserInfoSteam() {
    this.apiSteam.getUser().subscribe((data) => {
      this.userInfo = data.response.players[0];

    });
  }
  getUserGame() {
    this.apiSteam.getUserGame().subscribe((data) => {
      this.allGames = data.response;
      this.allGames.games.sort((a, b) => {
        return b.playtime_forever - a.playtime_forever;
      });
      this.displayGames = this.allGames.games.slice(0, this.limit?.value - 1);
    });
  }
  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = '../../../../../assets/images/steam.webp';
  }
  public formSteamGames: FormGroup = this.fb.group({
    sort: ['maxPlaytime', Validators.required],
    limit: [
      30,
      Validators.compose([
        Validators.required,
        Validators.min(1),
        Validators.pattern(/^\d+$/),
      ]),
    ],
  });

  get sort() {
    return this.formSteamGames.get('sort');
  }
  get limit() {
    return this.formSteamGames.get('limit');
  }
  changeLimit() {
    this.limit?.valueChanges.subscribe((limit) => {
      const maxLimit = this.allGames.games.length;
      if (limit > maxLimit){
        this.limit?.setValue(maxLimit)
      }
      console.log(limit);
      this.displayGames = this.allGames.games.filter((game) => {
        return game.rtime_last_played > 0 || game.playtime_forever > 0;
      });
      this.applySortandLimit(this.sort?.value, limit);

      console.log(this.displayGames);
    });
  }

  changeSort() {
    this.sort?.valueChanges.subscribe((sort) => {
      this.displayGames = this.allGames.games.filter((game) => {
        return game.rtime_last_played > 0 || game.playtime_forever > 0;
      });
      this.applySortandLimit(sort, this.limit?.value);
    });
  }

  private applySortandLimit(sort, limit) {
    if (sort === 'maxPlaytime') {
      this.displayGames = this.displayGames
        .sort((a, b) => {
          return b.playtime_forever - a.playtime_forever;
        })
        .slice(0, limit);
    } else if (sort === 'lessPlaytime') {
      this.displayGames = this.displayGames
        .sort((a, b) => {
          return a.playtime_forever - b.playtime_forever;
        })
        .slice(0, limit);
    } else if (sort === 'launchRecently') {
      this.displayGames = this.displayGames
        .sort((a, b) => {
          return b.rtime_last_played - a.rtime_last_played;
        })
        .slice(0, limit);
    } else {
      this.displayGames = this.displayGames
        .sort((a, b) => {
          return a.rtime_last_played - b.rtime_last_played;
        })
        .slice(0, limit);
    }
  }
  formatDate(value: number) {
    const dateValue = new Date(value * 1000);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (
      dateValue.getFullYear() === today.getFullYear() &&
      dateValue.getMonth() === today.getMonth() &&
      dateValue.getDate() === today.getDate()
    ) {
      return "Aujourd'hui";
    } else if (
      dateValue.getFullYear() === yesterday.getFullYear() &&
      dateValue.getMonth() === yesterday.getMonth() &&
      dateValue.getDate() === yesterday.getDate()
    ) {
      return 'Hier';
    } else if (dateValue.getFullYear() === today.getFullYear()) {
      return dateValue.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
      });
    } else {
      return dateValue.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    }
  }
 
  
}
