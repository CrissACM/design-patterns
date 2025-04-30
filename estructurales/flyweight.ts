/**
 * ! Patrón Flyweight
 * Es un patrón de diseño estructural que nos permite usar objetos compartidos
 * para soportar eficientemente grandes cantidades de objetos.
 *
 * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
 * * la cantidad de memoria que utilizan.
 *
 * https://refactoring.guru/es/design-patterns/flyweight
 */

interface Location {
  display(coordinates: { x: number; y: number }): void;
}

class LocationIcon implements Location {
  private type: string;
  private iconImage: string;

  constructor(type: string, iconImage: string) {
    this.type = type;
    this.iconImage = iconImage;
  }

  display(coordinates: { x: number; y: number }): void {
    console.log(
      `Coords: ${this.type} en ${coordinates.x}, ${coordinates.y} - ${this.iconImage}`,
    );
  }
}

class LocationFactory {
  private locations: Record<string, LocationIcon> = {};

  getLocationIcon(type: string): LocationIcon {
    if (!this.locations[type]) {
      console.log(`Creando icono de ubicación para el tipo: ${type}`);
      const iconImage = `imagen_de_${type}.png`;

      this.locations[type] = new LocationIcon(type, iconImage);
    }

    return this.locations[type];
  }
}

class MapLocation {
  private coordinates: { x: number; y: number };
  private icon: LocationIcon;

  constructor(x: number, y: number, icon: LocationIcon) {
    this.coordinates = { x, y };
    this.icon = icon;
  }

  display() {
    this.icon.display(this.coordinates);
  }
}

function main() {
  const factory = new LocationFactory();

  const locations = [
    new MapLocation(1, 2, factory.getLocationIcon('casa')),
    new MapLocation(3, 4, factory.getLocationIcon('oficina')),
    new MapLocation(5, 6, factory.getLocationIcon('casa')),
    new MapLocation(7, 8, factory.getLocationIcon('oficina')),
    new MapLocation(7, 8, factory.getLocationIcon('Hospital')),
    new MapLocation(7, 8, factory.getLocationIcon('Hospital')),
    new MapLocation(7, 8, factory.getLocationIcon('Hospital')),
  ];

  locations.forEach((item) => item.display());
}

main();

//TODO
class BulletType {
  private name: string;
  private damage: number;
  private color: string;

  constructor(name: string, damage: number, color: string) {
    this.name = name;
    this.damage = damage;
    this.color = color;
  }

  getName(): string {
    return this.name;
  }

  getDamage(): number {
    return this.damage;
  }

  getColor(): string {
    return this.color;
  }
}

class BulletTypeFactory {
  private bulletTypes: Record<string, BulletType> = {};

  getBulletType(name: string, damage: number, color: string): BulletType {
    const key = `${name}-${damage}-${color}`;

    if (!this.bulletTypes[key]) {
      console.log(`Creando tipo de bala: ${key}`);
      this.bulletTypes[key] = new BulletType(name, damage, color);

      return this.bulletTypes[key];
    }

    return this.bulletTypes[key];
  }
}

class Bullet {
  private x: number;
  private y: number;
  private direction: number;
  private bulletType: BulletType;

  constructor(x: number, y: number, direction: number, bulletType: BulletType) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.bulletType = bulletType;
  }

  display(): void {
    const text = `
      Bala del tipo: "${this.bulletType.getName()}"
      Coords: (${this.x}, ${this.y})
      Dirección ${this.direction}
      Daño: ${this.bulletType.getDamage()}
      Color: ${this.bulletType.getColor()}
    `;

    console.log(text);
  }
}

class ShootingSystem {
  private bullets: Bullet[] = [];
  private factory: BulletTypeFactory;

  constructor(factory: BulletTypeFactory) {
    this.factory = factory;
  }

  shoot(
    x: number,
    y: number,
    direction: number,
    type: string,
    damage: number,
    color: string,
  ): void {
    const bulletType = this.factory.getBulletType(type, damage, color);
    const bullet = new Bullet(x, y, direction, bulletType);
    this.bullets.push(bullet);
    bullet.display();
  }

  getBulletCount(): number {
    return this.bullets.length;
  }
}

function main2() {
  const factory = new BulletTypeFactory();
  const shootingSystem = new ShootingSystem(factory);

  shootingSystem.shoot(10, 20, 0, 'Pistola', 10, 'Gris');
  shootingSystem.shoot(15, 25, 90, 'Escopeta', 20, 'Rojo');
  shootingSystem.shoot(20, 30, 180, 'Rifle', 15, 'Verde');
  shootingSystem.shoot(10, 20, 45, 'Pistola', 10, 'Gris');
  shootingSystem.shoot(25, 35, 270, 'Escopeta', 20, 'Rojo');

  console.log(
    `Total de balas disparadas: ${shootingSystem.getBulletCount()}\n`,
  );
}

main2();
