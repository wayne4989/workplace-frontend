import {
  Component,
  OnInit,
  Input,
  Output,
  NgZone,
  EventEmitter,
  ElementRef
} from '@angular/core';
import {
  FileUploader,
  FileUploaderOptions,
  ParsedResponseHeaders
} from 'ng2-file-upload';
import {
  Cloudinary
} from '@cloudinary/angular-5.x';
import {
  UserService,
} from '../../../../services';
import {
  EmitterService
} from '../../emitter/emitter.component';
import {
  PostEmitter
} from '../../emitter';
import {
  UserModel
} from '../../../shared/models';

@Component({
  selector: 'shared-upload-image-component',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class SharedUploadImageComponent {
  constructor (
    private cloudinary: Cloudinary,
    private zone: NgZone,
    private elRef: ElementRef
  ) {}

  protected imagesToUpload: Array<string> = [];
  protected responses: Array<any> = [];
  protected isUploadStarted: boolean = false;
  protected isUploadComplete: boolean = false;
  protected queuedImageOrientation: Array<string> = [];
  private uploader: FileUploader;
  private hasBaseDropZoneOver: boolean = false;
  private user: UserModel = UserService.getUser();
  private uploadCompleteEmitterService = EmitterService.get('uploadCompleteEmitter');
  @Output() private uploadComplete = new EventEmitter();
  @Output() private imageIsSelected = new EventEmitter();

  @Input() private uploadOptions: any;

  public ngOnInit (): void {
    this.uploadImagesSubscriber();

    // Create the file uploader, wire it to upload to your account
    const uploaderOptions: FileUploaderOptions = {
      // cloud_name must be added on the cloudinary configuration in the shared module
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
      // url: 'https://api.cloudinary.com/v1_1/renchtolens/upload',
      autoUpload: false,
      isHTML5: true,
      queueLimit: this.uploadOptions.queueLimit,
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };

    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onAfterAddingFile = (item: any) => {
      this.imageIsSelected.emit(true);
      let reader = new FileReader();
      reader.readAsDataURL(item.file.rawFile);
      reader.onload = (ev) => {
        this.imagesToUpload.push(ev.target['result']);
        this.getImageOrientation(ev.target['result']);
      };
      return item;

    };

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // upload_preset must be added on the cloudinary configuration in the shared module
      // form.append('upload_preset', this.cloudinary.config().upload_preset);
      form.append('upload_preset', 'peersview');
      form.append('folder', this.user.token);
      form.append('file', fileItem);

      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    // Insert or update an entry in the responses array
    const upsertResponse = fileItem => {
      this.zone.run(() => {
        const existingId = this.responses.reduce((prev, current, index) => {
          if (current.file.name === fileItem.file.name && !current.status) {
            return index;
          }
          return prev;
        }, -1);
        if (existingId > -1) {
          this.responses[existingId] = Object.assign(this.responses[existingId], fileItem);
        } else {
          this.responses.push(fileItem);
        }
      });
    };

    // Update model on completion of uploading a file
    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) =>
      upsertResponse(
        {
          file: item.file,
          status,
          data: JSON.parse(response)
        }
      );

    this.uploader.onCompleteAll = () => {
      this.isUploadComplete = true;
      let postAttachments = [];
      for (let i = 0; i < this.responses.length; i++) {
        postAttachments.push({cloudinaryPublicId: this.responses[i].data.public_id, usage: 'image'});
      }

      this.uploadComplete.emit(postAttachments);
      this.imagesToUpload = [];
    };
  }

  public uploadImagesSubscriber (): void {
    PostEmitter
      .uploadImages()
      .subscribe(response => {
        if (this.imagesToUpload.length !== 0) {
          this.isUploadStarted = true;
          this.uploader.uploadAll();
        } else {
          this.uploadCompleteEmitterService.emit([]);
        }
      });
}

  protected onFileOverBase (e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  protected onRemoveFromQueue (i): void {
    this.imagesToUpload.splice(i, 1);
    this.uploader.queue.splice(i, 1);
    this.queuedImageOrientation.splice(i, 1);
    if (this.imagesToUpload.length === 0) {
      this.imageIsSelected.emit(false);
    }
  }

  private getImageOrientation (img): void {
    let self = this;
    let orientation;
    let image = new Image();
    image.src = img;

    image.onload = function (): void {
      if (this['width'] > this['height']) {
        orientation = 'landscape';
      } else {
        orientation = 'portrait';
      }
      self.queuedImageOrientation.push(orientation);
    };
  }

  /*Destroy subscriber*/
  public ngOnDestroy (): void {
    PostEmitter.removeSubscriber(PostEmitter.getUploadImagesName());
  }
}
