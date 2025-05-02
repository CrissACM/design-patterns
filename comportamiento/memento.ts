/**
 * !Patrón Memento
 * Permite capturar y externalizar un estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando se necesita guardar el estado de un objeto para poder
 * * volver a él en un futuro.
 *
 * https://refactoring.guru/es/design-patterns/memento
 */

class GameMemento {
  constructor(
    private level: number,
    private health: number,
    private position: string,
  ) {}

  getLevel() {
    return this.level;
  }

  getHealth() {
    return this.health;
  }

  getPosition() {
    return this.position;
  }
}

class Game {
  constructor(
    private level: number,
    private health: number,
    private position: string,
  ) {
    console.log(`
      Jugando en el nivel ${this.level}
        de salud: ${this.health}
        y en la posición: ${this.position}
      `);
  }

  save(): GameMemento {
    return new GameMemento(this.level, this.health, this.position);
  }

  play(level: number, health: number, position: string): void {
    this.level = level;
    this.health = health;
    this.position = position;

    console.log(`
      Jugando en el nivel ${this.level}
        de salud: ${this.health}
        y en la posición: ${this.position}
      `);
  }

  restore(memento: GameMemento): void {
    this.level = memento.getLevel();
    this.health = memento.getHealth();
    this.position = memento.getPosition();

    console.log(
      `\nProgreso restaurado
        Jugando en el nivel ${this.level}
        de salud: ${this.health}
        y en la posición: ${this.position}
      `,
    );
  }
}

class GameHistory {
  constructor(private mementos: GameMemento[] = []) {}

  push(memento: GameMemento): void {
    this.mementos.push(memento);
  }

  pop(): GameMemento | null {
    return this.mementos.pop() ?? null;
  }
}

function main() {
  const game = new Game(1, 100, 'inicio');
  const history = new GameHistory();

  history.push(game.save());

  game.play(2, 80, 'Bosque encantado');
  history.push(game.save());

  game.play(3, 50, 'Cueva oscura');
  history.push(game.save());

  game.play(4, 50, 'Ciudad perdida');
  console.log('Estado actual');

  game.restore(history.pop()!);
  console.log('Estado restaurado');
}

main();

//TODO
class DrawingMemento {
  private shapes: string[];

  constructor(shapes: string[]) {
    this.shapes = [...shapes];
  }

  getShapes(): string[] {
    return [...this.shapes];
  }
}

class DrawingBoard {
  private shapes: string[] = [];

  addShape(shape: string): void {
    this.shapes.push(shape);
    console.log(`Figura agregada: ${shape}`);
  }

  showBoard(): void {
    console.log('Pizarra actual:', this.shapes.join(', ') || 'Vacía');
  }

  save(): DrawingMemento {
    return new DrawingMemento(this.shapes);
  }

  restore(memento: DrawingMemento): void {
    this.shapes = memento.getShapes();
    console.log('\nEstado de la pizarra restaurado.');
  }
}

class History {
  private mementos: DrawingMemento[] = [];

  push(memento: DrawingMemento): void {
    this.mementos.push(memento);
  }

  pop(): DrawingMemento | undefined {
    return this.mementos.pop();
  }
}

function main2(): void {
  const drawingBoard = new DrawingBoard();
  const history = new History();

  drawingBoard.addShape('Círculo');
  history.push(drawingBoard.save());

  drawingBoard.addShape('Cuadrado');
  history.push(drawingBoard.save());

  drawingBoard.addShape('Triángulo');
  drawingBoard.showBoard();

  drawingBoard.restore(history.pop()!);
  drawingBoard.showBoard();

  drawingBoard.restore(history.pop()!);
  drawingBoard.showBoard();
}

main2();
