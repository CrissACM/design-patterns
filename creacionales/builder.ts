/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 *
 * https://refactoring.guru/es/design-patterns/builder
 */

import { COLORS } from '../helpers/colors';

class Computer {
  public cpu: string = 'cpu - not defined';
  public ram: string = 'ram - not defined';
  public storage: string = 'storage - not defined';
  public gpu?: string;

  displayConfig() {
    console.log(`Config of computer:
      CPU: ${this.cpu}
      RAM: ${this.ram}
      Storage: ${this.storage}
      GPU: ${this.gpu ?? 'not defined'}
      `);
  }
}

class ComputerBuilder {
  private computer: Computer;

  constructor() {
    this.computer = new Computer();
  }

  setCpu(cpu: string): ComputerBuilder {
    this.computer.cpu = cpu;
    return this;
  }

  setRam(ram: string): ComputerBuilder {
    this.computer.ram = ram;
    return this;
  }

  setStorage(storage: string): ComputerBuilder {
    this.computer.storage = storage;
    return this;
  }

  setGpu(gpu: string): ComputerBuilder {
    this.computer.gpu = gpu;
    return this;
  }

  build(): Computer {
    return this.computer;
  }
}

function main() {
  const basicComputer = new ComputerBuilder()
    .setCpu('Intel Core i7')
    .setRam('16 GB')
    .setStorage('256 GB')
    .setGpu('Nvidia GeForce GTX 1660 Ti')
    .build();

  console.log('%cBasic Computer:', COLORS.blue);
  basicComputer.displayConfig();

  const gamingComputer = new ComputerBuilder()
    .setCpu('AMD Ryzen 5 5600X')
    .setRam('32 GB')
    .setStorage('512 GB')
    .setGpu('Nvidia GeForce RTX 3060')
    .build();

  console.log('%cGaming Computer:', COLORS.blue);
  gamingComputer.displayConfig();
}

main();

//TODO
class QueryBuilder {
  private table: string;
  private fields: string[] = [];
  private conditions: string[] = [];
  private orderFields: string[] = [];
  private limitCount?: number;

  constructor(table: string) {
    this.table = table;
  }

  select(...fields: string[]): QueryBuilder {
    this.fields = fields;
    return this;
  }

  where(condition: string): QueryBuilder {
    this.conditions.push(condition);
    return this;
  }

  orderBy(field: string, direction: 'ASC' | 'DESC'): QueryBuilder {
    this.orderFields.push(`${field} ${direction}`);
    return this;
  }

  limit(count: number): QueryBuilder {
    this.limitCount = count;
    return this;
  }

  execute(): string {
    let query = `SELECT ${this.fields.join(', ')} FROM ${this.table}`;

    if (this.fields.length === 0) {
      query = `SELECT * FROM ${this.table}`;
    }

    if (this.conditions.length > 0) {
      query += ` WHERE ${this.conditions.join(' AND ')}`;
    }

    if (this.orderFields.length > 0) {
      query += ` ORDER BY ${this.orderFields.join(', ')}`;
    }

    if (this.limitCount) {
      query += ` LIMIT ${this.limitCount}`;
    }

    // Select id, name, email from users where age > 18 and country = 'Cri' order by name ASC limit 10;
    return query;
  }
}

function task() {
  const usersQuery = new QueryBuilder('users')
    .select('id', 'name', 'email')
    .where('age > 18')
    .where("country = 'Cri'")
    .orderBy('name', 'ASC')
    .orderBy('email', 'DESC')
    .limit(10)
    .execute();

  console.log('%cConsulta:\n', COLORS.red);
  console.log(usersQuery);
}

task();
