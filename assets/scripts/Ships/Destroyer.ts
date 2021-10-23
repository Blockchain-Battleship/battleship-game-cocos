
import { _decorator, Component, Node } from 'cc';
import {Ship} from './Ship'
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Destroyer
 * DateTime = Mon Oct 18 2021 15:20:54 GMT+0100 (West Africa Standard Time)
 * Author = EbubeUd
 * FileBasename = Destroyer.ts
 * FileBasenameNoExtension = Destroyer
 * URL = db://assets/scripts/Destroyer.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('Destroyer')
export class Destroyer extends Ship {
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
