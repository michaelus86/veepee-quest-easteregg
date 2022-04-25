import { DestroyContructionAreaTrigger } from './triggers/destroy-construction-area';
import { ReadmeEastercodeTrigger } from './triggers/readme-eastercode';
import { SolutionStatus } from './status/solution';
import { SolutionEastercodeTrigger } from './triggers/solution-eastercode';
import { EastereggFlipchartTrigger } from './triggers/easteregg-flipchart';
import { EastereggAppleboxTrigger } from './triggers/easteregg-applebox';
import { SurrenderEastercodeTrigger } from './triggers/surrender-eastercode';
import { EastereggScissorsTrigger } from './triggers/easteregg-scissors';
import { EastereggComputerTrigger } from './triggers/easteregg-computer';
import { EastereggLampTrigger } from './triggers/easteregg-lamp';
import { EastereggPlantTrigger } from './triggers/easteregg-plant';


/**
 * Init class for barcelone
 *
 * @since 2022-04-25
 * @author michael.richter
 */
export class Barcelone
{
    static mapIsLoaded = (): boolean => (WA.room.id.search('barcelone.json') > -1);

    constructor()
    {
        const solutionStatus = new SolutionStatus();

        new DestroyContructionAreaTrigger();
        new ReadmeEastercodeTrigger();
        new SurrenderEastercodeTrigger(solutionStatus);
        new SolutionEastercodeTrigger(solutionStatus);

        new EastereggFlipchartTrigger(solutionStatus);
        new EastereggAppleboxTrigger(solutionStatus);
        new EastereggScissorsTrigger(solutionStatus);
        new EastereggComputerTrigger(solutionStatus);
        new EastereggLampTrigger(solutionStatus);
        new EastereggPlantTrigger(solutionStatus);
    }
}