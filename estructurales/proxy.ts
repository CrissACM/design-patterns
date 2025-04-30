/**
 * ! Patrón Proxy
 * Este patrón se utiliza para controlar el acceso a un objeto, es decir,
 * se crea un objeto que actúa como intermediario entre el cliente y el objeto real.
 *
 * * Es útil cuando necesitamos controlar el acceso a un objeto,
 * * por ejemplo, para verificar si el cliente tiene permiso
 * * para acceder a ciertos métodos o propiedades.
 *
 * https://refactoring.guru/es/design-patterns/proxy
 *
 */

class Player {
  name: string;
  level: number;

  constructor(name: string, level: number) {
    this.name = name;
    this.level = level;
  }
}

interface Room {
  enter(player: Player): void;
}

class SecretRoom implements Room {
  enter(player: Player): void {
    console.log(`Player ${player.name} entered the room`);
    console.log('great boss wait for you');
  }
}

class MagicPortal implements Room {
  private secretRom: SecretRoom;

  constructor(room: SecretRoom) {
    this.secretRom = room;
  }

  enter(player: Player): void {
    if (player.level >= 10) {
      this.secretRom.enter(player);
      return;
    }

    console.log(`Player ${player.name} is not allowed to enter the room`);
  }
}

function main() {
  const portal = new MagicPortal(new SecretRoom());

  const player1 = new Player('player1', 5);
  const player2 = new Player('player2', 15);

  console.log('Player 1 try to enter the room');
  portal.enter(player1);

  console.log('Player 2 try to enter the room');
  portal.enter(player2);
}

main();

//TODO
interface Document {
  displayContent(user: User): void;
}

class ConfidentialDocument implements Document {
  private content: string;

  constructor(content: string) {
    this.content = content;
  }

  displayContent(): void {
    console.log(`Contenido del documento: \n${this.content}\n`);
  }
}

class DocumentProxy implements Document {
  private document: ConfidentialDocument;
  private mustHaveRoles: string[];

  constructor(document: ConfidentialDocument, mustHaveRoles: string[] = []) {
    this.document = document;
    this.mustHaveRoles = mustHaveRoles;
  }

  displayContent(user: User): void {
    if (this.mustHaveRoles.includes(user.getRole())) {
      this.document.displayContent();
      return;
    }

    // if (user.getRole() === 'admin') {
    // }

    console.log(
      `Acceso denegado. ${user.getName()}, no tienes permisos suficientes para ver este documento.`,
    );
  }
}

class User {
  private name: string;
  private role: 'admin' | 'user';

  constructor(name: string, role: 'admin' | 'user') {
    this.name = name;
    this.role = role;
  }

  getName(): string {
    return this.name;
  }

  getRole(): string {
    return this.role;
  }
}

function main2() {
  const confidentialDoc = new ConfidentialDocument(
    'Este es el contenido confidencial del documento.',
  );
  const proxy = new DocumentProxy(confidentialDoc, ['admin']);

  const user1 = new User('Juan', 'user');
  const user2 = new User('Ana', 'admin');

  console.log('\nIntento de acceso del usuario 1:');
  proxy.displayContent(user1);

  console.log('\nIntento de acceso del usuario 2:');
  proxy.displayContent(user2);
}

main2();
