import { Sound } from '@workadventure/iframe-api-typings/Api/iframe/Sound/Sound';


export class EasterreggSound {
  static instance: Sound|undefined;
  static file:string = './sounds/easteregg.mp3';
  static defaultConfig = {
    volume : 0.5,
    loop : false,
    rate : 1,
    detune : 1,
    delay : 0,
    seek : 0,
    mute : false
  };

  /**
   * Get the static sound instance
   */
  static getSoundInstance = () => {
    if (this.instance)
      return this.instance;

    this.instance = WA.sound.loadSound(this.file);
    return this.instance;
  };

  /**
   * Play soundfile
   */
  static play = (config: {} | undefined = {}) => {
    const soundInstance = this.getSoundInstance();
    const soundConfig = {
      ...this.defaultConfig,
      ...config,
    };

    soundInstance.play(soundConfig);
  };

  /**
   * Stop soundfile
   */
  static stop = () => {
    const soundInstance = this.getSoundInstance();
    soundInstance.stop();
  }
}