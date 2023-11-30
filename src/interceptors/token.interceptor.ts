import {inject, Injectable, InjectionToken} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export const MEILI_API_KEY = new InjectionToken<string>('MeiliSearch API key');

@Injectable()
export class TokenInterceptor implements HttpInterceptor {


  private readonly apiKey = inject(MEILI_API_KEY);


  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const header = 'Bearer ' + this.apiKey;
    const headers = req.headers.set('Authorization', header);
    req = req.clone({ headers });
    return next.handle(req);
  }

}
