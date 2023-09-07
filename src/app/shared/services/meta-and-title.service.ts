import { Injectable, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, Event as RouterEvent, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import metaData from '../helpers/meta-data';

@Injectable({
  providedIn: 'root'
})
export class MetaAndTitleService implements OnDestroy {
  private subscription = new Subscription();

  constructor(
    private router: Router,
    private meta: Meta,
    private title: Title
  ) {
    this.subscription.add(
    this.router.events.subscribe((event: RouterEvent) => {
        if (event instanceof NavigationEnd) {
          const url = event.url;
          console.log(url)
          this.updateTitle(url);
          this.updateMetas(url);
        }
      })
    );
  }

  private updateTitle(url: string): void {
    this.title.setTitle(metaData[url].title);
  }

  private updateMetas(url: string): void {
    const oldTagDescription = this.meta.getTag('name="description"');
    const newTagDescription = {
      name: 'description',
      content: metaData[url].metas.description,
    };
    const oldTagOgTitle = this.meta.getTag('name="og:title"');
    const newTagOgTitle = {
      name: 'og:title',
      content: metaData[url].metas['og:title'],
    };
    const oldTagOgUrl = this.meta.getTag('name="og:url"');
    const newTagOgUrl = {
      name: 'og:url',
      content: url,
    };
    const oldTagOgDescription = this.meta.getTag('name="og:description"');
    const newTagOgDescription = {
      name: 'og:description',
      content: metaData[url].metas['og:description'],
    };


    oldTagDescription
      ? this.meta.updateTag(newTagDescription)
      : this.meta.addTag(newTagDescription);
    oldTagOgTitle
      ? this.meta.updateTag(newTagOgTitle)
      : this.meta.addTag(newTagOgTitle);
    oldTagOgUrl
      ? this.meta.updateTag(newTagOgUrl)
      : this.meta.addTag(newTagOgUrl);
      oldTagOgDescription
      ? this.meta.updateTag(newTagOgDescription)
      : this.meta.addTag(newTagOgDescription);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
