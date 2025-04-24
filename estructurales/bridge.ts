/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */

interface Ability {
  use(): void;
}

class SwordAttack implements Ability {
  use(): void {
    console.log('Ataque con espada');
  }
}

class AxeAttack implements Ability {
  use(): void {
    console.log('Ataque con hacha');
  }
}

class FireBallSpell implements Ability {
  use(): void {
    console.log('hechizos bola de fuego');
  }
}

class HealSpell implements Ability {
  use(): void {
    console.log('hechizos de curación');
  }
}

abstract class Character {
  public ability: Ability;

  constructor(ability: Ability) {
    this.ability = ability;
  }

  setAbility(ability: Ability): void {
    this.ability = ability;
  }

  abstract performAbility(): void;
}

class Warrior extends Character {
  override performAbility(): void {
    console.log('\nEl guerrero esta listo para luchar');
    this.ability.use();
  }
}

class Mage extends Character {
  override performAbility(): void {
    console.log('\nEl mago esta listo para lanzar hechizos');
    this.ability.use();
  }
}

function main() {
  const warrior = new Warrior(new SwordAttack());
  const mage = new Mage(new FireBallSpell());

  warrior.performAbility();

  warrior.setAbility(new AxeAttack());
  warrior.performAbility();

  mage.performAbility();

  mage.setAbility(new HealSpell());
  mage.performAbility();
}

main();

//TODO
interface NotificationChannel {
  send(message: string): void;
}

class EmailChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando email: ${message}`);
  }
}

class SMSChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando SMS: ${message}`);
  }
}

class PushNotificationChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando Push: ${message}`);
  }
}

abstract class Notification {
  protected channel: NotificationChannel;

  constructor(channel: NotificationChannel) {
    this.channel = channel;
  }

  abstract notify(message: string): void;
  abstract setChannel(channel: NotificationChannel): void;
}

class AlertNotification extends Notification {
  override notify(message: string): void {
    console.log('\nNotificación de Alerta:');

    this.channel.send(message);
  }

  override setChannel(channel: NotificationChannel): void {
    this.channel = channel;
  }
}

class ReminderNotification extends Notification {
  override notify(message: string): void {
    console.log('\nNotificación de Recordatorio:');
    this.channel.send(message);
  }

  override setChannel(channel: NotificationChannel): void {
    this.channel = channel;
  }
}

class PushNotification extends Notification {
  override notify(message: string): void {
    console.log('\nNotificación de Push:');
    this.channel.send(message);
  }

  override setChannel(channel: NotificationChannel): void {
    this.channel = channel;
  }
}

function main2() {
  const alert = new AlertNotification(new EmailChannel());

  alert.notify('Alerta de seguridad: Se ha detectado un acceso no autorizado.');

  alert.setChannel(new SMSChannel());
  alert.notify('Alerta de seguridad: Se ha detectado un acceso no autorizado.');

  const reminder = new ReminderNotification(new SMSChannel());
  reminder.notify(
    'Recordatorio: Tu cita con el médico es mañana a las 10:00 a.m.',
  );

  reminder.setChannel(new PushNotificationChannel());
  reminder.notify(
    'Recordatorio: Tu cita con el médico es mañana a las 10:00 a.m.',
  );

  const push = new PushNotification(new PushNotificationChannel());
  push.notify('Nueva actualización disponible. Haz clic para instalar.');
}

main2();

//??
interface NotificationChannel2 {
  send(message: string): void;
}

class EmailChannel2 implements NotificationChannel2 {
  send(message: string): void {
    console.log(`Enviando email: ${message}`);
  }
}

class SMSChannel2 implements NotificationChannel2 {
  send(message: string): void {
    console.log(`Enviando SMS: ${message}`);
  }
}

class PushNotificationChannel2 implements NotificationChannel2 {
  send(message: string): void {
    console.log(`Enviando Push: ${message}`);
  }
}

abstract class Notifier {
  protected channels: NotificationChannel2[];

  constructor(channels: NotificationChannel2[]) {
    this.channels = channels;
  }

  abstract notify(message: string): void;
  abstract addChannel(channel: NotificationChannel2): void;
}

class AlertNotification2 extends Notifier {
  override notify(message: string): void {
    console.log('\nNotificación de Alerta');
    this.channels.forEach((channel) => channel.send(message));
  }

  override addChannel(channel: NotificationChannel2): void {
    this.channels.push(channel);
  }
}

function main3() {
  const channels = [
    new EmailChannel2(),
    new SMSChannel2(),
    new PushNotificationChannel2(),
  ];

  const alert = new AlertNotification2(channels);

  alert.notify('Alguien frente de la casa');
  console.log('\n');
}

main3();
