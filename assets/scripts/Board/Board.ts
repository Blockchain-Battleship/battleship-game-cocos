
import { _decorator, Component, Node, resources, instantiate, director, Game} from 'cc';
import {BOARD_DIMENSION, SHIP_NAME, PATH, EVENT_NAMES} from '../Models/CONSTANTS'
import {AXIS, SHIP_TYPE} from '../Models/Enums'
import {Tile} from './Tile'
import {Ship} from '../Ships/Ship'
import { Vector2 } from '../Models/Models';
import GameLogic from '../Logic/GameLogic';
import { publish, subscribe } from '../Lib/PubSub';
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
    tiles = {number: Tile}
    has_loaded_tiles : Boolean = false
    has_loaded_ships : Boolean = false

    start () {
        this.loadTiles();
        subscribe(EVENT_NAMES.BEGIN_LOADING_SHIPS, this.loadShips)
        subscribe(EVENT_NAMES.BEGIN_DISPLAYING_TILES, this.displayTiles)
    }

    loadTiles = async() =>{
       var self = this;
 
        for(var x = 1; x<= BOARD_DIMENSION.X; x++)
        {
            for(var y = 1; y <= BOARD_DIMENSION.Y; y++)
            {
                GameLogic.getTileIndexFromCordinates({x,y})
                this.loadTile({x,y})
            }
        }
    }

    loadShips = () => 
    {
        //Load All Ships on the Board
        this.loadShip(PATH.DESTROYER, {x:1,y:1}, AXIS.Y, SHIP_TYPE.DESTROYER)
        this.loadShip(PATH.SUBMARINE, {x:3,y:1}, AXIS.Y, SHIP_TYPE.SUBMARINE)
        this.loadShip(PATH.CRUISER, {x:2,y:1}, AXIS.Y, SHIP_TYPE.CRUISER)
        this.loadShip(PATH.BATTLESHIP, {x:4,y:1}, AXIS.Y, SHIP_TYPE.BATTLESHIP)
        this.loadShip(PATH.CARRIER, {x:5,y:1}, AXIS.Y, SHIP_TYPE.CARRIER)
    }

    loadTile = (position : Vector2) => 
    {
        var self = this;
        var tileIndex = GameLogic.getTileIndexFromCordinates(position)
        resources.load(PATH.TILE, function (err, prefab) {
            var newNode : Scene | Node = instantiate(prefab);
            var tileComponent : Tile = newNode.getComponent(Tile)
            tileComponent.init(tileIndex);
            tileComponent.setTilePosition(position);
            //self.node.addChild(newNode);
            self.tiles[tileIndex] = tileComponent;
            publish(EVENT_NAMES.TILE_LOADED, tileIndex)
        });
    }

    loadShip = (path : string, position : Vector2, axis: AXIS, ship_type: SHIP_TYPE) => 
    {
        var self = this;
        resources.load(path, function (err, prefab) {
            var newNode : Scene | Node = instantiate(prefab);
            var shipComponent : Ship = newNode.getComponent(Ship)
            shipComponent.initShip(ship_type);
            self.placeShip(shipComponent, position, axis)
            self.node.addChild(newNode);
            publish(EVENT_NAMES.SHIP_LOADED, ship_type);
        });
    }

    placeShip = (ship : Ship, pos : Vector2, axis : AXIS) => 
    {
        //get the index tile 
        let indexTile = GameLogic.getTileIndexFromCordinates(pos);
        let occupiedTiles = GameLogic.getOccupiedTiles(indexTile, axis, ship.ship_type);
        this.lockTiles(occupiedTiles)
        ship.moveShip(pos, axis);
    }

    lockTiles(_tiles : number[]) : void{
        for(var i = 0; i< _tiles.length; i++)
        {
            this.tiles[_tiles[i]].setTileAsOccupied()
        }
    }

    displayTiles = () : void => {
        for(var i = 1; i<=100; i++)
        {
            this.node.addChild(this.tiles[i].node)
        }
    }


    

    //  update (deltaTime: number) {
      
    //  }
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
