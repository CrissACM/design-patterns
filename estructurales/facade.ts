/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */

class Projector {
  on() {
    console.log('Projector encendido');
  }

  turnOff() {
    console.log('Projector apagado');
  }
}

class SoundSystem {
  on() {
    console.log('Sistema de sonido encendido');
  }

  off() {
    console.log('Sistema de sonido apagado');
  }
}

class VideoPlayer {
  on() {
    console.log('Reproductor de video encendido');
  }

  play(movie: string) {
    console.log(`Reproduciendo ${movie}`);
  }

  stop() {
    console.log('Video detenido');
  }

  off() {
    console.log('Reproductor de video apagado');
  }
}

class PopcornMaker {
  turnOffPoppingPopCorn() {
    console.log('Palomera apagada');
  }

  poppingPopcorn() {
    console.log('Haciendo palomitas...');
  }
}

interface HomeTheaterFacadeOptions {
  projector: Projector;
  soundSystem: SoundSystem;
  videoPlayer: VideoPlayer;
  popcornMaker: PopcornMaker;
}

class HomeTheaterFacade {
  private projector: Projector;
  private soundSystem: SoundSystem;
  private videoPlayer: VideoPlayer;
  private popcornMaker: PopcornMaker;

  constructor({
    projector,
    soundSystem,
    videoPlayer,
    popcornMaker,
  }: HomeTheaterFacadeOptions) {
    this.projector = projector;
    this.soundSystem = soundSystem;
    this.videoPlayer = videoPlayer;
    this.popcornMaker = popcornMaker;
  }

  watchMovie(movie: string) {
    console.log('Preparando para ver una película...');
    this.projector.on();
    this.soundSystem.on();
    this.popcornMaker.poppingPopcorn();
    this.videoPlayer.on();
    this.videoPlayer.play(movie);

    console.log('Disfrute de la película!');
  }

  endMovie() {
    console.log('Apagando el sistema...');
    this.projector.turnOff();
    this.soundSystem.off();
    this.popcornMaker.turnOffPoppingPopCorn();
    this.videoPlayer.stop();
    this.videoPlayer.off();

    console.log('Sistema apagado');
  }
}

function main() {
  const projector = new Projector();
  const soundSystem = new SoundSystem();
  const videoPlayer = new VideoPlayer();
  const popcornMaker = new PopcornMaker();

  const homeTheater = new HomeTheaterFacade({
    projector,
    soundSystem,
    videoPlayer,
    popcornMaker,
  });

  homeTheater.watchMovie('El Señor de los Anillos');
  console.log('\n');
  homeTheater.endMovie();
}

main();

//TODO
class CPU {
  stopOperations(): void {
    console.log('CPU: Deteniendo operaciones.');
  }

  jump(position: number): void {
    console.log(`CPU: Saltando a la posición de memoria ${position}.`);
  }

  execute(): void {
    console.log('CPU: Ejecutando instrucciones.');
  }
}

class HardDrive {
  read(position: number, size: number): string {
    console.log(
      `HardDrive: Leyendo ${size} bytes desde la posición ${position}.`,
    );
    return '001010001010100';
  }

  close() {
    console.log('HardDrive: Deteniendo disco duro.');
  }
}

class Memory {
  load(position: number, data: string): void {
    console.log(`Memory: Cargando datos en la posición ${position} ${data}.`);
  }

  free(): void {
    console.log('Memory: Liberando memoria.');
  }
}

class ComputerFacade {
  constructor(
    private cpu: CPU = new CPU(),
    private memory: Memory = new Memory(),
    private hardDrive: HardDrive = new HardDrive(),
  ) {}

  startComputer(): void {
    console.log('\nIniciando la computadora...');
    this.memory.load(0, this.hardDrive.read(0, 1024));
    this.cpu.jump(0);
    this.cpu.execute();

    console.log('Computadora lista para usar.\n');
  }

  shutDownComputer(): void {
    console.log('\nApagando la computadora...');
    console.log('Cerrando procesos y guardando datos...');
    this.cpu.stopOperations();
    this.memory.free();
    this.hardDrive.close();

    console.log('Computadora apagada.\n');
  }
}

function main2() {
  const computer = new ComputerFacade();

  // Encender la computadora usando la fachada
  computer.startComputer();

  // Apagar la computadora usando la fachada
  computer.shutDownComputer();
}

main2();
