import { Popup } from '@workadventure/iframe-api-typings/Api/iframe/Ui/Popup';
import { ButtonDescriptor } from '@workadventure/iframe-api-typings/Api/iframe/Ui/ButtonDescriptor';
import { SolutionStatus } from '../status/solution';
import { EasterreggSound } from '../sounds/easteregg';


/**
 * Trigger class for easteregg computer
 *
 * @since 2022-04-25
 * @author michael.richter
 */
export class EastereggComputerTrigger {
  triggerId: string = 'trigger/eastereggComputerTrigger';
  triggerEnterSubscriber: any;
  triggerLeaveSubscriber: any;

  popup: Popup|any;

  solutionStatus: SolutionStatus;
  computerVariableName: string = 'eastereggComputerIsOn';
  hasFoundEasteregg: boolean = false;

  /**
   * Class constructor
   */
  constructor(solutionStatus: SolutionStatus) {
    const computerVariableName = this.computerVariableName;
    const isComputerOn:boolean = WA.state.loadVariable(computerVariableName) as boolean;
    this.refreshComputerStatus(isComputerOn);

    this.solutionStatus = solutionStatus;

    this.triggerEnterSubscriber = WA.room.onEnterLayer(this.triggerId).subscribe(this.openPopup);
    this.triggerLeaveSubscriber = WA.room.onLeaveLayer(this.triggerId).subscribe(this.closePopup);
    WA.state.onVariableChange(computerVariableName).subscribe(this.refreshComputerStatus);
  }

  /**
   * Open popup
   */
  private openPopup = () => {
    const popupId = 'eastereggComputerPopup';
    const popupMessage = 'Congratulations!\nYou\'ve found an easteregg to switch the computers on and off. Awesome!';
    const popupButtons = this.getPopupButtons();

    if (!this.hasFoundEasteregg) {
      this.popup = WA.ui.openPopup(popupId, popupMessage, popupButtons);
      EasterreggSound.play();
    }

    this.solutionStatus.foundComputer();
    this.toggleComputerStatus();
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
   * Switch computers on/off
   */
  private toggleComputerStatus = () => {
    const computerVariableName = this.computerVariableName;
    const isComputerOn = WA.state.loadVariable(computerVariableName) === true;

    WA.state.saveVariable(computerVariableName, !isComputerOn);
  }

  /**
   * Hide or display computer layers
   */
  private refreshComputerStatus = (isComputerOn: boolean) => {
    isComputerOn
      ? WA.room.showLayer('computer-on')
      : WA.room.hideLayer('computer-on');
  }
}