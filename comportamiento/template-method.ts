/**
 * ! Patrón Template Method
 *
 * El patrón Template Method es un patrón de diseño de comportamiento
 * que define el esqueleto de un algoritmo en una operación,
 * delegando algunos pasos a las subclases.
 *
 * Permite que las subclases redefinan ciertos pasos de un algoritmo
 * sin cambiar su estructura.
 *
 * * Es útil cuando se tiene un algoritmo que sigue una secuencia de pasos
 * * y se quiere permitir a las subclases que redefinan algunos de esos pasos.
 *
 * https://refactoring.guru/es/design-patterns/template-method
 */

/**
 * Contexto: Vamos a implementar un sistema que permite preparar
 * diferentes bebidas calientes, como café y té.
 *
 * Aunque el proceso general para preparar ambas bebidas es similar
 * (hervir agua, añadir el ingrediente principal, servir en una taza),
 * hay pasos específicos que varían dependiendo de la bebida.
 *
 * El patrón Template Method es perfecto para este caso,
 * ya que define un esqueleto general del algoritmo en una clase base
 * y delega los detalles específicos a las subclases.
 */

abstract class HotBeverage {
  prepare(): void {
    this.boilWater();
    this.addMainIngredient();
    this.pourInCup();
    this.addCondiments();
  }

  private boilWater() {
    console.log('Hirviendo agua...');
  }

  private pourInCup(): void {
    console.log('Sirviendo en una taza...');
  }

  protected abstract addMainIngredient(): void;
  protected abstract addCondiments(): void;
}

class Coffee extends HotBeverage {
  protected override addMainIngredient(): void {
    console.log('Agregando café...');
  }

  protected override addCondiments(): void {
    console.log('Agregando leche y azúcar...');
  }
}

class Tea extends HotBeverage {
  protected override addMainIngredient(): void {
    console.log('Agregando té...');
  }

  protected override addCondiments(): void {
    console.log('Agregando miel y limón...');
  }
}

function main() {
  console.log('Preparando bebidas caliente...');

  const coffee = new Coffee();
  coffee.prepare();

  console.log('\n');

  const tea = new Tea();
  tea.prepare();
}

main();

//TODO
abstract class RoomCleaning {
  cleanRoom(): void {
    this.enterRoom();
    this.collectTrash();
    this.specificCleaning();
    this.disinfectSurfaces();
    this.exitRoom();

    console.log('Limpieza terminada.\n');
  }

  private enterRoom(): void {
    console.log('Entrando a la habitación...');
  }

  private collectTrash(): void {
    console.log('Recogiendo la basura...');
  }

  private disinfectSurfaces(): void {
    console.log('Desinfectando superficies...');
  }

  private exitRoom(): void {
    console.log('Saliendo de la habitación y marcándola como limpia.');
  }

  protected abstract specificCleaning(): void;
}

class HotelRoomCleaning extends RoomCleaning {
  protected override specificCleaning(): void {
    console.log('Haciendo las camas y reponiendo artículos de baño.');
  }
}

class ConferenceRoomCleaning extends RoomCleaning {
  protected specificCleaning(): void {
    console.log('Limpiando mesas y organizando sillas.');
  }
}

class OfficeCleaning extends RoomCleaning {
  protected specificCleaning(): void {
    console.log('Limpiando escritorios y organizando documentos.');
  }
}

function main2(): void {
  console.log('Limpieza de una habitación de hotel:');
  const hotelRoom = new HotelRoomCleaning();
  hotelRoom.cleanRoom();

  console.log('Limpieza de una sala de conferencias:');
  const conferenceRoom = new ConferenceRoomCleaning();
  conferenceRoom.cleanRoom();

  console.log('Limpieza de una oficina:');
  const office = new OfficeCleaning();
  office.cleanRoom();
}

main2();
