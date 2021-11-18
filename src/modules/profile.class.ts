import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Room } from "./room.class";

export class Profile {
    private _income: number;
    private _rooms: Array<Room>;
    private _setup: boolean;


    constructor(profile?: { rooms: Array<{ type: string, minutes: number }>, income: number, setup: boolean }) {
        this._income = profile ? profile['income'] : 0;
        this._rooms = profile ? profile['rooms'].map(room => new Room(room)) : [new Room()];
        this._setup = profile ? profile['setup'] : false; 
    }

    
    public get setup() : boolean {
        return this._setup;
    }
    
    public get income(): number {
        return this._income;
    }

    public get rooms(): Array<Room> {
        return this._rooms;
    }


    toJSON() {
        return {
            earningsPerHour: this._income,
            rooms: this._rooms.map(room => room.toJSON()),
            setup: this._setup
        }
    }
}