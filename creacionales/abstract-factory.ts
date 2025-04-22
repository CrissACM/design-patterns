/**
 * ! Abstract Factory:
 * Es un patrón de diseño que permite crear familias de objetos relacionados
 * sin especificar sus clases concretas.
 *
 * En lugar de crear objetos individuales directamente,
 * creamos fábricas que producen un conjunto de objetos relacionados.
 *
 * * Es útil cuando necesitas crear objetos que son parte de una familia
 * * y quieres asegurarte de que estos objetos se complementen entre sí.
 *
 * https://refactoring.guru/es/design-patterns/abstract-factory
 */

/**
 *  El propósito del Abstract Factory es crear familias de objetos relacionados
 *  (en este caso, hamburguesas y bebidas) sin especificar las clases concretas
 *  de cada uno de esos objetos en el código principal.
 */

interface Hamburger {
  prepare(): void;
}

interface Drink {
  pour(): void;
}

class ChickenHamburger implements Hamburger {
  prepare(): void {
    console.log('Preparando un hamburguesa de pollo');
  }
}

class BeefHamburger implements Hamburger {
  prepare(): void {
    console.log('Preparando un hamburguesa de res');
  }
}

class Water implements Drink {
  pour(): void {
    console.log('Sirviendo agua');
  }
}

class Soda implements Drink {
  pour(): void {
    console.log('Sirviendo soda');
  }
}

interface RestaurantFactory {
  createHamburger(): Hamburger;
  createDrink(): Drink;
}

class FastFoodRestaurantFactory implements RestaurantFactory {
  createHamburger(): Hamburger {
    return new BeefHamburger();
  }

  createDrink(): Drink {
    return new Soda();
  }
}

class HealthyRestaurantFactory implements RestaurantFactory {
  createHamburger(): Hamburger {
    return new ChickenHamburger();
  }

  createDrink(): Drink {
    return new Water();
  }
}

function main(factory: RestaurantFactory) {
  const hamburger = factory.createHamburger();
  const drink = factory.createDrink();

  hamburger.prepare();
  drink.pour();
}

console.log('\nPedido menu regular:');
main(new FastFoodRestaurantFactory());

console.log('\nPedido menu saludable:');
main(new HealthyRestaurantFactory());

//TODO
interface Vehicle {
  assemble(): void;
}

interface Engine {
  start(): void;
}

class ElectricCar implements Vehicle {
  assemble(): void {
    console.log('Ensamblando un auto eléctrico');
  }
}

class GasCar implements Vehicle {
  assemble(): void {
    console.log('Ensamblando un auto de combustión');
  }
}

class ElectricEngine implements Engine {
  start(): void {
    console.log('Arrancando motor eléctrico');
  }
}

class GasEngine implements Engine {
  start(): void {
    console.log('Arrancando motor de combustión');
  }
}

interface VehicleFactory {
  createVehicle(): Vehicle;
  createEngine(): Engine;
}

class ElectricVehicleFactory implements VehicleFactory {
  createVehicle(): Vehicle {
    return new ElectricCar();
  }
  createEngine(): Engine {
    return new ElectricEngine();
  }
}

class GasVehicleFactory implements VehicleFactory {
  createVehicle(): Vehicle {
    return new GasCar();
  }
  createEngine(): Engine {
    return new GasEngine();
  }
}

function main2(factory: VehicleFactory) {
  const vehicle = factory.createVehicle();
  const engine = factory.createEngine();

  vehicle.assemble();
  engine.start();
}

console.log('\nCreando vehículo eléctrico:');
main2(new ElectricVehicleFactory());

console.log('\nCreando vehículo de combustión:');
main2(new GasVehicleFactory());
