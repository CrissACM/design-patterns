/**
 * ! Patrón Strategy
 *
 * El patrón Strategy es un patrón de diseño de software que define una
 * familia de algoritmos, los encapsula y los hace intercambiables.
 *
 *
 * * Es útil cuando se tiene una clase que tiene un comportamiento que puede
 * * cambiar en tiempo de ejecución y se quiere delegar la responsabilidad de
 * * la implementación a otra clase.
 *
 * https://refactoring.guru/es/design-patterns/strategy
 */

/**
 * !Objetivo: Explicar el patrón Strategy usando un ejemplo donde varios
 * ! patitos compiten en una carrera y cada uno tiene su propia
 * ! estrategia de movimiento (por ejemplo, nadar, volar o caminar).
 */

interface MovementStrategy {
  move(): void;
}

class SwimFast implements MovementStrategy {
  move(): void {
    console.log('El pato está nadando rápido\n');
  }
}

class FlyOverWater implements MovementStrategy {
  move(): void {
    console.log('El pato está volando sobre el agua\n');
  }
}

class WalkClumsily implements MovementStrategy {
  move(): void {
    console.log('El pato está caminando cariñosamente\n');
  }
}

class Duck {
  constructor(
    private name: string,
    private movementStrategy: MovementStrategy,
  ) {
    console.log(`${name} listo para competir`);
  }

  performMove() {
    console.log(`${this.name} se prepara para moverse...`);
    this.movementStrategy.move();
  }

  setMovementStrategy(movementStrategy: MovementStrategy) {
    this.movementStrategy = movementStrategy;
    console.log(`${this.name} cambio de estrategia`);
  }
}

function main() {
  const pato1 = new Duck('Pato rápido', new SwimFast());
  const pato2 = new Duck('Pato volador', new FlyOverWater());
  const pato3 = new Duck('Pato torpe', new WalkClumsily());

  pato1.performMove();
  pato2.performMove();
  pato3.performMove();

  pato1.setMovementStrategy(new WalkClumsily());
  pato1.performMove();
}

main();

//TODO
interface TaxStrategy {
  calculateTax(amount: number): number;
}

class USATaxStrategy implements TaxStrategy {
  calculateTax(amount: number): number {
    return (amount *= 0.1);
  }
}

class CanadaTaxStrategy implements TaxStrategy {
  calculateTax(amount: number): number {
    return (amount *= 0.13);
  }
}

class GermanyTaxStrategy implements TaxStrategy {
  calculateTax(amount: number): number {
    return (amount *= 0.19);
  }
}

class TaxCalculator {
  constructor(private strategy: TaxStrategy) {}

  setStrategy(strategy: TaxStrategy): void {
    this.strategy = strategy;
  }

  calculate(amount: number): number {
    return this.strategy.calculateTax(amount);
  }
}

function main2(): void {
  const taxCalculator = new TaxCalculator(new USATaxStrategy());

  console.log('Cálculo de impuestos:\n');
  console.log('USA: $', taxCalculator.calculate(100).toFixed(2));

  console.log('\nCambiando a estrategia para Canada...');
  taxCalculator.setStrategy(new CanadaTaxStrategy());
  console.log('Canada: $', taxCalculator.calculate(100).toFixed(2));

  console.log('\nCambiando a estrategia para Germany...');
  taxCalculator.setStrategy(new GermanyTaxStrategy());
  console.log('Germany: $', taxCalculator.calculate(100).toFixed(2));
}

main2();
