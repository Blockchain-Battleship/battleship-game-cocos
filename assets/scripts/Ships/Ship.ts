
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
        let newAxis = toggle ? this.currentAxis == AXIS.X ? AXIS.Y : AXIS.X : axis
        if(!this.canMoveShip(this.currentTileIndex, newAxis)) return;
        this.moveShip(pos, newAxis)
    }

    moveShipOndrag(tileOnCursor: number) : void {
        let newOrigin = this.getNewShipOriginOnDrag(tileOnCursor);
        let coordinates = GameLogic.getCoordinatesFromTileIndex(newOrigin);
        if(!this.canMoveShip(newOrigin, this.currentAxis)) return

        //Display marker To indicate if its safe to drop ship
        let occupiedLocations = GameLogic.getOccupiedTiles(newOrigin, this.newAxis, this.ship_type);
        let newTiles : Tile[] = this.board.getTiles(occupiedLocations);
        let canDropShip = this.canDropShip(newTiles);
        newTiles.map(tile => {tile.indicateAccessibility(canDropShip)})

        this.moveShip(coordinates, this.currentAxis)
    }



    dropShip (){
        let occupiedLocations = GameLogic.getOccupiedTiles(this.newTileIndex, this.newAxis, this.ship_type);
        let newTiles : Tile[] = this.board.getTiles(occupiedLocations);
        let canDropShip = this.canDropShip(newTiles);

        if(!canDropShip)
        {
            //Move the ship back to its previous position
           this.resetPosition()
        }else{
            this.freePreviousTiles(this.occupiedTiles)
            this.currentTileIndex = this.newTileIndex;
            this.occupiedTiles = newTiles
            this.currentAxis = this.newAxis
            this.occupyNewTiles(this.occupiedTiles)
            publish(EVENT_NAMES.SHIP_DROPPED, this.occupiedTiles)
        }
    }

    canMoveShip(tileIndex: number, axis: AXIS) : boolean{
        let tilesToOccupy: number[] = GameLogic.getOccupiedTiles(tileIndex,axis, this.ship_type)
        Logger.log("tiles to occupy", tilesToOccupy)
        let incrementor = axis == AXIS.X ? 1 : 10
        let maxTileIndex = tileIndex + (this.ship_size-1) * incrementor

        //Ensure that the y axis is within the board
        if(tileIndex < 1 || maxTileIndex > 100) return false;
        
        //Ensure the at the x axis is within the board
        let coorsMin = GameLogic.getCoordinatesFromTileIndex(tileIndex)
        let coorsMax = GameLogic.getCoordinatesFromTileIndex(maxTileIndex)

        switch(axis)
        {
            case AXIS.X:
                if(coorsMin.y != coorsMax.y) return false
                break;
            case AXIS.Y:
                if(coorsMin.x != coorsMax.x) return false
                break
        }

        return true
       
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

    resetPosition() : void{
        let coors = GameLogic.getCoordinatesFromTileIndex(this.currentTileIndex);
        this.moveShip(coors, this.currentAxis)
        this.dropShip();
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
