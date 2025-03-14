export enum ResponsMessage {
  KONSUMEN_NOT_FOUND = 'Konsumen is not found',
  UNAUTHORIZED = 'Konsumen does now own a UMKM',
}

export enum BadRequestMessage {
  KONSUMEN_NOT_REGISTERED = 'You need to register as konsumen first',
}

export enum ConflictMessage {
  MORE_THAN_ONE_UMKM = 'User already has an UMKM. Only 1 UMKM is allowed for each users',
}
