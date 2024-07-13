import {UserType} from "./user";


/**
 * 队伍类别
 */
export type TeamType = {
    id: number,
    name: string,
    description: string,
    maxNum: number,
    expireTime?: Date,
    status: number,
    password?: string,
    createTime: Date,
    updateTime: Date,
    createUser?: UserType;
    hasJoinNum?: number;
}