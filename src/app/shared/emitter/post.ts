import {
  EventEmitter
} from '@angular/core';
import {
  EmitterService
} from './emitter.component';

export class PostEmitter {
  constructor () {}

  public static getPostSaveName (): string {
    return 'getPostSave';
  }

  public static getUploadImagesName (): string {
    return 'getUploadImages';
  }

  public static getUploadCompleteName (): string {
    return 'onUploadComplete';
  }

  /**
   * Sharing between SharedPostComponent
   * and SharedPostOptionsComponent
   * @summary It will call upon success in the sharing of post
   */
  public static getPostShareName (): string {
    return 'getPostShare';
  }

  public static postShare (): EventEmitter<any> {
    return EmitterService.get(PostEmitter.getPostShareName());
  }

  public static postSave (): any {
    return EmitterService.get('getPostSave');
  }

  public static uploadImages (): any {
      return EmitterService.get('getUploadImages');
  }

  public static uploadComplete (): any {
      return EmitterService.get('onUploadComplete');
  }

  public static removeSubscriber (channel): void {
    EmitterService.remove(channel);
  }
}
