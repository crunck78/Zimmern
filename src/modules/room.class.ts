export interface RoomInterface{
  type : string;
  minutes : number;
}

export  class Room implements RoomInterface{
    private _type : string;
    private _minutes : number;

    constructor(room? : RoomInterface){
      this._type = room ? room.type : "";
      this._minutes = room ? room.minutes : 0;
    }

    public get type() : string {
      return this._type;
    }

    
    public get minutes() : number {
      return this._minutes;
    }
    
    
    toJSON(){
      return {
        type : this._type,
        minutes : this._minutes 
      }
  }
}