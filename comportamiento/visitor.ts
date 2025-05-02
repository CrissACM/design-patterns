/**
 * !Patrón Visitor
 *
 * El patrón Visitor es un patrón de diseño de comportamiento
 * que te permite separar algoritmos de los objetos sobre
 * los que operan.
 *
 * * Es útil cuando necesitas añadir nuevas operaciones a
 * * clases estables sin cambiar su código.
 *
 * https://refactoring.guru/es/design-patterns/visitor
 */

/**
 * Contexto: Imagina que estás diseñando un sistema para un parque
 * temático con diferentes tipos de atracciones:
 * montañas rusas, casas del terror y ruedas de la fortuna.
 *
 * Cada atracción tiene su propio precio de entrada y ofrece un descuento
 * dependiendo del tipo de visitante (niño, adulto o adulto mayor).
 *
 * Aquí es donde entra el patrón Visitor, que permite aplicar operaciones
 * específicas (como calcular el precio con descuento) dependiendo tanto
 * de la atracción como del tipo de visitante,
 * sin modificar las clases originales.
 */

interface Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void;
  visitHauntedHouse(hauntedHouse: HauntedHouse): void;
  visitFerrisWheel(ferrisWheel: FerrisWheel): void;
}

interface Attraction {
  accept(visitor: Visitor): void;
}

class RollerCoaster implements Attraction {
  private price: number = 50;

  accept(visitor: Visitor): void {
    visitor.visitRollerCoaster(this);
  }

  getPrice(): number {
    return this.price;
  }
}

class HauntedHouse implements Attraction {
  private price: number = 40;

  accept(visitor: Visitor): void {
    visitor.visitHauntedHouse(this);
  }

  getPrice(): number {
    return this.price;
  }
}

class FerrisWheel implements Attraction {
  private price: number = 30;

  accept(visitor: Visitor): void {
    visitor.visitFerrisWheel(this);
  }

  getPrice(): number {
    return this.price;
  }
}

class ChildVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `Niño en montaña Rusa: Precio del descuento de $${
        rollerCoaster.getPrice() * 0.5
      }`,
    );
  }

  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      `Niño en casa de terror: Precio del descuento de $${
        hauntedHouse.getPrice() * 0.7
      }`,
    );
  }

  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(
      `Niño en rueda de la fortuna: Precio del descuento de $${
        ferrisWheel.getPrice() * 0.6
      }`,
    );
  }
}

class AdultVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `Adulto en montaña Rusa: Precio del descuento de $${rollerCoaster.getPrice()}`,
    );
  }

  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      `Adulto en casa de terror: Precio del descuento de $${hauntedHouse.getPrice()}`,
    );
  }

  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(
      `Adulto en rueda de la fortuna: Precio del descuento de $${ferrisWheel.getPrice()}`,
    );
  }
}

class SeniorVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `Snior en montaña Rusa: Precio del descuento de $${
        rollerCoaster.getPrice() * 0.85
      }`,
    );
  }

  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      `Snior en casa de terror: Precio del descuento de $${
        hauntedHouse.getPrice() * 0.85
      }`,
    );
  }

  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(
      `Senior en rueda de la fortuna: Precio del descuento de $${
        ferrisWheel.getPrice() * 0.85
      }`,
    );
  }
}

function main() {
  const attraction: Attraction[] = [
    new RollerCoaster(),
    new HauntedHouse(),
    new FerrisWheel(),
  ];

  console.log(`montaña Rusa: ${new RollerCoaster().getPrice()}`);
  console.log(`casa de terror: ${new HauntedHouse().getPrice()}`);
  console.log(`rueda de la fortuna: ${new FerrisWheel().getPrice()}`);
  console.log('\n');

  console.log('Visitante Niño');
  const childVisitor = new ChildVisitor();
  attraction.forEach((attraction) => attraction.accept(childVisitor));
  console.log('\n');

  console.log('Visitante Adulto');
  const adultVisitor = new AdultVisitor();
  attraction.forEach((attraction) => attraction.accept(adultVisitor));
  console.log('\n');

  console.log('Visitante Senior');
  const seniorVisitor = new SeniorVisitor();
  attraction.forEach((attraction) => attraction.accept(seniorVisitor));
}

