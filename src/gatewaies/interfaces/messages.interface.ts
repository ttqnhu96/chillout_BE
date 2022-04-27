import { bool } from "aws-sdk/clients/signer"

export interface MessagesRequestInterface {
    data: {
        message: string,
        toUserId: number
    }
}

export interface MessagesResponseInterface {
    message: string,
    fromUserName: string,
    fromUserId: number
}

export interface CommentNotifyRequestInterface {
    data: {
        content: string,
        postId: number,
        ownerPostId: number,
        fromUserName: string,
        fromUserId: number
    }
}

export interface CommentNotifyResponseInterface {
    postId: number,
    fromUserName: string,
    fromUserId: number
}

export interface ReactNotifyRequestInterface {
    data: {
        postId: number,
        like: bool,
        fromUserName: string,
        fromUserId: number
    }
}

export interface LikePostMessageResponseInterface {
    postId: number,
    likes: number,
    fromUserId: number,
    userIdLikePostList: number[],
    fromUserName: string
}

export interface LikePostNotificationResponseInterface {
    postId: number,
    like: bool,
    fromUserId: number,
    fromUserName: string
}