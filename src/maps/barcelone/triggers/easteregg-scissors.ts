import { Popup } from '@workadventure/iframe-api-typings/Api/iframe/Ui/Popup';
import { ButtonDescriptor } from '@workadventure/iframe-api-typings/Api/iframe/Ui/ButtonDescriptor';
import { SolutionStatus } from '../status/solution';
import { EasterreggSound } from '../sounds/easteregg';


type TScissorsFound = {
  [key: string]: boolean
}


/**
 * Trigger class for easteregg scissors
 *
 * @since 2022-04-25
 * @author michael.richter
 */
export class EastereggScissorsTrigger {
  triggerId1: string = 'trigger/eastereggScissorsTrigger1';
  triggerId2: string = 'trigger/eastereggScissorsTrigger2';
  triggerId3: string = 'trigger/eastereggScissorsTrigger3';
  triggerId4: string = 'trigger/eastereggScissorsTrigger4';
  triggerId5: string = 'trigger/eastereggScissorsTrigger5';
  triggerId6: string = 'trigger/eastereggScissorsTrigger6';
  triggerId7: string = 'trigger/eastereggScissorsTrigger7';

  triggerEnterSubscriber1: any;
  triggerEnterSubscriber2: any;
  triggerEnterSubscriber3: any;
  triggerEnterSubscriber4: any;
  triggerEnterSubscriber5: any;
  triggerEnterSubscriber6: any;
  triggerEnterSubscriber7: any;

  triggerLeaveSubscriber1: any;
  triggerLeaveSubscriber2: any;
  triggerLeaveSubscriber3: any;
  triggerLeaveSubscriber4: any;
  triggerLeaveSubscriber5: any;
  triggerLeaveSubscriber6: any;
  triggerLeaveSubscriber7: any;

  popup1: Popup|any;
  popup2: Popup|any;
  popup3: Popup|any;
  popup4: Popup|any;
  popup5: Popup|any;
  popup6: Popup|any;
  popup7: Popup|any;

