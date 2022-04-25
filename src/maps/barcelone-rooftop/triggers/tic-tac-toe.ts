import { TapSound } from '../../barcelone-rooftop/sounds/tap';


type TGameGridDrawType = 'cross' | 'circle' | null;

interface IGameGridItem {
  id: number;
  type: TGameGridDrawType,
}

interface IGameGridIntervalItem {
  id: number;
  interval: any;
}


/**
 * Class for the logic of the tictactoe game
 *
 * @since 2022-04-25
 * @author michael.richter
 */
export class TicTacToe {
  stepDuration: number = 1000;

  triggerIdGameSurface = 'tictactoe/triggerGameSurface';
  triggerIdGameGrid: string = 'tictactoe/triggerGameGrid';
  triggerIdReset: string = 'tictactoe/triggerReset';
  crossLayer: string = 'tictactoe/cross';
  circleLayer: string = 'tictactoe/circle';

  remoteGameGridVariableName: string = 'tictactoeGameGrid';
  resetVariableName: string = 'tictactoeResetCount';
  drawTypeVariableName: string = 'tictactoeDrawType';

  isPlayerInGameSurface: boolean = false;
  gameGridIntervals: IGameGridIntervalItem[] = [];
  gameGridDrawType: TGameGridDrawType = 'circle';
  defaultGameGrid: IGameGridItem[] = [
    { id: 1, type: null },
    { id: 2, type: null },
    { id: 3, type: null },
    { id: 4, type: null },
    { id: 5, type: null },
    { id: 6, type: null },
    { id: 7, type: null },
    { id: 8, type: null },
    { id: 9, type: null },
  ];

  /**
   * Class constructor
   */
  constructor() {
    const resetVariableName = this.resetVariableName;
    const remoteGameGridVariableName = this.remoteGameGridVariableName;
    const drawTypeVariableName = this.drawTypeVariableName;

    const defaultGameGrid = this.defaultGameGrid;
    const remoteGameGrid = WA.state.loadVariable(remoteGameGridVariableName) as IGameGridItem[];
    const currentGameGrid = remoteGameGrid || defaultGameGrid;

    const defaultDrawType = this.gameGridDrawType;
    const remoteDrawType = WA.state.loadVariable(drawTypeVariableName) as TGameGridDrawType;
    const currentDrawType = remoteDrawType || defaultDrawType;

    this.registerGameGridTriggers();
    WA.room.onEnterLayer(this.triggerIdReset).subscribe(this.onTriggerReset);
    WA.room.onEnterLayer(this.triggerIdGameSurface).subscribe(() => this.onTriggerGameSurface(true));
    WA.room.onLeaveLayer(this.triggerIdGameSurface).subscribe(() => this.onTriggerGameSurface(false));

    WA.state.onVariableChange(remoteGameGridVariableName).subscribe(this.redrawGameGrid);
    WA.state.onVariableChange(resetVariableName).subscribe(this.redrawGameGridReset);
    WA.state.onVariableChange(drawTypeVariableName).subscribe(this.changeDrawType);

    this.redrawGameGrid(currentGameGrid);
    this.changeDrawType(currentDrawType);
  }

  /**
   * Set player in game surface
   */
  private onTriggerGameSurface = (isInGameSurface: boolean) => {
    this.isPlayerInGameSurface = isInGameSurface;
  }

  /**
   * Change the draw type
   */
  private changeDrawType = (drawType: TGameGridDrawType) => {
    this.gameGridDrawType = drawType;
  }

  /**
   * Trigger game reset
   */
  private onTriggerReset = () => {
    const resetVariableName = this.resetVariableName;
    const resetCount: number = WA.state.loadVariable(resetVariableName) as number || 0;
    const newResetCount = resetCount + 1;

    WA.state.saveVariable(resetVariableName, newResetCount);
  }

