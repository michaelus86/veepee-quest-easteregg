import { TicTacToe } from './triggers/tic-tac-toe';


/**
 * Init class for barcelone-rooftop
 *
 * @since 2022-04-25
 * @author michael.richter
 */
export class BarceloneRooftop
{
    static mapIsLoaded = (): boolean => (WA.room.id.search('barcelone-rooftop.json') > -1);

    constructor()
    {
        new TicTacToe();
    }
}