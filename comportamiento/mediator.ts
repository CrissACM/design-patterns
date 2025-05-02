/**
 * ! Patrón mediator
 * Es un patrón de diseño de comportamiento que ayuda a reducir
 * las dependencias desordenadas entre objetos.
 * Este patrón limita la comunicación directa entre ellos,
 * haciendo que solo interactúen a través de un objeto mediador.
 *
 * * Es útil reducir la complejidad de las relaciones entre objetos
 *
 * https://refactoring.guru/es/design-patterns/mediator
 */

class ChatRoom {
  constructor(public title: string, private users: User[] = []) {}

  addUser(user: User) {
    this.users.push(user);
  }

  sendMessage(sender: User, messsage: string): void {
    const usersToSend = this.users.filter((user) => user !== sender);

    for (const user of usersToSend) {
      user.receiveMessage(sender, messsage);
    }
  }
}

class User {
  constructor(private username: string, private chatRoom: ChatRoom) {
    chatRoom.addUser(this);
  }

  sendMessage(message: string): void {
    console.log(`\n${this.username} envía: ${message}`);
    this.chatRoom.sendMessage(this, message);
  }

  receiveMessage(sender: User, messsage: string): void {
    console.log(`\n${this.username} recibe de ${sender.username}: ${messsage}`);
  }
}

function main() {
  const chatRoom = new ChatRoom('Grupo de trabajo');

  const user1 = new User('Alice', chatRoom);
  const user2 = new User('Bob', chatRoom);
  const user3 = new User('Charlie', chatRoom);

  user1.sendMessage('Hola a todos!');
  user2.sendMessage('¡Hola Alice! ¿Como estas?');
}
main();

//TODO
class ControlTower {
  private airplanes: Airplane[] = [];

  registerAirplane(airplane: Airplane) {
    this.airplanes.push(airplane);
  }

  sendMessage(sender: Airplane, message: string): void {
    const airplanesToSend = this.airplanes.filter(
      (airplane) => airplane !== sender,
    );

    for (const airplane of airplanesToSend) {
      airplane.receiveMessage(sender, message);
    }
  }

  requestLanding(sender: Airplane): void {
    console.log(
      `\nTorre de Control: Permiso de aterrizaje concedido a ${sender.getId()}`,
    );

    this.sendMessage(sender, `${sender.getId()} está aterrizando.`);
  }

  requestTakeoff(sender: Airplane): void {
    console.log(
      `\nTorre de Control: Permiso de despegue concedido a ${sender.getId()}`,
    );

    this.sendMessage(sender, `${sender.getId()} está despegando.`);
  }
}

class Airplane {
  private id: string;
  private controlTower: ControlTower;

  constructor(id: string, controlTower: ControlTower) {
    this.id = id;
    this.controlTower = controlTower;

    this.controlTower.registerAirplane(this);
  }

  getId(): string {
    return this.id;
  }

  requestLanding(): void {
    console.log(`${this.id} solicita permiso para aterrizar.`);
    this.controlTower.requestLanding(this);
  }

  requestTakeoff(): void {
    console.log(`${this.id} solicita permiso para despegar.`);
    this.controlTower.requestTakeoff(this);
  }

  receiveMessage(sender: Airplane, message: string): void {
    console.log(`${this.id} recibe mensaje de ${sender.getId()}: "${message}"`);
  }
}

function main2(): void {
  const controlTower = new ControlTower();

  const airplane1 = new Airplane('Vuelo 101', controlTower);
  const airplane2 = new Airplane('Vuelo 202', controlTower);
  const airplane3 = new Airplane('Vuelo 303', controlTower);

  airplane1.requestLanding();
  airplane2.requestTakeoff();
  airplane3.requestLanding();
}

main2();
