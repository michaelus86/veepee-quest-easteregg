import { Popup } from '@workadventure/iframe-api-typings/Api/iframe/Ui/Popup';
import { ButtonDescriptor } from '@workadventure/iframe-api-typings/Api/iframe/Ui/ButtonDescriptor';


/**
 * Trigger class to destroy construction area
 *
 * @since 2022-04-25
 * @author michael.richter
 */
export class DestroyContructionAreaTrigger {
  triggerIdAxe: string = 'trigger/destroyConstructionAreaAxeTrigger';
  triggerIdLift: string = 'trigger/destroyConstructionAreaLiftTrigger';

  triggerEnterSubscriberAxe: any;
  triggerEnterSubscriberLift: any;
  triggerLeaveSubscriberAxe: any;
  triggerLeaveSubscriberLift: any;
  
  popup: Popup|any;

  /**
   * Class constructor
   */
  constructor() {
    this.triggerEnterSubscriberAxe = WA.room.onEnterLayer(this.triggerIdAxe).subscribe(this.openPopup);
    this.triggerEnterSubscriberLift = WA.room.onEnterLayer(this.triggerIdLift).subscribe(this.deactivateConstructionArea);

    this.triggerLeaveSubscriberAxe = WA.room.onLeaveLayer(this.triggerIdAxe).subscribe(this.closePopup);
    WA.state.onVariableChange('constructionAreaIsOn').subscribe(this.destroyConstruction);
  }

  /**
   * Open popup
   */
  private openPopup = () => {
    const popupId = 'destroyConstructionAreaPopup';
    const popupMessage = 'Do you want to destroy the construction area?';
    const popupButtons = this.getPopupButtons();

    this.popup = WA.ui.openPopup(popupId, popupMessage, popupButtons);
  }

  /**
   * Return all popup buttons
   */
  private getPopupButtons = () => {
    const buttonNo: ButtonDescriptor = {
      label: 'No',
      className: 'normal',
      callback: (popup) => popup.close(),
    };

    const buttonYes: ButtonDescriptor = {
      label: 'Yes',
      className: 'warning',
      callback: (popup) => {
        popup.close();
        this.deactivateConstructionArea();
      }
    };

    return [
      buttonNo,
      buttonYes,
    ];
  }

  /**
   * Close popup
   */
  private closePopup = () => {
    this.popup.close();
  }

  /**
   * Deactivate construction area
   */
  private deactivateConstructionArea = () => {
    WA.state.saveVariable('constructionAreaIsOn', false);
    this.destroyConstruction(false);
  }

  /**
   * Destroy the construction
   */
  private destroyConstruction = (constructionAreaIsOn: boolean) => {
    if (constructionAreaIsOn)
      return;

    this.triggerEnterSubscriberAxe.unsubscribe();
    this.triggerEnterSubscriberLift.unsubscribe();

    WA.room.hideLayer('constructionAreaImage');
    WA.room.hideLayer('destroyConstructionAreaImage');
    WA.room.setTiles([
      {x: 13, y: 12, tile: null, layer: 'collisions'},
      {x: 13, y: 13, tile: null, layer: 'collisions'},
    ]);
  }
}