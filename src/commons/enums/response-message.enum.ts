export enum ResponsMessage {
  KONSUMEN_NOT_FOUND = 'Konsumen is not found',
  UNAUTHORIZED = 'Konsumen does now own a UMKM',
}

export enum BadRequestMessage {
  KONSUMEN_NOT_REGISTERED = 'You need to register as konsumen first',
  NO_POST = 'UMKM does not have any post',
  NO_SOCIAL_MEDIA = 'Konsumen does not have social medias',
  SOCIAL_MEDIA_NOT_EXIST = 'Social media does not exist',
  POST_NOT_EXIST = 'Post does not exist',
  FILE_UPLOAD = 'Only images or videos are allowed',
}

export enum ConflictMessage {
  MORE_THAN_ONE_UMKM = 'User already has an UMKM. Only 1 UMKM is allowed for each users',
}

export enum CreatedMessage {
  POST = 'Post created successfully',
  SOCIAL_MEDIA = 'Social media added successfully',
}

export enum OkMessage {
  DELETE_POST = 'Post deleted successfully',
  DELETE_SOCIAL_MEDIA = 'Social media deleted successfully',
}
