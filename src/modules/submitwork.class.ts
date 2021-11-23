import { Room, RoomInterface } from "./room.class";

export interface SubmitWorkInterface {
   date : string,
   workTime : number,
   roomsCount : {room: RoomInterface, count : number}[],
   author : string
}

export class SubmitWork{
    private _date : string;
    private _workTime : number;
    private _roomsCount :  {room: RoomInterface, count : number}[];
    private _author : string | null;
    constructor(submitWork : any | SubmitWorkInterface, author : string | null){
        this._date = submitWork ? submitWork.date : new Date();
        this._workTime = submitWork ? submitWork.workTime : 0;
        this._roomsCount = submitWork ? submitWork.roomsCount : [{room : new Room().toJSON(), count : 0 }];
        this._author = author;
    }

    public getRoomsBasedWorkedTime() : number{
        const roomsWorkTime = this._roomsCount.map( (rc : {room: RoomInterface, count : number}) => rc.room.minutes * rc.count );
        console.log(roomsWorkTime);
        const sum = roomsWorkTime.reduce( (a : number, b : number) => a + b, 0);
        console.log(sum);
        return sum;
    }

    
    public get workTime() : number {
        return this._workTime;
    }
    
    
    public get roomsCount() : {room : RoomInterface, count : number }[] {
        return this._roomsCount;
    }
    
    public get date() : string {
        return this._date;
    }
    
    
    public get author() : string | null {
        return this._author;
    }
    
    toJSON(){
       return {
        date : this._date,
        workTime : this._workTime,
        author : this._author,
        roomsCount : this._roomsCount
       } 
    }
}