import { AXIS, SHIP_TYPE } from "../Models/Enums"
import { Vector2 } from "../Models/Models"
import { SHIP_NAME, SHIP_TILE_SIZE } from "../Models/CONSTANTS";

export default class GameLogic
{
    static getPositionFromCoordinates(coordinates : Vector2, axis : AXIS = AXIS.Y) : Vector2
    {
        let yFactor;
        switch(axis)
        {
            case AXIS.X:
                yFactor = 50
                break;
            case AXIS.Y:
                yFactor = 100;
                break;
        }
        let x = (coordinates.x*50) - 50
        let y = 450 - ((coordinates.y*50) - yFactor)  //To reverse the direction of the Y axis
        return {x, y}
    }

    static getPositionFromTileIndex(tileIndex: number, axis : AXIS = AXIS.Y) : Vector2 
    {
        let coordinates = this.getCoordinatesFromTileIndex(tileIndex);
        return coordinates
    }

    static getTileIndexFromCordinates(cordinates : Vector2) : number 
    {
        let tileIndex = ((cordinates.y-1)*10) + cordinates.x
        return tileIndex;
    }

    static getCoordinatesFromTileIndex(tileIndex : number) : Vector2{
        let y = Math.ceil(tileIndex/10);
        let x = tileIndex % 10;
        x = x == 0 ? 10 : x;
        return {x,y}
    }

    static getOccupiedTiles(tileIndex: number, axis : AXIS, shipType : SHIP_TYPE) : number[]{
        console.log(tileIndex, axis, shipType)
        let tileIndexes = [];
        let incrementor;
        let total_tiles = this.getShipTileSize(shipType)
        switch(axis)
        {
            case AXIS.X:
                incrementor = 1
                break;
            case AXIS.Y:
                incrementor = 10
                break;
        }
        for(var i = 0; i < total_tiles; i++)
        {
            let newTile = tileIndex + (incrementor * i)
            console.log("newTile", tileIndex)
            tileIndexes.push(newTile)
        }

        return tileIndexes;
    }

    static getShipTileSize(ship_type: SHIP_TYPE) : number
    {
        let tile_size :  number;
        switch(ship_type)
        {
            case SHIP_TYPE.DESTROYER:
                tile_size = SHIP_TILE_SIZE.DESTROYER;
                break;
            case SHIP_TYPE.SUBMARINE:
                tile_size = SHIP_TILE_SIZE.SUBMARINE;
                break;
            case SHIP_TYPE.CRUISER:
                tile_size = SHIP_TILE_SIZE.CRUISER;
                break;
            case SHIP_TYPE.BATTLESHIP:
                tile_size = SHIP_TILE_SIZE.BATTLESHIP;
                break;
            case SHIP_TYPE.CARRIER:
                tile_size = SHIP_TILE_SIZE.CARRIER;
                break;
        }

        return tile_size;
    }

    static getShipName(ship_type : SHIP_TYPE) : string
    {
        let ship_name : string
        switch(ship_type)
        {
            case SHIP_TYPE.DESTROYER:
                ship_name =  SHIP_NAME.DESTROYER;
                break;
            case SHIP_TYPE.SUBMARINE:
                ship_name =  SHIP_NAME.SUBMARINE;
                break;
            case SHIP_TYPE.CRUISER:
                ship_name = SHIP_NAME.CRUISER;
                break;
            case SHIP_TYPE.BATTLESHIP:
                ship_name = SHIP_NAME.BATTLESHIP;
                break;
            case SHIP_TYPE.CARRIER:
                ship_name = SHIP_NAME.CARRIER
                break;
        }

        return ship_name;
    }

    getNewTileIndexOnShipMove(shipType: SHIP_TYPE, newClickArea: number, axis: AXIS){

    }
}