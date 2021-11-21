import { Room, RoomInterface } from "./room.class";

export interface ProfileInterface {
    rooms: RoomInterface[],
    income: number,
    setup: boolean,
    customId: string | null
}


export class Profile {
    private _income: number;
    private _rooms: Array<Room>;
    private _setup: boolean;
    private _customId: string | null;

    constructor(profile?: any | ProfileInterface) {
        this._income = profile ? profile['income'] : 0;
        this._rooms = profile ? profile['rooms'].map((room: RoomInterface) => new Room(room)) : [new Room()];
        this._setup = profile && 'setup' in profile ? profile['setup'] : false;
        this._customId = profile && 'customId' in profile ? profile['customId'] : null;
    }

    public get customId(): string | null {
        return this._customId;
    }

    public get setup(): boolean {
        return this._setup;
    }

    public set setup(v : boolean) {
        this._setup = v;
    }
    
    public get income(): number {
        return this._income;
    }

    public get rooms(): Array<Room> {
        return this._rooms;
    }

    toJSON() {
        return {
            income: this._income,
            rooms: this._rooms.map(room => room.toJSON()),
            setup: this._setup
        }
    }
}