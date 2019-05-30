import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';

@Injectable()
export class MetaService {
  constructor (
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private meta: Meta,
  ) {}

  public init (): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => route.firstChild),
      switchMap(route => route.data),
      map((data) => {
        if (data.meta && data.meta.length > 0) {
          // If a route has a meta set (e.g. data: {meta: [{name: 'twitter:card', content: 'summary_large_image'}]}) then we use it
          return data.meta;
        }

        return [];
      })
    )
    .subscribe((metaData) => {
      metaData.forEach(meta => {
        this.meta.addTag(meta);
      });
    });
  }
}
