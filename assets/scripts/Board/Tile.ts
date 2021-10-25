
import { _decorator, Component, Node, Color, CCObject, Sprite } from 'cc';
import GameLogic from '../Logic/GameLogic'
import { Vector2 } from '../Models/Models';
import { SHIP_TYPE } from '../Models/Enums';
import { Ship } from '../Ships/Ship';
import { Gamemanager } from '../Management/Gamemanager';
import { publish, subscribe } from '../Lib/PubSub';
import { EVENT_NAMES } from '../Models/CONSTANTS';
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
    occupyingShip: Ship


    start () {
      
        let self = this;

        this.node.on(Node.EventType.MOUSE_ENTER, function (event) {
            console.log(self.occupyingShip);
          }, this);

        this.node.on(Node.EventType.MOUSE_DOWN, function(event){
            Gamemanager.lastClickedTile = self.tile_id
            if(self.is_occupied && self.occupyingShip){
                self.occupyingShip.setDragPoint(self.tile_id)
            }else{
                console.log("No ship is occupying this space")
            }
        })

        this.node.on(Node.EventType.MOUSE_UP, function(event){
            if(Gamemanager.lastClickedTile == self.tile_id)
            {
                if(self.is_occupied && self.occupyingShip)
                {
                    self.occupyingShip.rotateShip(true)
                }
            }else{
                console.log("Might want to check If we were dragging a ship")
            }
        })

        //Event Binding
        subscribe(EVENT_NAMES.SHIP_DROPPED, this.onShipDropped)

    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    init(tileIndex : number){
        this.tile_id = tileIndex
        this.coordinates = GameLogic.getCoordinatesFromTileIndex(tileIndex)
        this.occupyingShip = null
    }

    setTilePosition = (pos : Vector2) => {
       let {x, y} =  GameLogic.getPositionFromCoordinates(pos);
        this.node.setPosition(x,y)        
    }

    setTileAsOccupied(occupyingShip: Ship) {
        let _sprite : Sprite = this.node.getComponent("cc.Sprite")
        _sprite.color = new Color(255, 0, 0, 60);
        this.is_occupied = true
        this.occupyingShip = occupyingShip
    }

    setTileAsFree(){
        this.is_occupied = false
        this.occupyingShip = null
    }

    onShipDropped = (ship: Ship) =>{
        console.log("Checking Ship Pos");
        //check if the tile Id is currently occuped by another ship
        if (this.is_occupied)
        {
            if(this.occupyingShip.ship_type == ship.ship_type)
            {
                //check if this tile is still occupied by the ship
                if(ship.occupiedLocations.indexOf(this.tile_id) > -1){
                    this.occupyingShip = ship;
                }else{
                    this.setTileAsFree()
                }
                
            }else{
                console.log(`${this.tile_id} is occupied by a different ship`)
            }
        }else{
            //check if the tile exists in the list of tiles occupied by this ship
            if(ship.occupiedLocations.indexOf(this.tile_id) > -1){
                this.setTileAsOccupied(ship)
            }
        }
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
