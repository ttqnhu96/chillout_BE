import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ENTITIES_CONFIG } from "../../config/module.config";
import { BaseRepository } from "./base.repository";
import { ObjectLiteral, Repository } from "typeorm";
import { IDeviceRepository } from "../idevice.repository";

@Injectable()
export class DeviceRepository extends BaseRepository implements IDeviceRepository {
    private readonly _logger = new Logger(DeviceRepository.name);
    constructor(@InjectRepository(ENTITIES_CONFIG.DEVICE) private readonly repos: Repository<ObjectLiteral>) {
        super(repos);
        this._logger.log("============== Constructor DeviceRepository ==============");
    }
}