main();

//TODO
interface Visitor2 {
  visitCar(car: Car): void;
  visitMotorcycle(motorcycle: Motorcycle): void;
  visitTruck(truck: Truck): void;
}

interface Vehicle {
  accept(visitor: Visitor2): void;
}

class Car implements Vehicle {
  private year: number;
  private kilometers: number;

  constructor(year: number, kilometers: number) {
    this.year = year;
    this.kilometers = kilometers;
  }

  getYear(): number {
    return this.year;
  }

  getKilometers(): number {
    return this.kilometers;
  }

  accept(visitor: Visitor2): void {
    visitor.visitCar(this);
  }
}

class Motorcycle implements Vehicle {
  private year: number;
  private kilometers: number;

  constructor(year: number, kilometers: number) {
    this.year = year;
    this.kilometers = kilometers;
  }

  getYear(): number {
    return this.year;
  }

  getKilometers(): number {
    return this.kilometers;
  }

  accept(visitor: Visitor2): void {
    visitor.visitMotorcycle(this);
  }
}

class Truck implements Vehicle {
  private year: number;
  private kilometers: number;
  private loadCapacity: number;

  constructor(year: number, kilometers: number, loadCapacity: number) {
    this.year = year;
    this.kilometers = kilometers;
    this.loadCapacity = loadCapacity;
  }

  getYear(): number {
    return this.year;
  }

  getKilometers(): number {
    return this.kilometers;
  }

  getLoadCapacity(): number {
    return this.loadCapacity;
  }

  accept(visitor: Visitor2): void {
    visitor.visitTruck(this);
  }
}

class MaintenanceCostVisitor implements Visitor2 {
  visitCar(car: Car): void {
    const cost = car.getKilometers() * 0.1 + (2024 - car.getYear()) * 50;

    console.log(
      `Costo de mantenimiento para el automóvil: $${cost.toFixed(2)}`,
    );
  }

  visitMotorcycle(motorcycle: Motorcycle): void {
    const cost =
      motorcycle.getKilometers() * 0.05 + (2024 - motorcycle.getYear()) * 30;

    console.log(
      `Costo de mantenimiento para la motocicleta: $${cost.toFixed(2)}`,
    );
  }

  visitTruck(truck: Truck): void {
    const cost =
      truck.getKilometers() * 0.15 +
      truck.getLoadCapacity() * 20 +
      (2024 - truck.getYear()) * 100;

    console.log(`Costo de mantenimiento para el camión: $${cost.toFixed(2)}`);
  }
}

class EmissionCheckVisitor implements Visitor2 {
  visitCar(car: Car): void {
    const passes = car.getYear() > 2000 && car.getKilometers() < 200_000;

    console.log(`Automóvil cumple con emisiones: ${passes ? 'Sí' : 'No'}`);
  }

  visitMotorcycle(motorcycle: Motorcycle): void {
    const passes =
      motorcycle.getYear() > 2005 && motorcycle.getKilometers() < 100_000;

    console.log(`Motocicleta cumple con emisiones: ${passes ? 'Sí' : 'No'}`);
  }

  visitTruck(truck: Truck): void {
    const passes = truck.getYear() > 2010 && truck.getKilometers() < 300_000;

    console.log(`Camión cumple con emisiones: ${passes ? 'Sí' : 'No'}`);
  }
}

function main2(): void {
  const vehicles: Vehicle[] = [
    new Car(2018, 50_000),
    new Motorcycle(2015, 30_000),
    new Truck(2012, 250_000, 20),
  ];

  console.log('\nCalculando costos de mantenimiento:');
  const maintenanceVisitor = new MaintenanceCostVisitor();
  vehicles.forEach((vehicle) => vehicle.accept(maintenanceVisitor));

  console.log('\nVerificando emisiones:');
  const emissionVisitor = new EmissionCheckVisitor();
  vehicles.forEach((vehicle) => vehicle.accept(emissionVisitor));
}

main2();
