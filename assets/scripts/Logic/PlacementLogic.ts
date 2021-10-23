import { Vector2 } from "../Models/Models"

export default class PlacementLogic
{
    static getPositionFromTileIndex = (pos : Vector2) : Vector2 =>
    {
        let x = (pos.x*50) - 50
        let y = 450 - ((pos.y*50) - 50)  //To reverse the direction of the Y axis
        return {x, y}
    }
}