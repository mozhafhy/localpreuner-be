import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({ example: '7a89dbeb-b01b-4431-b840-e26f021e7fde' })
  id: string;

  @ApiProperty({ example: 'BnB' })
  value: string;
}

export class UmkmDto {
  @ApiProperty({ example: '8c3d6bdb-2c1a-4e2e-b021-3fa7d07e5619' })
  umkmID: string;

  @ApiProperty({ example: 'Abi Yu Arhab' })
  fullname: string;

  @ApiProperty({ example: '1111222233334455' })
  nik: string;

  @ApiProperty({ example: 'Jl. Jalan-Jalan No. 3' })
  fullAddress: string;

  @ApiProperty({ example: 'Jawa Timur' })
  province: string;

  @ApiProperty({ example: 'Malang' })
  city: string;

  @ApiProperty({ example: null, nullable: true })
  profileImg: string;

  @ApiProperty({ example: null, nullable: true })
  banner: string;

  @ApiProperty({ example: 'Ini adalah akun resmi UD Jaya Bangunan Abadi' })
  description: string;

  @ApiProperty({ example: [] })
  posts: any[];

  @ApiProperty({ example: [] })
  socialMedias: any[];

  @ApiProperty({ isArray: true, type: CategoryDto })
  categories: CategoryDto[];
}

export class KonsumenDto {
  @ApiProperty({ example: 'af083002-0d12-4d06-adff-444b2214b82f' })
  konsumenID: string;

  @ApiProperty({ example: 'UD Jaya Bangunan Abadi' })
  displayName: string;

  @ApiProperty({ example: 'mochammadzhafif1123@gmail.com' })
  email: string;

  @ApiProperty({ example: 'abiyyu12345' })
  password: string;

  @ApiProperty({ example: 'abiyyu11234' })
  username: string;

  @ApiProperty({ type: UmkmDto })
  umkm: UmkmDto;
}

export class ResponseDto {
  @ApiProperty({ type: KonsumenDto })
  konsumen: KonsumenDto;
}
