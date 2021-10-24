
import { _decorator, Component, Node, director } from 'cc';
import {AXIS, SHIP_TYPE} from '../Models/Enums'
import GameLogic  from '../Logic/GameLogic';
import { Vector2 } from '../Models/Models';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Ship
 * DateTime = Mon Oct 18 2021 15:18:47 GMT+0100 (West Africa Standard Time)
 * Author = EbubeUd
 * FileBasename = Ship.ts
 * FileBasenameNoExtension = Ship
 * URL = db://assets/scripts/Ship.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('Ship')
export class Ship extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    ship_type : SHIP_TYPE
    ship_name : string
    ship_size : number

    start () {
        // [3]
    }

    initShip(_ship_type : SHIP_TYPE)
    {
        this.ship_type = _ship_type;
        this.ship_name = GameLogic.getShipName(_ship_type);
        this.ship_size = GameLogic.getShipTileSize(_ship_type)
    }

    moveShip (pos : Vector2, axis : AXIS) {
        let {x, y} = GameLogic.getPositionFromCoordinates(pos, axis)
        let zRot = axis == AXIS.Y ? 0 : 90
        this.node.setPosition(x, y)
        this.node.setRotationFromEuler(0,0,zRot);
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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
