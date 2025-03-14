import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Konsumen } from 'src/users/entities/konsumen.entity';
import { Umkm } from 'src/users/entities/umkm.entity';
import { Repository } from 'typeorm';
import { Post as PostEntity } from '../entities/post.entity';
import { CreatePostDto } from '../dto/post-action.dto';
import { FilterPostDto } from '../dto/filter-post.dto';
import {
  BadRequestMessage,
  CreatedMessage,
  OkMessage,
  ResponsMessage,
} from 'src/commons/enums/response-message.enum';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Konsumen)
    private konsumenRepository: Repository<Konsumen>,
    @InjectRepository(Umkm)
    private umkmRepository: Repository<Umkm>,
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  async createPost(
    username: string,
    createPostDto: CreatePostDto,
    media?: Express.Multer.File,
  ) {
    const konsumen = await this.konsumenRepository.findOne({
      where: { username: username },
      relations: { umkm: { posts: true } },
    });
    if (!konsumen)
      throw new NotFoundException(ResponsMessage.KONSUMEN_NOT_FOUND);
    if (!konsumen.umkm)
      throw new UnauthorizedException(ResponsMessage.UNAUTHORIZED);

    const { description } = createPostDto;
    const fileUrl = media
      ? `https://be-intern.bccdev.id/zhafif/${media.filename}`
      : '';
    const post = await this.postRepository.save({
      media: `${fileUrl}`,
      description,
    });

    if (!konsumen.umkm.posts) {
      konsumen.umkm.posts = [post];
    } else {
      konsumen.umkm.posts.push(post);
    }

    await this.umkmRepository.save(konsumen.umkm);
    return {
      posts: konsumen.umkm.posts,
      message: CreatedMessage.POST,
      statusCode: HttpStatus.CREATED,
    };
  }

  async deletePost(username: string, postId: string) {
    const konsumen = await this.konsumenRepository.findOne({
      where: { username: username },
      relations: { umkm: { posts: true } },
    });
    if (!konsumen)
      throw new NotFoundException(ResponsMessage.KONSUMEN_NOT_FOUND);
    if (!konsumen.umkm)
      throw new UnauthorizedException(ResponsMessage.UNAUTHORIZED);
    if (!konsumen.umkm.posts)
      throw new BadRequestException(BadRequestMessage.NO_POST);

    const initLength = konsumen.umkm.posts.length;

    konsumen.umkm.posts = konsumen.umkm.posts.filter(
      (p) => p.postID !== postId,
    );
    const currentLength = konsumen.umkm.posts.length;

    if (currentLength !== initLength - 1)
      throw new BadRequestException('Post does not exist');

    await this.umkmRepository.save(konsumen.umkm);
    return {
      posts: konsumen.umkm.posts,
      message: OkMessage.DELETE_POST,
      statusCode: HttpStatus.OK,
    };
  }

  async filterPost(filterPostDto: FilterPostDto) {
    const { category, province, city, top, latest } = filterPostDto;

    if (category) {
      return await this.postRepository
        .createQueryBuilder('post')
        .innerJoin('post.umkm', 'umkm')
        .innerJoin('umkm.categories', 'category')
        .addSelect(['umkm.umkmID', 'umkm.fullname'])
        .where('category.value ILIKE :category', { category: `%${category}%` })
        .orderBy('post.upvotes', 'DESC')
        .addOrderBy('post.createdAt', 'DESC')
        .getMany();
    }

    if (province) {
      return await this.postRepository
        .createQueryBuilder('post')
        .innerJoin('post.umkm', 'umkm')
        .addSelect(['umkm.umkmID', 'umkm.fullname'])
        .where('umkm.province ILIKE :province', { province: `%${province}%` })
        .orderBy('post.upvotes', 'DESC')
        .addOrderBy('post.createdAt', 'DESC')
        .getMany();
    }

    if (city) {
      return await this.postRepository
        .createQueryBuilder('post')
        .innerJoin('post.umkm', 'umkm')
        .addSelect(['umkm.umkmID', 'umkm.fullname'])
        .where('umkm.city ILIKE :city', { city: `%${city}%` })
        .orderBy('post.upvotes', 'DESC')
        .addOrderBy('post.createdAt', 'DESC')
        .getMany();
    }

    if (top) {
      return await this.postRepository
        .createQueryBuilder('post')
        .innerJoin('post.umkm', 'umkm')
        .addSelect(['umkm.umkmID', 'umkm.fullname'])
        .orderBy('post.upvotes', 'DESC')
        .getMany();
    }

    if (latest) {
      return await this.postRepository
        .createQueryBuilder('post')
        .innerJoin('post.umkm', 'umkm')
        .addSelect(['umkm.umkmID', 'umkm.fullname'])
        .orderBy('post.createdAt', 'DESC')
        .getMany();
    }

    return [];
  }

  getFeed() {
    return this.postRepository.find({
      take: 100,
      order: { createdAt: 'DESC', upvotes: 'DESC' },
    });
  }
}
