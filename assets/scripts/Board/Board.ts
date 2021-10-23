
import { _decorator, Component, Node, resources, instantiate, director} from 'cc';
import {BOARD_DIMENSION, AXIS, SHIP_NAME} from '../Models/CONSTANTS'
import {Tile} from './Tile'
import {Ship} from '../Ships/Ship'
import { Vector2 } from '../Models/Models';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Board
 * DateTime = Mon Oct 18 2021 15:23:47 GMT+0100 (West Africa Standard Time)
 * Author = EbubeUd
 * FileBasename = Board.ts
 * FileBasenameNoExtension = Board
 * URL = db://assets/scripts/Board.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('Board')
export class Board extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    tiles = {}

    start () {
        this.loadTiles();

        //Load All Ships on the Board
        this.loadShip(SHIP_NAME.DESTROYER, {x:1,y:1}, AXIS.Y)
        this.loadShip(SHIP_NAME.CRUISER, {x:2,y:1}, AXIS.Y)
        this.loadShip(SHIP_NAME.SUBMARINE, {x:3,y:1}, AXIS.Y)
        this.loadShip(SHIP_NAME.BATTLESHIP, {x:4,y:1}, AXIS.Y)
        this.loadShip(SHIP_NAME.CARRIER, {x:5,y:1}, AXIS.Y)
    }

    loadTiles = async() =>{
       var self = this;
 
        for(var x = 1; x<= BOARD_DIMENSION.X; x++)
        {
            for(var y = 1; y <= BOARD_DIMENSION.Y; y++)
            {
                this.loadTile({x,y})
            }
        }
    }

    loadTile = (position : Vector2) => 
    {
        var self = this;
        resources.load("prefabs/tile", function (err, prefab) {
            var newNode : Scene | Node = instantiate(prefab);
            var tileComponent : Tile = newNode.getComponent(Tile)
            tileComponent.setTilePosition(position);
            self.node.addChild(newNode);
        });
    }

    loadShip = (shipType : String, position : PositionModel, axis: AXIS) => 
    {
        var self = this;
        resources.load(`prefabs/ships/${shipType}`, function (err, prefab) {
            var newNode : Scene | Node = instantiate(prefab);
            var shipComponent : Ship = newNode.getComponent(Ship)
            console.log("Ship Comp", shipComponent)
            shipComponent.moveShip(position, axis);
            self.node.addChild(newNode);
        });
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
