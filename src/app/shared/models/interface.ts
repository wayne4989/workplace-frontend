export interface IResponse {
  status: string;
  status_code: number;
  http_code: number;
  data: any;
}

// coming from the provider
export interface ISocialResponse extends Response {
  email: string;
  photoUrl: string;
  name: string;
  provider: string;
  id: string
}

export enum EAttachmentUsage {
  image = 'image',
  poster = 'poster',
  video = 'video'
}

export interface IAttachment {
  cloudinaryPublicId: string;
  usage: EAttachmentUsage;
}
