import {
  Injectable
} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {
  NgxSpinnerService
} from 'ngx-spinner';
import {
  catchError,
  tap
} from 'rxjs/operators';
import {
  Observable
} from 'rxjs/Observable';
import {
  TokenStore
} from '../services';
import {
  CONFIG
} from '../config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor (
    private loadingBar: NgxSpinnerService
  ) {
  }

  private totalRequests: number = 0;

  private handleLoadingBar (): void {
    this.totalRequests--;
    if (this.totalRequests === 0) {
      this.loadingBar.hide();
    }
  }

  public intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.totalRequests++;
    let headers = req.clone({
      setHeaders: {
        'content-type': 'application/json',
        'token': TokenStore.getAccessToken() ? TokenStore.getAccessToken() : ''
      },
      url: `${CONFIG[CONFIG.environment].api}${req.url}`
    });
    this.loadingBar.show();
    return next.handle(headers).pipe(
      tap(res => {
        if (res instanceof HttpResponse) {
          this.handleLoadingBar();
        }
      }),
      catchError(error => {
        this.handleLoadingBar();
        throw error;
      })
    );
  }
}
