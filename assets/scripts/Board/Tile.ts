
import { _decorator, Component, Node, Color, CCObject, Sprite } from 'cc';
import GameLogic from '../Logic/GameLogic'
import { Vector2 } from '../Models/Models';
import { SHIP_TYPE } from '../Models/Enums';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Tile
 * DateTime = Mon Oct 18 2021 22:16:15 GMT+0100 (West Africa Standard Time)
 * Author = EbubeUd
 * FileBasename = tile.ts
 * FileBasenameNoExtension = tile
 * URL = db://assets/scripts/tile.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('Tile')
export class Tile extends Component {
    
    //Tile Detials
    tile_id  : number
    coordinates : Vector2

    //Occupant Details
    is_occupied : Boolean
    occupyingShip: SHIP_TYPE


    start () {
        // [3]

        this.node.on(Node.EventType.MOUSE_ENTER, function (event) {
            console.log(this.tile_id);
          }, this);
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    init(tileIndex : number){
        this.tile_id = tileIndex
        this.coordinates = GameLogic.getCoordinatesFromTileIndex(tileIndex)
    }

    setTilePosition = (pos : Vector2) => {
       let {x, y} =  GameLogic.getPositionFromCoordinates(pos);
        this.node.setPosition(x,y)        
    }

    setTileAsOccupied(occupyingShip: SHIP_TYPE) {
        let _sprite : Sprite = this.node.getComponent("cc.Sprite")
        _sprite.color = new Color(255, 0, 0, 60);
        this.is_occupied = true
        this.occupyingShip = occupyingShip
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
 */
