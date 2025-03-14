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
import { CreatePostDto } from '../dto/create-post.dto';
import { FilterPostDto } from '../dto/filter-post.dto';

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

  async creatPost(username: string, createPostDto: CreatePostDto) {
    const konsumen = await this.konsumenRepository.findOne({
      where: { username: username },
      relations: { umkm: { posts: true } },
    });
    if (!konsumen) throw new NotFoundException('Konsumen is not found');
    if (!konsumen.umkm)
      throw new UnauthorizedException('Konsumen does not own a UMKM');

    const { media, description } = createPostDto;
    const post = await this.postRepository.save({ media, description });
    if (!konsumen.umkm.posts) {
      konsumen.umkm.posts = [post];
    } else {
      konsumen.umkm.posts.push(post);
    }

    await this.umkmRepository.save(konsumen.umkm);
    return {
      posts: konsumen.umkm.posts,
      message: 'Post created successfully',
      statusCode: HttpStatus.CREATED,
    };
  }

  async deletePost(username: string, id: string) {
    const konsumen = await this.konsumenRepository.findOne({
      where: { username: username },
      relations: { umkm: { posts: true } },
    });
    if (!konsumen) throw new NotFoundException('Konsumen is not found');
    if (!konsumen.umkm)
      throw new UnauthorizedException('Konsumen does not own a UMKM');
    if (!konsumen.umkm.posts)
      throw new BadRequestException('Konsumen does not have any post');

    const initLength = konsumen.umkm.posts.length;

    konsumen.umkm.posts = konsumen.umkm.posts.filter((p) => p.postID !== id);
    const currentLength = konsumen.umkm.posts.length;

    if (currentLength !== initLength - 1)
      throw new BadRequestException('Post does not exist');

    await this.umkmRepository.save(konsumen.umkm);
    await this.postRepository.delete({ postID: id });
    return {
      posts: konsumen.umkm.posts,
      message: 'Post deleted successfully',
      statusCode: HttpStatus.OK,
    };
  }

  async filterPost(filterPostDto: FilterPostDto) {
    const { category, province, city, top, latest } = filterPostDto;

    if (category) {
      return this.umkmRepository
        .createQueryBuilder('umkm')
        .leftJoinAndSelect('umkm.categories', 'category')
        .where('category.value ILIKE :category', { category: `%${category}%` })
        .getMany();
    } else if (province) {
      return this.umkmRepository
        .createQueryBuilder('umkm')
        .where('umkm.province ILIKE :province', {
          province: `%${province}%`,
        })
        .getMany();
    } else if (city) {
      return this.umkmRepository
        .createQueryBuilder('umkm')
        .where('umkm.city ILIKE :city', { city: `%${city}%` })
        .getMany();
    } else if (top) {
      return this.postRepository
        .createQueryBuilder('post')
        .orderBy('post.upvotes', 'DESC')
        .getMany();
    } else if (latest) {
      return this.postRepository
        .createQueryBuilder('post')
        .orderBy('post.createdAt', 'DESC')
        .getMany();
    } else {
      return [];
    }
  }

  getFeed() {
    return this.postRepository.find({
      take: 100,
      order: { createdAt: 'DESC', postID: 'DESC' },
    });
  }
}
