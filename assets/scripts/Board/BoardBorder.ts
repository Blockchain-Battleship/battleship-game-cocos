
import { _decorator, Component, Node } from 'cc';
import Logger from '../Lib/Logger';
import { publish } from '../Lib/PubSub';
import { EVENT_NAMES } from '../Models/CONSTANTS';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = BoardBorder
 * DateTime = Wed Oct 27 2021 20:59:49 GMT+0100 (West Africa Standard Time)
 * Author = EbubeUd
 * FileBasename = BoardBorder.ts
 * FileBasenameNoExtension = BoardBorder
 * URL = db://assets/scripts/Board/BoardBorder.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('BoardBorder')
export class BoardBorder extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
       this.node.on(Node.EventType.MOUSE_ENTER, function(event){
           Logger.log("Left Board")
           publish(EVENT_NAMES.CURSOR_LEFT_BOARD)
       })
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
