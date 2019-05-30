import {
  Component,
  OnInit
} from '@angular/core';
import {
  PostApiService
} from '../../services/api';
import {
  PostModel,
} from '../shared/models';
import {
  UserService
} from '../../services';
import {
  CryptoUtilities
} from '../shared/utilities';
import {
  ActivatedRoute
} from '@angular/router';
import { NgxLinkifyjsService, Link } from 'ngx-linkifyjs';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor (
    private postApiService: PostApiService,
    private route: ActivatedRoute,
    public linkifyService: NgxLinkifyjsService
  ) { }

  protected posts: PostModel[] = [];
  protected user = UserService.getUser();
  private limit = 5;
  private offset = 10;
  private routeSubscriber: any;

  public ngOnInit (): void {
    this.routeSubscriber = this.route
      .queryParams
      .subscribe(params => {
        if (params.postId) {
          const postId = params.postId && parseFloat(CryptoUtilities.decipher(params.postId));
          this.getSinglePost(postId);
          return;
        }
        this.getPosts();
      });
  }

  private getPosts (): void {
    this.postApiService.promiseGetAllPost(10, 0)
      .then((responseData: PostModel[]) => {
        this.posts = responseData;
        // console.log('posts', this.posts);
        this.posts.forEach(async post => {
          let findUrl: Link[] = await this.linkifyService.find(post.message);
          if (findUrl.length > 0 && findUrl[0].type === 'url') {
            let regex = new RegExp((findUrl[0].value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            this.postApiService.promiseGetJsonForLinkPreview(encodeURIComponent(findUrl[0].href))
              .then((res: any) => {
                post.message = `${(post.message.replace(regex, ' ')).trim()}
                  <div class="link-preview">
                    <div class="link-area">
                    <div class="og-image">
                      <a href="${res.data.url}" target="_blank">
                        <img src="${res.data.image}" alt="logo" />
                      </a>
                    </div>
                    <div class="descriptions">
                      <div class="og-title">${res.data.title}</div>
                      <div class="og-description">${res.data.description}</div>
                      <div class="og-url"><a href="${res.data.url}" target="_blank"> ${res.data.url} </a> </div>
                    </div>
                    </div>
                  </div>`;
              });
          }
        });
      })
      .catch(error => {

      });
  }

  private getSinglePost (postId): void {
    this.postApiService.promiseGetPost(postId)
      .then((responseData: PostModel) => {
        this.posts = [responseData];
        // console.log('responseData', responseData);
      })
      .catch(error => {

      });
  }

  public loadRecord (): void {
    this.getPosts();
  }

  public ngOnDestroy (): void {
    this.routeSubscriber.unsubscribe();
  }
}
