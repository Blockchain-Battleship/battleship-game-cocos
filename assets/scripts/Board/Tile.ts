
import { _decorator, Component, Node } from 'cc';
import PlacementLogic from '../Logic/PlacementLogic'
import { Vector2 } from '../Models/Models';
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
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    setTilePosition = (pos : Vector2) => {
       let {x, y} =  PlacementLogic.getPositionFromTileIndex(pos);
        this.node.setPosition(x,y)        
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
