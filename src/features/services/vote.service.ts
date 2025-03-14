import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Konsumen } from 'src/users/entities/konsumen.entity';
import { Repository } from 'typeorm';
import { Post as PostEntity } from '../entities/post.entity';
import { Vote } from '../entities/vote.entitiy';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Konsumen)
    private konsumenRepository: Repository<Konsumen>,
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @InjectRepository(Vote)
    private voteRepository: Repository<Vote>,
  ) {}

  async addVotes(username: string, isUpvote: boolean, id: string) {
    const konsumen = await this.konsumenRepository.findOne({
      where: { username: username },
      relations: { votes: true },
    });
    if (!konsumen) throw new NotFoundException('Konsumen is not found');

    const post = await this.postRepository.findOne({
      where: { postID: id },
      relations: { votes: true },
    });
    if (!post) throw new NotFoundException('Post does not exist');

    const vote = await this.voteRepository.save({ isUpvote: isUpvote });

    if (!konsumen.votes || !post.votes) {
      konsumen.votes = [vote];
      post.votes = [vote];
    } else {
      konsumen.votes.push(vote);
      post.votes.push(vote);
    }

    vote.konsumenKonsumenID = konsumen.konsumenID;
    vote.postPostID = post.postID;

    const upvotes = post.votes.filter((u) => u.isUpvote === true).length;
    post.upvotes = upvotes;
    const downvotes = post.votes.filter((u) => u.isUpvote === false).length;
    post.downvotes = downvotes;

    await this.konsumenRepository.save(konsumen);
    await this.postRepository.save(post);

    return { post };
  }

  async removeVote(username: string, id: string) {
    const konsumen = await this.konsumenRepository.findOne({
      where: { username: username },
      relations: { votes: true },
    });
    if (!konsumen) throw new NotFoundException('Konsumen is not found');

    const post = await this.postRepository.findOne({
      where: { postID: id },
      relations: { votes: true },
    });
    if (!post) throw new NotFoundException('Post does not exist');

    const vote = await this.voteRepository.findOne({
      where: {
        konsumenKonsumenID: konsumen.konsumenID,
        postPostID: post.postID,
      },
    });

    konsumen.votes =
      konsumen.votes.filter(
        (v) => v.konsumenKonsumenID !== vote?.konsumenKonsumenID,
      ) || [];
    post.votes =
      post.votes.filter((v) => v.postPostID !== vote?.postPostID) || [];

    console.log(konsumen.votes);

    const upvotes = post.votes.filter((u) => u.isUpvote === true).length;
    post.upvotes = upvotes;
    const downvotes = post.votes.filter((u) => u.isUpvote === false).length;
    post.downvotes = downvotes;

    await this.konsumenRepository.save(konsumen);
    await this.postRepository.save(post);
    await this.voteRepository.remove(vote!);

    return { post };
  }
}
