import { Popup } from '@workadventure/iframe-api-typings/Api/iframe/Ui/Popup';
import { ButtonDescriptor } from '@workadventure/iframe-api-typings/Api/iframe/Ui/ButtonDescriptor';
import { SolutionStatus } from '../status/solution';
import { EasterreggSound } from '../sounds/easteregg';


/**
 * Trigger class for easteregg plant
 *
 * @since 2022-04-25
 * @author michael.richter
 */
export class EastereggPlantTrigger {
  triggerIdPlant: string = 'trigger/eastereggPlantTrigger';
  triggerIdWater: string = 'trigger/eastereggWaterTrigger';

  triggerEnterSubscriberPlant: any;
  triggerEnterSubscriberWater: any;
  triggerLeaveSubscriberPlant: any;
  triggerLeaveSubscriberWater: any;

  popupWater: Popup|any;
  popupPlant: Popup|any;

  solutionStatus: SolutionStatus;

  hasWater: boolean = false;

  /**
   * Class constructor
   */
  constructor(solutionStatus: SolutionStatus) {
    this.solutionStatus = solutionStatus;

    this.triggerEnterSubscriberWater = WA.room.onEnterLayer(this.triggerIdWater).subscribe(this.openPopupWater);
    this.triggerLeaveSubscriberWater = WA.room.onLeaveLayer(this.triggerIdWater).subscribe(this.closeAllPopups);

    this.triggerEnterSubscriberPlant = WA.room.onEnterLayer(this.triggerIdPlant).subscribe(this.openPopupPlant);
    this.triggerLeaveSubscriberPlant = WA.room.onLeaveLayer(this.triggerIdPlant).subscribe(this.closeAllPopups);
  }

  /**
   * Open popup water
   */
  private openPopupWater = () => {
    const popupId = 'eastereggWaterPopup';
    const popupMessage = 'I\'ve fetched some water. But what can I do with it?';
    const popupButtons = this.getPopupButtons();

    this.popupWater = WA.ui.openPopup(popupId, popupMessage, popupButtons);
    this.hasWater = true;
  }

  /**
   * Open popup plant
   */
  private openPopupPlant = () => {
    const popupId = 'eastereggPlantPopup';
    const popupMessage = 'Congratulations!\nYou\'ve found the easteregg to water the plant.';
    const popupButtons = this.getPopupButtons();

    if (!this.hasWater)
      return;

    this.popupPlant = WA.ui.openPopup(popupId, popupMessage, popupButtons);

    this.triggerEnterSubscriberWater.unsubscribe();
    this.triggerEnterSubscriberPlant.unsubscribe();
    this.solutionStatus.foundPlant();
    WA.room.hideLayer('dry-plant');

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
   * Close all popups
   */
  private closeAllPopups = () => {
    if (this.popupWater)
      this.popupWater.close();

    if (this.popupPlant)
      this.popupPlant.close();
  }
}