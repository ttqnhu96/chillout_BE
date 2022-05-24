import { bool } from "aws-sdk/clients/signer"

interface FriendRequestBaseInterface {
    senderId: number,
    receiverId: number
}
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

export interface AddFriendNotifyRequestInterface extends FriendRequestBaseInterface {

}

export interface AcceptFriendNotifyRequestInterface extends FriendRequestBaseInterface {

}

export interface CancelFriendRequestNotifyRequestInterface extends FriendRequestBaseInterface {

}

export interface DeleteFriendRequestNotifyRequestInterface extends FriendRequestBaseInterface {

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

export interface AddFriendMessageResponseInterface extends FriendRequestBaseInterface {

}

export interface AddFriendNotifyResponseInterface extends FriendRequestBaseInterface {
    senderName: string,
    senderAvatar: string
}

export interface AcceptFriendMessageResponseInterface extends FriendRequestBaseInterface {

}

export interface AcceptFriendNotifyResponseInterface extends FriendRequestBaseInterface {
    receiverName: string,
    receiverAvatar: string
}

export interface CancelFriendRequestNotifyResponseInterface extends FriendRequestBaseInterface {

}
export interface DeleteFriendRequestNotifyResponseInterface extends FriendRequestBaseInterface {

}