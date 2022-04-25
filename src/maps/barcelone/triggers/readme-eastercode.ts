import { Popup } from '@workadventure/iframe-api-typings/Api/iframe/Ui/Popup';
import { ButtonDescriptor } from '@workadventure/iframe-api-typings/Api/iframe/Ui/ButtonDescriptor';


/**
 * Class for the readme of eastercode
 *
 * @since 2022-04-25
 * @author michael.richter
 */
export class ReadmeEastercodeTrigger {
  triggerId: string = 'trigger/readmeEastercodeTrigger';
  triggerEnterSubscriber: any;
  triggerLeaveSubscriber: any;

  popup: Popup|any;

  /**
   * Class constructor
   */
  constructor() {
    this.triggerEnterSubscriber = WA.room.onEnterLayer(this.triggerId).subscribe(this.openPopup);
    this.triggerLeaveSubscriber = WA.room.onLeaveLayer(this.triggerId).subscribe(this.closePopup);
  }

  /**
   * Open popup
   */
  private openPopup = () => {
    const playerName = WA.player.name;
    const popupId = 'readmeEastercodePopup';
    const popupMessage = `Hello ${playerName}!\n We've hidden 6 eastereggs in these rooms. The eastereggs can be objects and combinations which you've to find. After that you'll receive your elevator access code.\n\nThe afterwork event on the rooftop is already prepared for you!`;
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