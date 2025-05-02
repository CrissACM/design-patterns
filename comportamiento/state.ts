/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 *
 * https://refactoring.guru/es/design-patterns/state
 */

/**
 * * Objetivo: Implementar el patrón State para simular el funcionamiento
 * * de una máquina expendedora.
 * * La máquina tiene diferentes estados,
 *  * Como Esperando Dinero,
 *  * Seleccionando Producto,
 *  * Entregando Producto,
 * * y su comportamiento varía dependiendo del estado actual.
 */

import { sleep } from '../helpers/sleep.ts';

interface State {
  name: string;

  insertMoney(): void;
  selectProduct(): void;
  dispenseProduct(): void;
}

class VendingMachine {
  private state: State;

  constructor() {
    this.state = new WaitingForMoney(this);
  }

  insertMoney() {
    this.state.insertMoney();
  }

  selectProduct() {
    this.state.selectProduct();
  }

  dispenseProduct() {
    this.state.dispenseProduct();
  }

  setState(newState: State) {
    this.state = newState;
    console.log(`Estado cambió a: ${newState.name}`);
  }

  getStateName(): string {
    return this.state.name;
  }
}

class WaitingForMoney implements State {
  public name: string = 'Esperando Dinero';
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log('Dinero insertado: Ahora puedes seleccionar un producto');

    this.vendingMachine.setState(new ProductSelected(this.vendingMachine));
  }

  selectProduct(): void {
    console.log('Primero debes de insertar dinero.');
  }

  dispenseProduct(): void {
    console.log('Primero debes de insertar dinero.');
  }
}

class ProductSelected implements State {
  public name: string = 'Seleccionando Producto';
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log('Por favor selecciona un producto - dinero ya insertado');
  }

  selectProduct(): void {
    this.vendingMachine.setState(new DispensingProduct(this.vendingMachine));
  }

  dispenseProduct(): void {
    console.log('Por favor selecciona un producto - antes de despacharlo');
  }
}

class DispensingProduct implements State {
  public name: string = 'Despachando producto';
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log('Por favor espera a que se entregue el producto');
  }

  selectProduct(): void {
    console.log('Producto ya seleccionado y despachando');
  }

  dispenseProduct(): void {
    console.log('Producto despachado, Cambiando estado a EsperandoDinero');

    this.vendingMachine.setState(new WaitingForMoney(this.vendingMachine));
  }
}

async function main() {
  const vendingMachine = new VendingMachine();

  let selectedOption: string | null = '4';

  do {
    console.clear();
    console.log(`Selecciona una opción: ${vendingMachine.getStateName()}`);

    selectedOption = prompt(
      `
        1. Insertar dinero
        2. Seleccionar producto
        3. Dispensar producto
        4. Salir

        opción: `,
    );

    switch (selectedOption) {
      case '1':
        vendingMachine.insertMoney();
        break;
      case '2':
        vendingMachine.selectProduct();
        break;
      case '3':
        vendingMachine.dispenseProduct();
        break;
      case '4':
        console.log('Saliendo de sistema');
        break;
      default:
        console.log('Opción no válida');
    }

    await sleep(3000);
  } while (selectedOption !== '4');
}

// main();

//TODO
interface State2 {
  name: string;

  open(): void;
  close(): void;
}

class AutomaticDoor {
  private state: State2;

  constructor() {
    this.state = new Closed(this);
  }

  setState(state: State2): void {
    this.state = state;
    console.log(`Estado cambiado a: ${state.name}`);
  }

  open(): void {
    this.state.open();
  }

  close(): void {
    this.state.close();
  }

  getStateName(): string {
    return this.state.name;
  }
}

class Closed implements State2 {
  private door: AutomaticDoor;
  public name: string;

  constructor(door: AutomaticDoor) {
    this.door = door;
    this.name = 'Cerrada';
  }

  open(): void {
    console.log('Abriendo la puerta...');
    this.door.setState(new Opening(this.door));
  }

  close(): void {
    console.log('La puerta ya está cerrada.');
  }
}

class Opening implements State2 {
  public name: string;
  private door: AutomaticDoor;

  constructor(door: AutomaticDoor) {
    this.door = door;
    this.name = 'Abriendo...';

    this.afterOpen();
  }

  private async afterOpen() {
    await sleep(3000);

    console.log('La puerta se ha abierto.');
    this.door.setState(new Open(this.door));
  }

  open(): void {
    console.log('La puerta ya se está abriendo.');
  }

  close(): void {
    console.log('La puerta no puede cerrarse mientras se abre.');
  }
}

class Open implements State2 {
  private door: AutomaticDoor;
  public name: string;

  constructor(door: AutomaticDoor) {
    this.name = 'Abierta';
    this.door = door;
  }

  open(): void {
    console.log('La puerta ya está abierta.');
  }

  close(): void {
    console.log('Cerrando la puerta...');
    this.door.setState(new Closing(this.door));
  }
}

class Closing implements State2 {
  private door: AutomaticDoor;
  public name: string;

  constructor(door: AutomaticDoor) {
    this.door = door;
    this.name = 'Cerrándose';

    this.afterClosed();
  }

  private async afterClosed() {
    await sleep(3000);

    console.log('La puerta se ha cerrado.');
    this.door.setState(new Closed(this.door));
  }

  open(): void {
    console.log('Detectando movimiento. Abriendo la puerta nuevamente...');
    this.door.setState(new Opening(this.door));
  }

  close(): void {
    console.log('La puerta se ha cerrado.');
    this.door.setState(new Closed(this.door));
  }
}

async function main2() {
  const door = new AutomaticDoor();

  let selectedOption: string | null = '3';

  do {
    console.clear();
    console.log(`Estado actual: ${door.getStateName()}`);
    selectedOption = prompt(`
      1. Abrir puerta
      2. Cerrar puerta
      3. Salir

      Selecciona una opción:
    `);

    switch (selectedOption) {
      case '1':
        door.open();
        break;
      case '2':
        door.close();
        break;
      case '3':
        console.log('Saliendo del simulador...');
        break;
      default:
        console.log('Opción no válida.');
        break;
    }

    await sleep(2000);
  } while (selectedOption !== '3');
}

main2();
