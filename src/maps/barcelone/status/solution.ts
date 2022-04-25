/**
 * Class for the solution of eastercode
 *
 * @since 2022-04-25
 * @author michael.richter
 */
export class SolutionStatus {
  private solution: string[];

  /**
   * Class constructor
   */
  constructor() {
    this.solution = [
      '_',
      '_',
      '_',
      '_',
      '_',
      '_',
    ];
  }

  public getSolutionNumbers = () => this.solution;

  public foundFlipchart = () => this.solution[0] = '0';
  public foundApplebox = () => this.solution[1] = '9';
  public foundScissors = () => this.solution[2] = '0';
  public foundComputer = () => this.solution[3] = '3';
  public foundLamp = () => this.solution[4] = '6';
  public foundPlant = () => this.solution[5] = '2';

  /**
   * Solve all eastereggs
   */
  public solveAll = () => {
    this.foundFlipchart();
    this.foundApplebox();
    this.foundScissors();
    this.foundComputer();
    this.foundLamp();
    this.foundPlant();
  }
}