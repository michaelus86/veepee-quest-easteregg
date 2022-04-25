import { Popup } from '@workadventure/iframe-api-typings/Api/iframe/Ui/Popup';
import { ButtonDescriptor } from '@workadventure/iframe-api-typings/Api/iframe/Ui/ButtonDescriptor';
import { SolutionStatus } from '../status/solution';
import { EasterreggSound } from '../sounds/easteregg';


/**
 * Trigger class for easteregg lamp
 *
 * @since 2022-04-25
 * @author michael.richter
 */
export class EastereggLampTrigger {
  triggerId: string = 'trigger/eastereggLampTrigger';
  triggerEnterSubscriber: any;
  triggerLeaveSubscriber: any;

  popup: Popup|any;

  solutionStatus: SolutionStatus;
  lampVariableName: string = 'eastereggLampIsOn';
  hasFoundEasteregg: boolean = false;

  /**
   * Class constructor
   */
  constructor(solutionStatus: SolutionStatus) {
    const lampVariableName = this.lampVariableName;
    const isLampOn:boolean = WA.state.loadVariable(lampVariableName) as boolean;
    this.refreshLampStatus(isLampOn);

    this.solutionStatus = solutionStatus;

    this.triggerEnterSubscriber = WA.room.onEnterLayer(this.triggerId).subscribe(this.openPopup);
    this.triggerLeaveSubscriber = WA.room.onLeaveLayer(this.triggerId).subscribe(this.closePopup);

    WA.state.onVariableChange(lampVariableName).subscribe(this.refreshLampStatus);
  }

  /**
   * Open popup
   */
  private openPopup = () => {
    const popupId = 'eastereggLampPopup';
    const popupMessage = 'Congratulations!\nYou\'ve found an easteregg to switch the lamps on and off. Nice!';
    const popupButtons = this.getPopupButtons();

    if (!this.hasFoundEasteregg) {
      this.popup = WA.ui.openPopup(popupId, popupMessage, popupButtons);
      EasterreggSound.play();
    }

    this.solutionStatus.foundLamp();
    this.toggleLampStatus();
    this.hasFoundEasteregg = true;
  }

  /**
   * Return all popup buttons
   */
  private getPopupButtons = () => {
    const buttonOkay: ButtonDescriptor = {
      label: 'Okay',
      className: 'primary',
      callback: popup => popup.close(),
    };

    return [
      buttonOkay,
    ];
  }

  /**
   * Close popup
   */
  private closePopup = () => {
    this.popup.close();
  }

  /**
   * Switch lamps on/off
   */
  private toggleLampStatus = () => {
    const lampVariableName = this.lampVariableName;
    const isLampOn = WA.state.loadVariable(lampVariableName) === true;

    WA.state.saveVariable(lampVariableName, !isLampOn);
  }

  /**
   * Hide or display lamp layers
   */
  private refreshLampStatus = (isLampOn: boolean) => {
    isLampOn
      ? WA.room.showLayer('lamp-on')
      : WA.room.hideLayer('lamp-on');
  }
}