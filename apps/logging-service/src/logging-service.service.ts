import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Log, LogDocument } from '../schema/log.schema';
import { Model } from 'mongoose';

@Injectable()
export class LoggingServiceService {
  constructor(
    @InjectModel(Log.name)
    private logModel: Model<LogDocument>
  ){}
  
  async createLog(event: string, data: any)
  {
    this.logModel.create({event, data});
  }
}
