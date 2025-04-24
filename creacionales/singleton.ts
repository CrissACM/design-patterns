/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

class DragonBalls {
  private static instance: DragonBalls;
  private ballsCollected: number;

  private constructor() {
    this.ballsCollected = 0;
  }

  public static getInstance(): DragonBalls {
    if (!DragonBalls.instance) {
      DragonBalls.instance = new DragonBalls();
      console.log('Dragon balls is created');
    }

    return DragonBalls.instance;
  }

  collectBall(): void {
    if (this.ballsCollected < 7) {
      this.ballsCollected++;
      console.log(`Ball collected! Total: ${this.ballsCollected}`);
      return;
    }

    console.log('You already have all the Dragon Balls! Invoke Shenlong');
  }

  summonShenlong() {
    if (this.ballsCollected === 7) {
      console.log('Shenlong is invoked, you wish');
      this.ballsCollected = 0;
      return;
    }

    console.log(
      `\nYou need to collect ${7 - this.ballsCollected} more Dragon Balls\n`,
    );
  }
}

function main() {
  const gokuDragonBalls = DragonBalls.getInstance();

  gokuDragonBalls.collectBall();
  gokuDragonBalls.collectBall();
  gokuDragonBalls.collectBall();

  gokuDragonBalls.summonShenlong();

  const vegetaDragonBalls = DragonBalls.getInstance();

  vegetaDragonBalls.collectBall();
  vegetaDragonBalls.collectBall();
  vegetaDragonBalls.collectBall();
  vegetaDragonBalls.collectBall();

  gokuDragonBalls.summonShenlong();
  vegetaDragonBalls.summonShenlong();
}

main();

//TODO
class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connected: boolean = false;

  private constructor() {}

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }

    return DatabaseConnection.instance;
  }

  public connect(): void {
    if (!this.connected) {
      this.connected = true;
      console.log('Connected to the database');
      return;
    }

    console.log('Already connected to the database');
  }

  public disconnect(): void {
    if (this.connected) {
      this.connected = false;
      console.log('Disconnected from the database');
      return;
    }

    console.log('Already disconnected from the database');
  }
}

// Pruebas
function main2() {
  const db1 = DatabaseConnection.getInstance();
  db1.connect();

  const db2 = DatabaseConnection.getInstance();
  db2.connect();

  console.log('Son iguales:', db1 === db2);

  db1.disconnect();
  db2.connect();
}

main2();

//??
import { configManager } from './singleton/config-manager';

configManager.setConfig('apiUrl', '\nhttps://api.example.com');
configManager.setConfig('timeout', '5000');
configManager.setConfig('apikey', '1234567890');

console.log(configManager.getConfig('apiUrl'));
console.log(configManager.getConfig('timeout'));
console.log(configManager.getConfig('apikey'));
