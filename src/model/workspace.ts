import { IUser } from "./Users";

export interface IWorkspace{
    id: number;
    name: string;
    description: string;
    image: string;
    users: IUser[];
}