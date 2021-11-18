export  class Room{
    private _type : string;
    private _minutes : number;

    constructor(room? : {type : string, minutes : number}){
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