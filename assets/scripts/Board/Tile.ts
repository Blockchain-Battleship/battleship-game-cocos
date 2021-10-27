
import { _decorator, Component, Node, Color, CCObject, Sprite, Pool } from 'cc';
import GameLogic from '../Logic/GameLogic'
import { ColorModel, Vector2 } from '../Models/Models';
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
        subscribe(EVENT_NAMES.BEGIN_RESET_TILE_COLOR, this.resetTileColor)
        subscribe(EVENT_NAMES.CURSOR_LEFT_BOARD, this.onCursorLeftBoard)
        this.node.on(Node.EventType.MOUSE_ENTER, function (event) {
            //Reset Tile Color
            publish(EVENT_NAMES.BEGIN_RESET_TILE_COLOR)

            //Check if we are dragging a ship
            if(Gamemanager.isDraggingShip){
                Gamemanager.activeShip.moveShipOndrag(this.tile_id)
            }
          }, this);

        this.node.on(Node.EventType.MOUSE_DOWN, function(event){
            Gamemanager.lastClickedTile = self.tile_id
            Gamemanager.activeShip = self.occupyingShip
            Gamemanager.isMouseMoved = false
            if(self.is_occupied && self.occupyingShip){
                self.occupyingShip.setDragPoint(self.tile_id)
                Gamemanager.isDraggingShip = true;
            }else{
            }
        })

        this.node.on(Node.EventType.MOUSE_UP, function(event){
            publish(EVENT_NAMES.BEGIN_RESET_TILE_COLOR)
            if(Gamemanager.lastClickedTile == self.tile_id)
            {
                if(self.is_occupied && self.occupyingShip)
                {
                    if(!Gamemanager.isMouseMoved) {
                        //Rotate the ship because the user just clicked on the ship
                        self.occupyingShip.rotateShip(true)
                        self.occupyingShip.dropShip()
                    }else{
                        //Do Nothing. Just returned the ship back to its previous position
                    }
                }
            }else{
                //Drop the ship at the correct location if we were dragging it
                if(Gamemanager.isDraggingShip)
                {
                    Gamemanager.activeShip.dropShip();
                }
            }

            Gamemanager.isDraggingShip = false;
            Gamemanager.activeShip = null
        })

        this.node.on(Node.EventType.MOUSE_MOVE, function(event)
        {
            Gamemanager.isMouseMoved = true
        })

      

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
        this.setTileColor({r:0, g:0, b:0, a:0})
        this.is_occupied = true
        this.occupyingShip = occupyingShip
    }

    setTileAsFree(){
        this.setTileColor({r:0, g:0, b:0, a:0})
        this.is_occupied = false
        this.occupyingShip = null
    }

    indicateAccessibility(isAccessible: boolean){
        let{green, red} = isAccessible? {green: 255, red: 0} : {green: 0, red: 255};
        this.setTileColor({r:red, g:green, b:0, a:60})
    }

    setTileColor(col: ColorModel)
    {
        let _sprite : Sprite = this.node.getComponent("cc.Sprite")
        _sprite.color = new Color(col.r, col.g, col.b, col.a);
    }

    resetTileColor = () =>{
        this.setTileColor({r:0, g:0, b:0, a:0})
    }

    onCursorLeftBoard = () => 
    {
        this.resetTileColor()
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
