import * as Bluebird from 'bluebird'
import * as Sequelize from 'sequelize'
import { Post, PostAddModel, PostViewModel, PostLimitModel } from '../models/post'
import { User } from '../models/user'

export class PostService {
    static get postAttributes() {
        return ['id', 'title', 'body', 'createdAt']
    }
    static get userAttributes() {
        return ['id', 'username']
    }
    private static _post
    static get post() {
        return PostService._post
    }

    register({ title, body, author_id }: PostAddModel) {
        return Post.create({ title, body, author_id }).then(p => this.getPostById(p!.id))
    }

    getPostById(id: number) {
        return Post.findById(id, {
            include: [
                {
                    model: User,
                    where: { author_id: Sequelize.col('author.id') },
                    attributes: PostService.userAttributes,
                    as: 'author',
                },
            ],
            attributes: PostService.postAttributes,
            order: [['createdAt', 'DESC']],
        }) as Bluebird<PostViewModel>
    }

    getPosts({ limit }: PostLimitModel) {
        return Post.findAll({
            include: [
                {
                    model: User,
                    where: { author_id: Sequelize.col('author.id') },
                    attributes: PostService.userAttributes,
                    as: 'author',
                },
            ],
            attributes: PostService.postAttributes,
            limit: limit ? limit : 10,
            order: [['createdAt', 'DESC']],
        })
    }
}
