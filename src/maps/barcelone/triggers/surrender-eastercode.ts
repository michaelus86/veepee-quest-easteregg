import { Popup } from '@workadventure/iframe-api-typings/Api/iframe/Ui/Popup';
import { ButtonDescriptor } from '@workadventure/iframe-api-typings/Api/iframe/Ui/ButtonDescriptor';
import { SolutionStatus } from '../status/solution';


/**
 * Class for the giveup of eastercode
 *
 * @since 2022-04-25
 * @author michael.richter
 */
export class SurrenderEastercodeTrigger {
  triggerId: string = 'trigger/surrenderEastercodeTrigger';
  triggerEnterSubscriber: any;
  triggerLeaveSubscriber: any;

  popup1: Popup|any;
  popup2: Popup|any;
  popup3: Popup|any;

  solutionStatus: SolutionStatus;

  /**
   * Class constructor
   */
  constructor(solutionStatus: SolutionStatus) {
    this.solutionStatus = solutionStatus;
    this.triggerEnterSubscriber = WA.room.onEnterLayer(this.triggerId).subscribe(this.openPopup1);
    this.triggerLeaveSubscriber = WA.room.onLeaveLayer(this.triggerId).subscribe(this.closeAllPopups);
  }

  /**
   * Open popup1
   */
  private openPopup1 = () => {
    const playerName = WA.player.name;
    const popupId = 'surrenderEastercodePopup';
    const popupMessage = `Do you really want to give up, ${playerName}?`;
    const popupButtons = this.getPopup1Buttons();

    this.popup1 = WA.ui.openPopup(popupId, popupMessage, popupButtons);
  }

  /**
   * Open popup2
   */
  private openPopup2 = () => {
    const popupId = 'surrenderEastercodePopup';
    const popupMessage = 'Are you really sure?';
    const popupButtons = this.getPopup2Buttons();

    this.popup1 = WA.ui.openPopup(popupId, popupMessage, popupButtons);
  }

  /**
   * Open popup3
   */
  private openPopup3 = () => {
    const popupId = 'surrenderEastercodePopup';
    const popupMessage = 'Well. You can go to the computer to get your access code to the elevator.';
    const popupButtons = this.getPopup3Buttons();

    this.popup1 = WA.ui.openPopup(popupId, popupMessage, popupButtons);

    this.solutionStatus.solveAll();
  }

  /**
   * Return all popup1 buttons
   */
  private getPopup1Buttons = () => {
    const buttonNo: ButtonDescriptor = {
      label: 'No',
      className: 'primary',
      callback: popup => popup.close(),
    };

    const buttonYes: ButtonDescriptor = {
      label: 'Yes',
      className: 'primary',
      callback: popup => {
        popup.close();
        this.openPopup2();
      },
    };

    return [
      buttonNo,
      buttonYes,
    ];
  }

  /**
   * Return all popup2 buttons
   */
  private getPopup2Buttons = () => {
    const buttonNo: ButtonDescriptor = {
      label: 'No',
      className: 'primary',
      callback: popup => popup.close(),
    };

    const buttonYes: ButtonDescriptor = {
      label: 'Yes',
      className: 'primary',
      callback: popup => {
        popup.close();
        this.openPopup3();
      },
    };

    return [
      buttonNo,
      buttonYes,
    ];
  }

  /**
   * Return all popup3 buttons
   */
  private getPopup3Buttons = () => {
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
   * Close all popups
   */
  private closeAllPopups = () => {
    if (this.popup1)
      this.popup1.close();

    if (this.popup2)
      this.popup2.close();

    if (this.popup3)
      this.popup3.close();
  }
}