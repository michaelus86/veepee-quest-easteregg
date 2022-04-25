import { Popup } from '@workadventure/iframe-api-typings/Api/iframe/Ui/Popup';
import { ButtonDescriptor } from '@workadventure/iframe-api-typings/Api/iframe/Ui/ButtonDescriptor';
import { SolutionStatus } from '../status/solution';
import { EasterreggSound } from '../sounds/easteregg';


/**
 * Trigger class for easteregg flipchart
 *
 * @since 2022-04-25
 * @author michael.richter
 */
export class EastereggFlipchartTrigger {
  triggerId: string = 'trigger/eastereggFlipchartTrigger';
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
    const popupId = 'eastereggFlipchartPopup';
    const popupMessage = 'Congratulations!\nYou\'ve found an easteregg behind the flipchart. Awesome!';
    const popupButtons = this.getPopupButtons();

    this.popup = WA.ui.openPopup(popupId, popupMessage, popupButtons);

    this.triggerEnterSubscriber.unsubscribe();
    this.solutionStatus.foundFlipchart();

    EasterreggSound.play();
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