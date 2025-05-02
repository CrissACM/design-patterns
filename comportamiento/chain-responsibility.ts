/**
 * ! Patron Chain of Responsibility
 * Es un patrón de diseño de comportamiento que te permite pasar solicitudes
 * a lo largo de una cadena de manejadores.
 *
 * * Es útil cuando se necesita procesar datos de diferentes maneras, pero no
 * * se sabe de antemano qué tipo de procesamiento se necesita o en qué orden
 * * pero se sabe que se necesita procesar en una secuencia.
 *
 * https://refactoring.guru/es/design-patterns/chain-of-responsibility
 */

interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): void;
}

abstract class BaseHandle implements Handler {
  private nextHandler?: Handler;

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;

    return handler;
  }

  handle(request: string): void {
    if (this.nextHandler) {
      this.nextHandler.handle(request);
    }
  }
}

class BasicSupport extends BaseHandle {
  override handle(request: string): void {
    if (request === 'básico') {
      console.log('Soporte básico: resolviendo problema básico');
      return;
    }

    console.log('Soporte básico: Pasando el problema a soporte avanzando');
    super.handle(request);
  }
}

class AdvancedSupport extends BaseHandle {
  override handle(request: string): void {
    if (request === 'avanzado') {
      console.log('Soporte avanzado: resolviendo problema avanzado');
      return;
    }

    console.log('Soporte avanzado: Pasando el problema a soporte experto');
    super.handle(request);
  }
}

class ExpertSupport extends BaseHandle {
  override handle(request: string): void {
    if (request === 'experto') {
      console.log('Soporte experto: resolviendo problema experto');
      return;
    }

    console.log('Soporte experto: no hay nada que hacer... bye bye');
  }
}

function main() {
  const basicSupport = new BasicSupport();
  const advancedSupport = new AdvancedSupport();
  const expertSupport = new ExpertSupport();

  basicSupport.setNext(advancedSupport.setNext(expertSupport));

  basicSupport.handle('básico');
  basicSupport.handle('avanzado');
  basicSupport.handle('experto');
  basicSupport.handle('nuclear');
}

main();

//TODO
interface Approver {
  setNext(approver: Approver): Approver;
  approveRequest(amount: number): void;
}

abstract class BaseApprover implements Approver {
  private nextApprover: Approver | null = null;

  setNext(approver: Approver): Approver {
    this.nextApprover = approver;
    return approver;
  }

  abstract approveRequest(amount: number): void;

  protected next(amount: number): void {
    if (this.nextApprover) {
      this.nextApprover.approveRequest(amount);
      return;
    }

    console.log('Solicitud no pudo ser aprobada.');
  }
}

class Supervisor extends BaseApprover {
  override approveRequest(amount: number): void {
    if (amount >= 1000) {
      console.log(`Supervisor aprueba la compra de $${amount}`);
      return;
    }

    this.next(amount);
  }
}

class Manager extends BaseApprover {
  override approveRequest(amount: number): void {
    if (amount >= 5000) {
      console.log(`Manager aprueba la compra de $${amount}`);
      return;
    }

    this.next(amount);
  }
}

class Director extends BaseApprover {
  override approveRequest(amount: number): void {
    console.log(`Director aprueba la compra de $${amount}`);
  }
}

function main2() {
  const supervisor = new Supervisor();
  const manager = new Manager();
  const director = new Director();

  supervisor.setNext(manager).setNext(director);

  console.log('Solicitud de compra de $500:');
  supervisor.approveRequest(500);

  console.log('\nSolicitud de compra de $3000:');
  supervisor.approveRequest(3000);

  console.log('\nSolicitud de compra de $7000:');
  supervisor.approveRequest(7000);
}

main2();
