/**
 * ! Patrón decorador
 * Es un patrón de diseño estructural que permite añadir
 * funcionalidades a objetos, colocando estos objetos dentro de
 * objetos encapsuladores especiales que contienen estas funcionalidades.
 *
 * No confundirlo con los decoradores de TypeScript que son anotaciones.
 *
 * * Es útil cuando necesitas añadir funcionalidades a objetos
 *  * de manera dinámica y flexible.
 *
 * https://refactoring.guru/es/design-patterns/decorator
 */

interface Notification {
  send(message: string): void;
}

class BasicNotification implements Notification {
  send(message: string): void {
    console.log(`Enviando notificación básica: ${message}`);
  }
}

abstract class NotificationDecorator implements Notification {
  protected notification: Notification;

  constructor(notification: Notification) {
    this.notification = notification;
  }

  send(message: string): void {
    this.notification.send(message);
  }
}

class EmailDecorator extends NotificationDecorator {
  private sendEmail(message: string) {
    console.log(`Enviando notificación por Email: ${message}`);
  }

  override send(message: string): void {
    super.send(message);
    this.sendEmail(message);
  }
}

class SMSDecorator extends NotificationDecorator {
  private sendSMS(message: string) {
    console.log(`Enviando notificación por SMS: ${message}`);
  }

  override send(message: string): void {
    super.send(message);
    this.sendSMS(message);
  }
}

function main() {
  let notification: Notification = new BasicNotification();

  notification = new EmailDecorator(notification);
  notification = new SMSDecorator(notification);
  notification.send('Alert del sistema!!!');
}

main();

//TODO
interface Character {
  getDescription(): string;
  getStats(): { attack: number; defense: number };
}

class BasicCharacter implements Character {
  getDescription(): string {
    return 'Personaje básico';
  }
  getStats(): { attack: number; defense: number } {
    return { attack: 10, defense: 10 };
  }
}

abstract class CharacterDecorator implements Character {
  protected character: Character;

  constructor(character: Character) {
    this.character = character;
  }

  getDescription(): string {
    return this.character.getDescription();
  }

  getStats(): { attack: number; defense: number } {
    return this.character.getStats();
  }
}

// Añade un casco que aumenta la defensa en +5
class HelmetDecorator extends CharacterDecorator {
  override getDescription(): string {
    return this.character.getDescription() + '\n * con Casco';
  }

  override getStats(): { attack: number; defense: number } {
    const stats = this.character.getStats();
    return { attack: stats.attack, defense: stats.defense + 5 };
  }
}

// Añade un escudo que aumenta la defensa en +10
class ShieldDecorator extends CharacterDecorator {
  override getDescription(): string {
    return this.character.getDescription() + '\n * con Escudo';
  }

  override getStats(): { attack: number; defense: number } {
    const stats = this.character.getStats();
    return { attack: stats.attack, defense: stats.defense + 10 };
  }
}

// Añade una espada que aumenta el ataque en +7
class SwordDecorator extends CharacterDecorator {
  override getDescription(): string {
    return this.character.getDescription() + '\n * con Espada';
  }

  override getStats(): { attack: number; defense: number } {
    const stats = this.character.getStats();
    return { attack: stats.attack + 7, defense: stats.defense };
  }
}

// class RingDecorator ...
class RingDecorator extends CharacterDecorator {
  override getDescription(): string {
    return this.character.getDescription() + '\n * con Anillo';
  }

  override getStats(): { attack: number; defense: number } {
    const stats = this.character.getStats();
    return { attack: stats.attack + 3, defense: stats.defense };
  }
}

function main2() {
  // Crear un personaje básico
  let character: Character = new BasicCharacter();
  console.log('\nPersonaje inicial:', character.getDescription());
  console.log('Estadísticas:', character.getStats());

  // Añadir un casco al personaje
  character = new HelmetDecorator(character);
  console.log('\nCon Casco:', character.getDescription());
  console.log('Estadísticas:', character.getStats());

  // Añadir un escudo al personaje
  character = new ShieldDecorator(character);
  console.log('\nCon Escudo:', character.getDescription());
  console.log('Estadísticas:', character.getStats());

  // Añadir una espada al personaje
  character = new SwordDecorator(character);
  console.log('\nCon Espada:', character.getDescription());
  console.log('Estadísticas:', character.getStats());

  character = new RingDecorator(character);
  console.log('\nCon Anillo:', character.getDescription());
  console.log('Estadísticas:', character.getStats());

  console.log('\n\n');
}

main2();