  /**
   * Register all triggers on the game grid
   */
  private registerGameGridTriggers = () => {
    const defaultGameGrid = this.defaultGameGrid;
    const triggerIdGameGrid = this.triggerIdGameGrid;

    defaultGameGrid.map(item => {
      const { id } = item;
      const triggerId = triggerIdGameGrid + id;

      WA.room.onEnterLayer(triggerId).subscribe(() => this.onEnterLayer(id));
      WA.room.onLeaveLayer(triggerId).subscribe(() => this.onLeaveLayer(id));
    });
  }

  /**
   * Execute on enter a game grid layer
   */
  private onEnterLayer = (id: number) => {
    const drawType = this.gameGridDrawType;
    const intervalTime = this.stepDuration;
    const intervalFunction = () => {
      clearInterval(interval);
      this.updateGameGrid(id, drawType);
    };
    const interval = setInterval(intervalFunction, intervalTime);
    const intervalItem: IGameGridIntervalItem = { id, interval };

    this.gameGridIntervals.push(intervalItem);
  }

  /**
   * Execute on leave a game grid layer
   */
  private onLeaveLayer = (id: number) => {
    const gameGridIntervals = this.gameGridIntervals;
    const newGameGridIntervals = gameGridIntervals.filter(item => item.id !== id);

    this.gameGridIntervals = newGameGridIntervals;
    gameGridIntervals.map(item => {
      if (id === item.id)
        clearInterval(item.interval);
    });
  }

  /**
   * Redraw the game grid and remove all circles and crosses
   */
  private redrawGameGridReset = () => {
    const remoteGameGridVariableName = this.remoteGameGridVariableName;
    const defaultGameGrid = this.defaultGameGrid;

    WA.state.saveVariable(remoteGameGridVariableName, defaultGameGrid);
  }

  /**
   * Update the game grid from trigger
   */
  private updateGameGrid = (id: number, type: TGameGridDrawType) => {
    const remoteGameGridVariableName = this.remoteGameGridVariableName;
    const drawTypeVariableName = this.drawTypeVariableName;

    const drawType = this.gameGridDrawType === 'circle' ? 'cross' : 'circle';
    const defaultGameGrid = this.defaultGameGrid;
    const remoteGameGrid = WA.state.loadVariable(remoteGameGridVariableName) as IGameGridItem[];
    const currentGameGrid = remoteGameGrid || defaultGameGrid;
    const newCurrentGameGrid = currentGameGrid.map(item => {
      const itemCopy = { ...item };

      if (itemCopy.id === id)
        itemCopy.type = type;

      return itemCopy;
    });

    WA.state.saveVariable(remoteGameGridVariableName, newCurrentGameGrid);
    WA.state.saveVariable(drawTypeVariableName, drawType);
  }

  /**
   * Redraw the game grid
   */
  redrawGameGrid = (remoteGameGrid: IGameGridItem[]) => {
    const isRemoteGameGridEmpty = remoteGameGrid.filter(item => item.type !== null).length ? false : true;
    const isPlayerInGameSurface = this.isPlayerInGameSurface;

    if (!isRemoteGameGridEmpty && isPlayerInGameSurface)
      TapSound.play();

    remoteGameGrid.map(item => {
      const { id, type } = item;

      if (type === 'circle')
        this.drawCircle(id);

      if (type === 'cross')
        this.drawCross(id);

      if (type === null) {
        this.eraseCircle(id);
        this.eraseCross(id);
      }
    });
  }

  /**
   * Draw circle layer
   */
  private drawCircle(id: number) {
    const layerName = this.circleLayer + id;
    WA.room.showLayer(layerName);
  }

  /**
   * Draw cross layer
   */
  private drawCross(id: number) {
    const layerName = this.crossLayer + id;
    WA.room.showLayer(layerName);
  }

  /**
   * Erase circle layer
   */
  private eraseCircle(id: number) {
    const layerName = this.circleLayer + id;
    WA.room.hideLayer(layerName);
  }

  /**
   * Erase cross layer
   */
  private eraseCross(id: number) {
    const layerName = this.crossLayer + id;
    WA.room.hideLayer(layerName);
  }
}