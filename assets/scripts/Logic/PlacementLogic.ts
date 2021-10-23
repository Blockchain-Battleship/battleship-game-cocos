import { AXIS } from "../Models/CONSTANTS"
import { Vector2 } from "../Models/Models"

export default class PlacementLogic
{
    static getPositionFromTileIndex = (pos : Vector2, axis : AXIS = AXIS.Y) : Vector2 =>
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
        let x = (pos.x*50) - 50
        let y = 450 - ((pos.y*50) - yFactor)  //To reverse the direction of the Y axis
        return {x, y}
    }
}