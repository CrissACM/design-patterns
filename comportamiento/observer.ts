/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */

interface Observer {
  notify(videoTitle: string): void;
}

class YouTubeChannel {
  constructor(private subscribers: Observer[] = [], private name: string) {}

  subscribe(observer: Observer): void {
    this.subscribers.push(observer);
    console.log(`Nuevo subscritor al canal ${this.name}`);
  }

  unsubscribe(observer: Observer): void {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber !== observer,
    );
    console.log(`Subscritor eliminado del canal ${this.name}`);
  }

  uploadVideo(videoTitle: string): void {
    console.log(`Nuevo video subido: ${videoTitle} del canal ${this.name}`);

    for (const subscriber of this.subscribers) {
      subscriber.notify(videoTitle);
    }
  }
}

class Subscriber implements Observer {
  constructor(private name: string) {}

  notify(videoTitle: string): void {
    console.log(`${this.name} ha recibido un nuevo video: ${videoTitle}`);
  }
}

function main() {
  const channel = new YouTubeChannel([], 'Cocinando con fernando');

  const ana = new Subscriber('Ana');
  const luis = new Subscriber('Luis');
  const marta = new Subscriber('Marta');

  channel.subscribe(ana);
  channel.subscribe(luis);
  channel.subscribe(marta);

  channel.uploadVideo('Receta de paella valenciana');
  channel.unsubscribe(luis);
  channel.uploadVideo('Como hacer un buen gazpacho');
}

main();

//TODO
interface Observer2 {
  update(weatherData: string): void;
}

class WeatherStation {
  constructor(
    private observers: Observer2[] = [],
    private weatherData: string,
  ) {}

  subscribe(observer: Observer2): void {
    this.observers.push(observer);

    console.log('Nueva aplicación suscrita al sistema meteorológico.');
  }

  unsubscribe(observer: Observer2): void {
    this.observers = this.observers.filter((obs) => obs !== observer);

    console.log(`Una aplicación se ha dado de baja`);
  }

  setWeather(weatherData: string): void {
    console.log(`\nClima actualizado: ${weatherData}`);

    this.weatherData = weatherData;
    this.notifyObservers();
  }

  private notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this.weatherData);
    }
  }
}

class WeatherApp implements Observer2 {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  update(weatherData: string): void {
    console.log(
      `${this.name} ha recibido notificación del clima: ${weatherData}`,
    );
  }
}

function main2(): void {
  const weatherStation = new WeatherStation([], 'Soleado');

  const flutterWeatherApp = new WeatherApp('Flutter WeatherApp');
  const reactNativeWeatherApp = new WeatherApp('React Native WeatherApp');
  const weatherTrackerApp = new WeatherApp('Weather Tracker App');

  weatherStation.subscribe(flutterWeatherApp);
  weatherStation.subscribe(reactNativeWeatherApp);

  weatherStation.setWeather('Lluvioso');

  weatherStation.subscribe(weatherTrackerApp);
  weatherStation.setWeather('Nublado');

  weatherStation.unsubscribe(reactNativeWeatherApp);
  weatherStation.setWeather('Tormenta eléctrica');
}

main2();
