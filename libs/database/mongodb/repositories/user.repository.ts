import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../schemas/users.schema";
import { Model } from "mongoose";

export class UserRepository{
    constructor(
        @InjectModel(User.name)
        private model: Model<UserDocument>
    ){}

    findAll(filter: any, limit?: number, skip?: number) {
        const query = this.model.find(filter);

        if (limit) query.limit(limit);
        if (skip) query.skip(skip);

        return query.exec();
    }

    findById(id: string) {
        return this.model.findById(id).exec();
    }

    create(data: User) {
        return this.model.create(data);
    }

    update(id: string, data: User) {
        return this.model.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
        }).exec();
    }

    delete(id: string) {
        return this.model.findByIdAndDelete(id).exec();
    }
}