  scissorsFound:TScissorsFound = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
  };

  solutionStatus: SolutionStatus;

  /**
   * Class constructor
   */
  constructor(solutionStatus: SolutionStatus) {
    this.solutionStatus = solutionStatus;

    this.triggerEnterSubscriber1 = WA.room.onEnterLayer(this.triggerId1).subscribe(this.openPopup1);
    this.triggerLeaveSubscriber1 = WA.room.onLeaveLayer(this.triggerId1).subscribe(this.closeAllPopups);

    this.triggerEnterSubscriber2 = WA.room.onEnterLayer(this.triggerId2).subscribe(this.openPopup2);
    this.triggerLeaveSubscriber2 = WA.room.onLeaveLayer(this.triggerId2).subscribe(this.closeAllPopups);

    this.triggerEnterSubscriber3 = WA.room.onEnterLayer(this.triggerId3).subscribe(this.openPopup3);
    this.triggerLeaveSubscriber3 = WA.room.onLeaveLayer(this.triggerId3).subscribe(this.closeAllPopups);

    this.triggerEnterSubscriber4 = WA.room.onEnterLayer(this.triggerId4).subscribe(this.openPopup4);
    this.triggerLeaveSubscriber4 = WA.room.onLeaveLayer(this.triggerId4).subscribe(this.closeAllPopups);

    this.triggerEnterSubscriber5 = WA.room.onEnterLayer(this.triggerId5).subscribe(this.openPopup5);
    this.triggerLeaveSubscriber5 = WA.room.onLeaveLayer(this.triggerId5).subscribe(this.closeAllPopups);

    this.triggerEnterSubscriber6 = WA.room.onEnterLayer(this.triggerId6).subscribe(this.openPopup6);
    this.triggerLeaveSubscriber6 = WA.room.onLeaveLayer(this.triggerId6).subscribe(this.closeAllPopups);

    this.triggerEnterSubscriber7 = WA.room.onEnterLayer(this.triggerId7).subscribe(this.openPopup7);
    this.triggerLeaveSubscriber7 = WA.room.onLeaveLayer(this.triggerId7).subscribe(this.closeAllPopups);
  }

  /**
   * Open popup1
   */
  private openPopup1 = () => {
    const missingScissorsQty = this.foundScissors(1);
    const scissorsMissingMessage = this.getScissorsMissingMessage(missingScissorsQty);
    const popupId = 'eastereggScissorsPopup1';
    const popupMessage = 'You\'ve found a scissors on the tube.' + scissorsMissingMessage;
    const popupButtons = this.getPopupButtons();

    this.popup1 = WA.ui.openPopup(popupId, popupMessage, popupButtons);

    this.triggerEnterSubscriber1.unsubscribe();
  }

  /**
   * Open popup2
   */
  private openPopup2 = () => {
    const missingScissorsQty = this.foundScissors(2);
    const scissorsMissingMessage = this.getScissorsMissingMessage(missingScissorsQty);
    const popupId = 'eastereggScissorsPopup2';
    const popupMessage = 'You\'ve found a scissors on the bench.' + scissorsMissingMessage;
    const popupButtons = this.getPopupButtons();

    this.popup2 = WA.ui.openPopup(popupId, popupMessage, popupButtons);

    this.triggerEnterSubscriber2.unsubscribe();
  }

  /**
   * Open popup3
   */
  private openPopup3 = () => {
    const missingScissorsQty = this.foundScissors(3);
    const scissorsMissingMessage = this.getScissorsMissingMessage(missingScissorsQty);
    const popupId = 'eastereggScissorsPopup3';
    const popupMessage = 'You\'ve found a scissors under the plant.' + scissorsMissingMessage;
    const popupButtons = this.getPopupButtons();

    this.popup3 = WA.ui.openPopup(popupId, popupMessage, popupButtons);

    this.triggerEnterSubscriber3.unsubscribe();
  }

  /**
   * Open popup4
   */
  private openPopup4 = () => {
    const missingScissorsQty = this.foundScissors(4);
    const scissorsMissingMessage = this.getScissorsMissingMessage(missingScissorsQty);
    const popupId = 'eastereggScissorsPopup4';
    const popupMessage = 'You\'ve found a scissors on the table.' + scissorsMissingMessage;
    const popupButtons = this.getPopupButtons();

    this.popup4 = WA.ui.openPopup(popupId, popupMessage, popupButtons);

    this.triggerEnterSubscriber4.unsubscribe();
  }

  /**
   * Open popup5
   */
  private openPopup5 = () => {
    const missingScissorsQty = this.foundScissors(5);
    const scissorsMissingMessage = this.getScissorsMissingMessage(missingScissorsQty);
    const popupId = 'eastereggScissorsPopup5';
    const popupMessage = 'You\'ve found a scissors on top of the veepee parcel.' + scissorsMissingMessage;
    const popupButtons = this.getPopupButtons();

    this.popup5 = WA.ui.openPopup(popupId, popupMessage, popupButtons);

    this.triggerEnterSubscriber5.unsubscribe();
  }

  /**
   * Open popup6
   */
  private openPopup6 = () => {
    const missingScissorsQty = this.foundScissors(6);
    const scissorsMissingMessage = this.getScissorsMissingMessage(missingScissorsQty);
    const popupId = 'eastereggScissorsPopup6';
    const popupMessage = 'You\'ve found a scissors on the couch.' + scissorsMissingMessage;
    const popupButtons = this.getPopupButtons();

    this.popup6 = WA.ui.openPopup(popupId, popupMessage, popupButtons);

    this.triggerEnterSubscriber6.unsubscribe();
  }

  /**
   * Open popup7
   */
  private openPopup7 = () => {
    const missingScissorsQty = this.foundScissors(7);
    const scissorsMissingMessage = this.getScissorsMissingMessage(missingScissorsQty);
    const popupId = 'eastereggScissorsPopup7';
    const popupMessage = 'You\'ve found a scissors in the meeting room.' + scissorsMissingMessage;
    const popupButtons = this.getPopupButtons();

    this.popup7 = WA.ui.openPopup(popupId, popupMessage, popupButtons);

    this.triggerEnterSubscriber7.unsubscribe();
  }

  /**
   * Return all popup1 buttons
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
   * Close all popup
   */
  private closeAllPopups = () => {
    if (this.popup1)
      this.popup1.close();

    if (this.popup2)
      this.popup2.close();

    if (this.popup3)
      this.popup3.close();

    if (this.popup4)
      this.popup4.close();

    if (this.popup5)
      this.popup5.close();

    if (this.popup6)
      this.popup6.close();

    if (this.popup7)
      this.popup7.close();
  }

  /**
   * Found a scissors
   */
  private foundScissors = (name: number):number => {
    this.scissorsFound[name] = true;

    const scissorsAllQty = Object.keys(this.scissorsFound).length;
    const scissorsFoundQty = Object.values(this.scissorsFound).filter(value => value).length;
    const scissorsMissingQty = scissorsAllQty - scissorsFoundQty;

    return scissorsMissingQty;
  }

  /**
   * Get message of missing scissors or success message
   */
  private getScissorsMissingMessage = (missingScissors: number) => {
    if (missingScissors)
      return `\n${missingScissors} are still missing.`;

    this.solutionStatus.foundScissors();

    EasterreggSound.play();

    return '\nCongratulations!\nYou\'ve found an easteregg all scissors. Good work!';
  }
}