
import { _decorator, Component, Node } from 'cc';
import { publish, subscribe } from '../Lib/PubSub';
import { SHIP_TYPE } from '../Models/Enums';
import { EVENT_NAMES } from '../Models/CONSTANTS';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Gamemanager
 * DateTime = Mon Oct 25 2021 15:58:40 GMT+0100 (West Africa Standard Time)
 * Author = EbubeUd
 * FileBasename = Gamemanager.ts
 * FileBasenameNoExtension = Gamemanager
 * URL = db://assets/scripts/Management/Gamemanager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('Gamemanager')
export class Gamemanager extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property
    static shipsLoaded: number = 0 
    static tilesLoaded: number = 0

    start () {
       subscribe(EVENT_NAMES.SHIP_LOADED, this.onShipLoaded)
       subscribe(EVENT_NAMES.TILE_LOADED, this.onTileLoaded)
    }



    onTileLoaded = (tileId: number) => {
        let self = Gamemanager
        self.tilesLoaded++;
        if(self.tilesLoaded == 100)
        {
            console.log("Done loading tiles, now loading ships")
            publish(EVENT_NAMES.BEGIN_LOADING_SHIPS)
        }
    }

    onShipLoaded = (shipType : SHIP_TYPE) => {
        let self = Gamemanager
        self.shipsLoaded++;
        if(self.shipsLoaded == 5)
        {
            //Publish an event to display the tiles
            console.log("Done loading ships, now displaying tiles ");
            publish(EVENT_NAMES.BEGIN_DISPLAYING_TILES)
        }
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
