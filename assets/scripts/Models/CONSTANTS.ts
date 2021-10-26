
export const BOARD_DIMENSION = {
    X: 10, 
    Y: 10
}

export const SHIP_NAME = {
    DESTROYER: "destroyer",
    SUBMARINE:"submarine",
    CRUISER: "cruiser",
    BATTLESHIP: "battleship", 
    CARRIER:"carrier"
}


export const PATH = {
    DESTROYER: "prefabs/ships/destroyer",
    SUBMARINE: "prefabs/ships/submarine",
    CRUISER: "prefabs/ships/cruiser",
    BATTLESHIP: "prefabs/ships/battleship",
    CARRIER: "prefabs/ships/carrier",
    TILE: "prefabs/tile"
}

export const SHIP_TILE_SIZE = {
    DESTROYER: 2,
    SUBMARINE: 3,
    CRUISER: 3,
    BATTLESHIP: 4,
    CARRIER: 5,
}

export const EVENT_NAMES = {
    BEGIN_LOADING_SHIPS: "begin_loading_ships",
    BEGIN_LOADING_TILES: "begin_loading_tiles",
    BEGIN_DISPLAYING_TILES: "begin_displaying_tiles",
    BEGIN_DROPPING_SHIPS: "begin_dropping_ships",
    SHIP_LOADED: "ship_loaded",
    TILE_LOADED: "tile_loaded",
    SHIP_DROPPED: "ship_dropped",
    TILE_DISPLAYED: "tile_displayed",
    TEST: "test"
}