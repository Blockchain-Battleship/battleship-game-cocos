
import { _decorator, Component, Node, director } from 'cc';
import {AXIS, SHIP_TYPE} from '../Models/Enums'
import GameLogic  from '../Logic/GameLogic';
import { Vector2 } from '../Models/Models';
import { publish, subscribe } from '../Lib/PubSub';
import { BOARD_DIMENSION, EVENT_NAMES } from '../Models/CONSTANTS';
import { sleep } from '../Lib/Threading';
import { Tile } from '../Board/Tile';
import { Board } from '../Board/Board';
import Logger from '../Lib/Logger';
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

    board: Board
    ship_type: SHIP_TYPE
    ship_name: string
    ship_size: number
    currentTileIndex: number
    currentAxis: AXIS
    newAxis: AXIS
    distanceBtDragPointAndShipOrigin: number
    occupiedTiles: Tile[]
    newTileIndex: number //The new tile index that is occupied by the ship on drag.

    start () {
        // [3]
    }

    init(_ship_type : SHIP_TYPE, _board: Board)
    {
        this.ship_type = _ship_type;
        this.ship_name = GameLogic.getShipName(_ship_type);
        this.ship_size = GameLogic.getShipTileSize(_ship_type)
        this.board = _board
        this.occupiedTiles = []
    }

    moveShip (pos : Vector2, axis : AXIS) {
        let tileIndex = GameLogic.getTileIndexFromCordinates(pos);
        this.newTileIndex = tileIndex;
        let {x, y} = GameLogic.getPositionFromCoordinates(pos, axis)
        let zRot = axis == AXIS.Y ? 0 : 90
        this.node.setPosition(x, y)
        this.node.setRotationFromEuler(0,0,zRot);
        this.newAxis = axis
    }

    setDragPoint(clickedTileIndex: number){
        this.distanceBtDragPointAndShipOrigin = clickedTileIndex - this.currentTileIndex;
    }

    rotateShip(toggle: boolean, axis : AXIS = null)
    {
        let pos = GameLogic.getCoordinatesFromTileIndex(this.currentTileIndex)
        if(toggle)
        {
            let newAxis = this.currentAxis == AXIS.X ? AXIS.Y : AXIS.X
            this.moveShip(pos, newAxis)
        }else{
            this.moveShip(pos, axis)
        }
    }

    dropShip (){
        let occupiedLocations = GameLogic.getOccupiedTiles(this.newTileIndex, this.newAxis, this.ship_type);
        let newTiles : Tile[] = this.board.getTiles(occupiedLocations);
        let canDropShip = this.canDropShip(newTiles);

        if(!canDropShip)
        {
            Logger.log("Can not drop ship, moving ship back to previous location")
            //Move the ship back to its previous position
            let coordinates = GameLogic.getCoordinatesFromTileIndex(this.currentTileIndex)
            this.moveShip(coordinates, this.currentAxis)
            this.dropShip()
        }else{
            Logger.log("Can drop ship. Dropping ship")
            Logger.log()
            this.freePreviousTiles(this.occupiedTiles)
            this.currentTileIndex = this.newTileIndex;
            this.occupiedTiles = newTiles
            this.currentAxis = this.newAxis
            this.occupyNewTiles(this.occupiedTiles)
            publish(EVENT_NAMES.SHIP_DROPPED, this.occupiedTiles)
        }
    }

    canDropShip(tiles: Tile[]) : boolean
    {
        for(var i = 0; i< tiles.length; i++)
        {
            if(tiles[i].is_occupied && tiles[i].occupyingShip.ship_type != this.ship_type)
            {
                return false
            }
        }
        return true
    }

    freePreviousTiles(previousTiles : Tile[]) : void {
        for(var i = 0; i< previousTiles.length; i++)
        {
            previousTiles[i].setTileAsFree()
        }
    }

    occupyNewTiles(newTiles: Tile[]) : void {
        for(var i = 0; i < newTiles.length; i++)
        {
            newTiles[i].setTileAsOccupied(this)
        }
    }

    getNewShipOriginOnDrag(tileOnCursor: number) : number
    {
        let newShipOrigin = tileOnCursor - this.distanceBtDragPointAndShipOrigin;
        return newShipOrigin;
    }

    moveShipOndrag(tileOnCursor: number) : void {
        let newOrigin = this.getNewShipOriginOnDrag(tileOnCursor);
        let coordinates = GameLogic.getCoordinatesFromTileIndex(newOrigin);
        let tilesToOccupy = GameLogic.getOccupiedTiles(newOrigin,this.currentAxis, this.ship_type)

        if(tilesToOccupy[0] < this.board.minTile || tilesToOccupy[tilesToOccupy.length - 1] > this.board.maxTile) return
        this.moveShip(coordinates, this.currentAxis)
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
