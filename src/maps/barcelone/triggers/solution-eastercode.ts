import { Popup } from '@workadventure/iframe-api-typings/Api/iframe/Ui/Popup';
import { ButtonDescriptor } from '@workadventure/iframe-api-typings/Api/iframe/Ui/ButtonDescriptor';
import { SolutionStatus } from '../status/solution';


/**
 * Class for the solution of eastercode
 *
 * @since 2022-04-25
 * @author michael.richter
 */
export class SolutionEastercodeTrigger {
  triggerId: string = 'trigger/solutionEastercodeTrigger';
  triggerEnterSubscriber: any;
  triggerLeaveSubscriber: any;

  popup: Popup|any;

  solutionStatus: SolutionStatus;

  /**
   * Class constructor
   */
  constructor(solutionStatus: SolutionStatus) {
    this.solutionStatus = solutionStatus;
    this.triggerEnterSubscriber = WA.room.onEnterLayer(this.triggerId).subscribe(this.openPopup);
    this.triggerLeaveSubscriber = WA.room.onLeaveLayer(this.triggerId).subscribe(this.closePopup);
  }

  /**
   * Open popup
   */
  private openPopup = () => {
    const playerName = WA.player.name;
    const solutionNumbers = this.solutionStatus.getSolutionNumbers().join(' ');
    const popupId = 'solutionEastercodePopup';
    const popupMessage = `${playerName}, your elevator access code is:\n${solutionNumbers}`;
    const popupButtons = this.getPopupButtons();

    this.popup = WA.ui.openPopup(popupId, popupMessage, popupButtons);
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
}