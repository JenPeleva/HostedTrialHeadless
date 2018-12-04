import {Inject, Injectable} from '@angular/core';

const sitefinityUrl = 'http://site17863115111365.srv05.sandbox.sitefinity.com';
const serviceUrl = sitefinityUrl + '/api/default/';

@Injectable({
  providedIn: 'root'
})
export class SitefinityService {
  private sitefinity: any;
  private queryInstance: any;
  //defines whether everyone or just authenticated users can access the webservices
  private _hasAuthentication: boolean = false;

  get instance(): any {
    return this.sitefinity;
  }

  get query(): any {
    return this.queryInstance;
  }

  get hasAuthentication(): boolean {
    return this._hasAuthentication;
  }

  constructor(@Inject('Sitefinity') private sf) {}

  createInstance(): Promise<boolean> {
      return new Promise<boolean>((resolve, reject) => {
        if (!this.sitefinity) {
            this.initializeInstance();
            resolve(true);
        } else {
          resolve(true);
        }
      });
  }

  private initializeInstance(){
    this.sitefinity = new this.sf({serviceUrl});
    this.sitefinity.options = {
      serviceUrl: serviceUrl
    };
    this.queryInstance = new this.sf.Query();
  }
}
