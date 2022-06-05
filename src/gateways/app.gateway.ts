import { Inject, Logger } from '@nestjs/common';
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
    MessagesRequestInterface,
    MessagesResponseInterface,
    CommentNotifyRequestInterface,
    CommentNotifyResponseInterface,
    ReactNotifyRequestInterface,
    LikePostMessageResponseInterface,
    LikePostNotificationResponseInterface,
    AddFriendNotifyRequestInterface,
    AddFriendMessageResponseInterface,
    AddFriendNotifyResponseInterface,
    CancelFriendRequestNotifyRequestInterface,
    CancelFriendRequestNotifyResponseInterface,
    DeleteFriendRequestNotifyRequestInterface,
    DeleteFriendRequestNotifyResponseInterface,
    AcceptFriendNotifyRequestInterface,
    AcceptFriendNotifyResponseInterface,
    AcceptFriendMessageResponseInterface
} from './interfaces/messages.interface';
import { JwtService } from '@nestjs/jwt';
import { IDeviceRepository } from '../core/repositories/idevice.repository';
import { REPOSITORY_INTERFACE, SERVICE_INTERFACE } from '../core/config/module.config';
import { DeviceEntity } from '../core/entities/device.entity';
import { IPostRepository } from '../core/repositories/ipost.repository';
import { IPostLikedUsersRepository } from '../core/repositories/ipost-liked-users.repository';
import { ORDER_BY } from '../core/common/constants/common.constant';
import { IProfileService } from '../core/services/iprofile.service';
import { SOCKET_MESSAGES, SOCKET_MESSAGE_TYPES } from '../core/common/constants/common.constant';
const options = {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true
    }
}

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
        @Inject(REPOSITORY_INTERFACE.IPOST_LIKED_USERS_REPOSITORY) private _postLikedUsersRepos: IPostLikedUsersRepository,
        @Inject(SERVICE_INTERFACE.IPROFILE_SERVICE) private _profileService: IProfileService
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
                device.isConnected = true;
                await this._deviceRepos.update(device)
            } else {
                const newDevice = new DeviceEntity;
                newDevice.socketId = client.id;
                newDevice.userId = decoded.id;
                newDevice.isDeleted = false;
                newDevice.userName = decoded.username;
                newDevice.isConnected = true;
                await this._deviceRepos.create(newDevice)
            }
            this._logger.log('decoded', decoded);
            this._logger.log(`handleConnection: user id: ${decoded?.id}, socket id: ${device?.socketId}, client id ${client?.id}`);
        } catch (ex) {
            this._logger.log('error', ex);
        }
    }

    async handleDisconnect(client: Socket) {
        let authToken: any = client.handshake?.query?.token ?? '';
        const decoded = this.jwtService.verify(authToken);
        try {
            const device = await this._deviceRepos.findOne({ userId: decoded.id, isDeleted: false })
            device.isConnected = false;
            await this._deviceRepos.update(device)
            this._logger.log(`handleDisconnect: user id: ${decoded?.id}, socket id: ${device?.socketId}, client id ${client?.id}`);
        } catch (ex) {
            this._logger.log('error', ex);
        }
        this._logger.log(client.id, 'Disconnect');
    }
    @SubscribeMessage(SOCKET_MESSAGES.CLIENT_MESSAGE)
    async messagesReceive(@MessageBody() payload: MessagesRequestInterface): Promise<any> {
        const toUserId = payload.data.toUserId;
        const device = await this._deviceRepos.findOne({ userId: toUserId, isDeleted: false });
        if (device) {
            const data: MessagesResponseInterface = {
                message: payload.data.message,
                fromUserName: device.userName,
                fromUserId: device.userId
            }
            this._logger.log(`${SOCKET_MESSAGES.CLIENT_MESSAGE}: emit message, type: ${SOCKET_MESSAGE_TYPES.MESSAGE_NOTIFICATION_RECEIVED}`);
            this.server.to(device.socketId).emit('message', { type: SOCKET_MESSAGE_TYPES.MESSAGE_NOTIFICATION_RECEIVED , data });
        }
    }

    @SubscribeMessage(SOCKET_MESSAGES.CLIENT_ADD_COMMENT)
    async addCommentNotification(@MessageBody() payload: CommentNotifyRequestInterface): Promise<any> {
        const post = await this._postRepos.findOne({ id: payload.data.postId, isDeleted: false });
        const device = await this._deviceRepos.findOne({ userId: post.userId, isDeleted: false });
        const data: CommentNotifyResponseInterface = {
            postId: payload.data.postId,
            fromUserName: payload.data.fromUserName,
            fromUserId: payload.data.fromUserId
        }
        this._logger.log(`${SOCKET_MESSAGES.CLIENT_ADD_COMMENT}: emit message, type: ${SOCKET_MESSAGE_TYPES.ADD_COMMENT_MESSAGE_FROM_SERVER}`);
        this.server.emit('message', { type: SOCKET_MESSAGE_TYPES.ADD_COMMENT_MESSAGE_FROM_SERVER, data });
        if (device) {
            this._logger.log(`${SOCKET_MESSAGES.CLIENT_ADD_COMMENT}: emit message, type: ${SOCKET_MESSAGE_TYPES.ADD_COMMENT_NOTIFICATION_MESSAGE_FROM_SERVER}`);
            if (device?.isConnected) {
                this.server.to(device.socketId).emit('message', { type: SOCKET_MESSAGE_TYPES.ADD_COMMENT_NOTIFICATION_MESSAGE_FROM_SERVER, data });
            }
        }
    }

    @SubscribeMessage(SOCKET_MESSAGES.CLIENT_UPDATE_COMMENT)
    async updateCommentNotification(@MessageBody() payload: CommentNotifyRequestInterface): Promise<any> {
        const post = await this._postRepos.findOne({ id: payload.data.postId, isDeleted: false });
        const device = await this._deviceRepos.findOne({ userId: post.userId, isDeleted: false });
        const data: CommentNotifyResponseInterface = {
            postId: payload.data.postId,
            fromUserName: payload.data.fromUserName,
            fromUserId: payload.data.fromUserId
        }
        this._logger.log(`${SOCKET_MESSAGES.CLIENT_UPDATE_COMMENT}: emit message, type: ${SOCKET_MESSAGE_TYPES.UPDATE_COMMENT_MESSAGE_FROM_SERVER}`);
        this.server.emit('message', { type: SOCKET_MESSAGE_TYPES.UPDATE_COMMENT_MESSAGE_FROM_SERVER, data });
    }

    @SubscribeMessage(SOCKET_MESSAGES.CLIENT_LIKE_POST)
    async reactNotification(@MessageBody() payload: ReactNotifyRequestInterface): Promise<any> {
        this._logger.log(`${SOCKET_MESSAGES.CLIENT_LIKE_POST}: payload, type: ${SOCKET_MESSAGE_TYPES.LIKE_POST_MESSAGE_FROM_SERVER}`, payload);
        const post = await this._postRepos.findOne({ id: payload.data.postId, isDeleted: false });
        const device = await this._deviceRepos.findOne({ userId: post.userId, isDeleted: false });
        const result = await this._postLikedUsersRepos.findByCondition(
            {
                postId: payload.data.postId,
                isDeleted: false
            },
            { createdAt: ORDER_BY.DESC });
        const data: LikePostMessageResponseInterface = {
            postId: payload.data.postId,
            likes: result.length,
            userIdLikePostList: result.map(item => item.userId),
            fromUserName: payload.data.fromUserName,
            fromUserId: payload.data.fromUserId
        }
        this._logger.log(`${SOCKET_MESSAGES.CLIENT_LIKE_POST}: emit message, type: ${SOCKET_MESSAGE_TYPES.LIKE_POST_MESSAGE_FROM_SERVER}`);
        this.server.emit('message', { type: SOCKET_MESSAGE_TYPES.LIKE_POST_MESSAGE_FROM_SERVER, data });
        if (device) {
            const data: LikePostNotificationResponseInterface = {
                like: payload.data.like,
                postId: payload.data.postId,
                fromUserName: payload.data.fromUserName,
                fromUserId: payload.data.fromUserId
            }
            this._logger.log(`${SOCKET_MESSAGES.CLIENT_LIKE_POST}: emit message, type: ${SOCKET_MESSAGE_TYPES.LIKE_POST_NOTIFICATION_MESSAGE_FROM_SERVER}`);
            if (device?.isConnected) {
                this.server.to(device.socketId).emit('message', { type: SOCKET_MESSAGE_TYPES.LIKE_POST_NOTIFICATION_MESSAGE_FROM_SERVER, data });
            }
        }
    }

    @SubscribeMessage(SOCKET_MESSAGES.CLIENT_ADD_FRIEND)
    async addFriendNotification(@MessageBody() payload: AddFriendNotifyRequestInterface): Promise<any> {
        this._logger.log(`${SOCKET_MESSAGES.CLIENT_ADD_FRIEND}: payload, type: ${SOCKET_MESSAGE_TYPES.ADD_FRIEND_SOCKET_HANDLER}`, payload);
        const device = await this._deviceRepos.findOne({ userId: payload?.receiverId, isDeleted: false });
        const senderId = payload?.senderId;
        const receiverId = payload?.receiverId;
        const socketId = device?.socketId;
        this.emitAddFriendMessage(senderId, receiverId, socketId);
        if (device?.isConnected) {
            await this.emitAddFriendNotification(senderId, receiverId, socketId);
        }
    }

    @SubscribeMessage(SOCKET_MESSAGES.CLIENT_ACCEPT_FRIEND)
    async acceptFriendNotification(@MessageBody() payload: AcceptFriendNotifyRequestInterface): Promise<any> {
        this._logger.log(`${SOCKET_MESSAGES.CLIENT_ACCEPT_FRIEND}: payload, type: ${SOCKET_MESSAGE_TYPES.ACCEPT_FRIEND_SOCKET_HANDLER}`, payload);
        const device = await this._deviceRepos.findOne({ userId: payload?.senderId, isDeleted: false });
        const senderId = payload?.senderId;
        const receiverId = payload?.receiverId;
        const socketId = device?.socketId;
        this.emitAcceptFriendMessage(senderId, receiverId, socketId);
        if (device?.isConnected) {
            await this.emitAcceptFriendNotification(senderId, receiverId, socketId);
        }
    }

    @SubscribeMessage(SOCKET_MESSAGES.CLIENT_CANCEL_FRIEND_REQUEST)
    async cancelFriendRequestNotification(@MessageBody() payload: CancelFriendRequestNotifyRequestInterface): Promise<any> {
        this._logger.log(`${SOCKET_MESSAGES.CLIENT_CANCEL_FRIEND_REQUEST}: payload, type: ${SOCKET_MESSAGE_TYPES.CANCEL_FRIEND_REQUEST_SOCKET_HANDLER}`, payload);
        const device = await this._deviceRepos.findOne({ userId: payload?.receiverId, isDeleted: false });
        const senderId = payload?.senderId;
        const receiverId = payload?.receiverId;
        const socketId = device?.socketId;
        const data: CancelFriendRequestNotifyResponseInterface = {
            senderId: senderId,
            receiverId: receiverId
        }
        this._logger.log(`${SOCKET_MESSAGES.CLIENT_CANCEL_FRIEND_REQUEST}: emit message, type: ${SOCKET_MESSAGE_TYPES.CANCEL_FRIEND_REQUEST_MESSAGE_FROM_SERVER}`);
        this.server.to(socketId).emit('message', { type: SOCKET_MESSAGE_TYPES.CANCEL_FRIEND_REQUEST_MESSAGE_FROM_SERVER, data });
    }

    @SubscribeMessage(SOCKET_MESSAGES.CLIENT_DELETE_FRIEND_REQUEST)
    async deleteFriendRequestNotification(@MessageBody() payload: DeleteFriendRequestNotifyRequestInterface): Promise<any> {
        this._logger.log(`${SOCKET_MESSAGES.CLIENT_DELETE_FRIEND_REQUEST}: payload, type: ${SOCKET_MESSAGE_TYPES.DELETE_FRIEND_REQUEST_SOCKET_HANDLER}`, payload);
        const device = await this._deviceRepos.findOne({ userId: payload?.senderId, isDeleted: false });
        const senderId = payload?.senderId;
        const receiverId = payload?.receiverId;
        const socketId = device?.socketId;
        const data: DeleteFriendRequestNotifyResponseInterface = {
            senderId: senderId,
            receiverId: receiverId
        }
        this._logger.log(`${SOCKET_MESSAGES.CLIENT_DELETE_FRIEND_REQUEST}: emit message, type: ${SOCKET_MESSAGE_TYPES.DELETE_FRIEND_REQUEST_MESSAGE_FROM_SERVER}`);
        this.server.to(socketId).emit('message', { type: SOCKET_MESSAGE_TYPES.DELETE_FRIEND_REQUEST_MESSAGE_FROM_SERVER, data });
    }






    emitAddFriendMessage(senderId: number, receiverId: number, socketId: string) {
        const data: AddFriendMessageResponseInterface = {
            senderId: senderId,
            receiverId: receiverId
        }
        this._logger.log(`${SOCKET_MESSAGES.CLIENT_ADD_FRIEND}: emit message, type: ${SOCKET_MESSAGE_TYPES.ADD_FRIEND_MESSAGE_FROM_SERVER}, socket id: ${socketId}, receiver id: ${receiverId}, sender id: ${senderId}`);
        this.server.to(socketId).emit('message', { type: SOCKET_MESSAGE_TYPES.ADD_FRIEND_MESSAGE_FROM_SERVER, data });
    }

    async emitAddFriendNotification(senderId: number, receiverId: number, socketId: string) {
        const profile = await this._profileService.getProfileDetailByUserId(senderId);
        const data: AddFriendNotifyResponseInterface = {
            senderId: senderId,
            receiverId: receiverId,
            senderName: `${profile.Data.firstName} ${profile.Data.lastName}`,
            senderAvatar: profile.Data.avatar,
        }
        this._logger.log(`${SOCKET_MESSAGES.CLIENT_ADD_FRIEND}: emit message, type: ${SOCKET_MESSAGE_TYPES.ADD_FRIEND_NOTIFICATION_MESSAGE_FROM_SERVER}, socket id: ${socketId}, receiver id: ${receiverId}, sender id: ${senderId}`);
        this.server.to(socketId).emit('message', { type: SOCKET_MESSAGE_TYPES.ADD_FRIEND_NOTIFICATION_MESSAGE_FROM_SERVER, data });
    }

    emitAcceptFriendMessage(senderId: number, receiverId: number, socketId: string) {
        const data: AcceptFriendMessageResponseInterface = {
            senderId: senderId,
            receiverId: receiverId
        }
        this._logger.log(`${SOCKET_MESSAGES.CLIENT_ACCEPT_FRIEND}: emit message, type: ${SOCKET_MESSAGE_TYPES.ACCEPT_FRIEND_MESSAGE_FROM_SERVER}, socket id: ${socketId}, receiver id: ${receiverId}, sender id: ${senderId}`);
        this.server.to(socketId).emit('message', { type: SOCKET_MESSAGE_TYPES.ACCEPT_FRIEND_MESSAGE_FROM_SERVER, data });
    }

    async emitAcceptFriendNotification(senderId: number, receiverId: number, socketId: string) {
        const profile = await this._profileService.getProfileDetailByUserId(receiverId);
        const data: AcceptFriendNotifyResponseInterface = {
            senderId: senderId,
            receiverId: receiverId,
            receiverAvatar: profile.Data.avatar,
            receiverName: `${profile.Data.firstName} ${profile.Data.lastName}`
        }
        this._logger.log(`${SOCKET_MESSAGES.CLIENT_ACCEPT_FRIEND}: emit message, type: ${SOCKET_MESSAGE_TYPES.ACCEPT_FRIEND_NOTIFICATION_MESSAGE_FROM_SERVER}, socket id: ${socketId}, receiver id: ${receiverId}, sender id: ${senderId}`);
        this.server.to(socketId).emit('message', { type: SOCKET_MESSAGE_TYPES.ACCEPT_FRIEND_NOTIFICATION_MESSAGE_FROM_SERVER, data });
    }
}