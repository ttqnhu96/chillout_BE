import { HttpException, HttpStatus, Inject, Logger } from '@nestjs/common';
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
    MessagesRequestInterface,
    MessagesResponseInterface,
    CommentNotifyRequestInterface,
    CommentNotifyResponseInterface,
    ReactNotifyRequestInterface,
    LikePostMessageResponseInterface,
    LikePostNotificationResponseInterface
} from './interfaces/messages.interface';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtService } from '@nestjs/jwt';
import { IDeviceRepository } from 'src/core/repositories/idevice.repository';
import { REPOSITORY_INTERFACE } from 'src/core/config/module.config';
import { DeviceEntity } from 'src/core/entities/device.entity';
import { IPostRepository } from 'src/core/repositories/ipost.repository';
import { IPostLikedUsersRepository } from 'src/core/repositories/ipost-liked-users.repository';
import { ORDER_BY } from 'src/core/common/constants/common.constant';
const options = {
    cors: {
        origin: ["http://localhost:3000", "example2.com"],
        methods: ["GET", "POST"],
        credentials: true
    }
}
// let user = { name: '', id: 0 };
@WebSocketGateway(3006, options)
export class AppGateway
// implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer() server: Server;
    private _logger: Logger = new Logger(AppGateway.name);
    constructor(
        private jwtService: JwtService,
        @Inject(REPOSITORY_INTERFACE.IDEVICE_REPOSITORY) private _deviceRepos: IDeviceRepository,
        @Inject(REPOSITORY_INTERFACE.IPOST_REPOSITORY) private _postRepos: IPostRepository,
        @Inject(REPOSITORY_INTERFACE.IPOST_LIKED_USERS_REPOSITORY) private _postLikedUsersRepos: IPostLikedUsersRepository
    ) { }

    // afterInit(server: any): any {
    //     this._logger.log(server, 'Init AppGateway');
    // }

    async handleConnection(client: Socket) {
        this._logger.log(client.id, 'Connected..............................');
        let authToken: any = client.handshake?.query?.token ?? '';
        try {
            const decoded = this.jwtService.verify(authToken);
            // user.name = decoded.username;
            // user.id = decoded.id;
            const device = await this._deviceRepos.findOne({ userId: decoded.id, isDeleted: false })
            if (device) {
                device.socketId = client.id;
                await this._deviceRepos.update(device)
            } else {
                const newDevice = new DeviceEntity;
                newDevice.socketId = client.id;
                newDevice.userId = decoded.id;
                newDevice.isDeleted = false;
                newDevice.userName = decoded.username;
                await this._deviceRepos.create(newDevice)
            }
            this._logger.log('decoded', decoded);
        } catch (ex) {
            this._logger.log('error', ex);
        }
    }

    async handleDisconnect(client: Socket) {
        this._logger.log(client.id, 'Disconnect');
    }
    @SubscribeMessage('client-message')
    async messagesReceive(@MessageBody() payload: MessagesRequestInterface): Promise<any> {
        const toUserId = payload.data.toUserId;
        const device = await this._deviceRepos.findOne({ userId: toUserId, isDeleted: false });
        if (device) {
            const data: MessagesResponseInterface = {
                message: payload.data.message,
                fromUserName: device.userName,
                fromUserId: device.userId
            }
            this._logger.log('client-message: emit message, type: MESSAGE_NOTIFICATION_RECEIVED');
            this.server.to(device.socketId).emit('message', { type: 'MESSAGE_NOTIFICATION_RECEIVED', data });
        }
    }

    @SubscribeMessage('client-add-comment')
    async addCommentNotification(@MessageBody() payload: CommentNotifyRequestInterface): Promise<any> {
        const Post = await this._postRepos.findOne({ id: payload.data.postId, isDeleted: false });
        const device = await this._deviceRepos.findOne({ userId: Post.userId, isDeleted: false });
        const data: CommentNotifyResponseInterface = {
            postId: payload.data.postId,
            fromUserName: payload.data.fromUserName,
            fromUserId: payload.data.fromUserId
        }
        this._logger.log('client-add-comment: emit message, type: ADD_COMMENT_MESSAGE_FROM_SERVER');
        this.server.emit('message', { type: 'ADD_COMMENT_MESSAGE_FROM_SERVER', data });
        if (device) {
            this._logger.log('client-add-comment: emit message, type: ADD_COMMENT_NOTIFICATION_FROM_SERVER');
            this.server.to(device.socketId).emit('message', { type: 'ADD_COMMENT_NOTIFICATION_FROM_SERVER', data });
        }
    }

    @SubscribeMessage('client-update-comment')
    async updateCommentNotification(@MessageBody() payload: CommentNotifyRequestInterface): Promise<any> {
        const Post = await this._postRepos.findOne({ id: payload.data.postId, isDeleted: false });
        const device = await this._deviceRepos.findOne({ userId: Post.userId, isDeleted: false });
        const data: CommentNotifyResponseInterface = {
            postId: payload.data.postId,
            fromUserName: payload.data.fromUserName,
            fromUserId: payload.data.fromUserId
        }
        this._logger.log('client-add-comment: emit message, type: UPDATE_COMMENT_MESSAGE_FROM_SERVER');
        this.server.emit('message', { type: 'UPDATE_COMMENT_MESSAGE_FROM_SERVER', data });
    }

    @SubscribeMessage('client-like-post')
    async reactNotification(@MessageBody() payload: ReactNotifyRequestInterface): Promise<any> {
        this._logger.log('client-like-post: payload, type: LIKE_POST_MESSAGE_FROM_SERVER', payload);
        const Post = await this._postRepos.findOne({ id: payload.data.postId, isDeleted: false });
        const device = await this._deviceRepos.findOne({ userId: Post.userId, isDeleted: false });
        const result = await this._postLikedUsersRepos.findByCondition(
            {
                postId: payload.data.postId,
                isDeleted: false
            },
            { createdAt: ORDER_BY.DESC });
        {
            const data: LikePostMessageResponseInterface = {
                postId: payload.data.postId,
                likes: result.length,
                userIdLikePostList: result.map(item => item.userId),
                fromUserName: payload.data.fromUserName,
                fromUserId: payload.data.fromUserId
            }
            this._logger.log('client-like-post: emit message, type: LIKE_POST_MESSAGE_FROM_SERVER');
            this.server.emit('message', { type: 'LIKE_POST_MESSAGE_FROM_SERVER', data });
        }
        if (device) {
            const data: LikePostNotificationResponseInterface = {
                like: payload.data.like,
                postId: payload.data.postId,
                fromUserName: payload.data.fromUserName,
                fromUserId: payload.data.fromUserId
            }
            this._logger.log('client-like-post: emit message, type: LIKE_POST_NOTIFICATION_FROM_SERVER');
            this.server.to(device.socketId).emit('message', { type: 'LIKE_POST_NOTIFICATION_FROM_SERVER', data });
        }
    }
}