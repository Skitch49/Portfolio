import { Component, HostListener, ViewChild } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SteamService } from 'src/app/shared/services/steam.service';

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
export class JeuxVideoComponent {
  isLarge: boolean = false;
  // Steam
  userInfo: any;
  allGames: any;
  private intervalId: any;

  displayGames: any[] = [];
  constructor(private apiSteam: SteamService, private fb: FormBuilder) {
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
    clearInterval(this.intervalId);
  }

  ngAfterViewInit(): void {
    window.scrollTo({
      top: 975,
      behavior: 'smooth',
    });
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
      this.displayGames = this.allGames.games.filter(
        (game) => game.playtime_forever > 0 || game.rtime_last_played > 0
      );
      this.applySortandLimit(this.sort?.value, this.limit?.value);
    });
  }
  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = '../../../../../assets/images/steam.webp';
  }
  public formSteamGames: FormGroup = this.fb.group({
    sort: ['launchRecently', Validators.required],
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
      if (limit > maxLimit) {
        this.limit?.setValue(maxLimit);
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
