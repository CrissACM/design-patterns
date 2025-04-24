/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

class CodeEditorState {
  constructor(
    readonly content: string,
    readonly cursorPosition: number,
    readonly unSavedChanges: boolean,
  ) {}

  copyWith({
    content,
    cursorPosition,
    unSavedChanges,
  }: Partial<CodeEditorState>): CodeEditorState {
    return new CodeEditorState(
      content ?? this.content,
      cursorPosition ?? this.cursorPosition,
      unSavedChanges ?? this.unSavedChanges,
    );
  }

  displayState() {
    console.log('\nEstado del editor:');
    console.log(`
      Content: ${this.content}
      Cursor Position: ${this.cursorPosition}
      UnSaved Changes: ${this.unSavedChanges}
    `);
  }
}

class CodeEditorHistory {
  private history: CodeEditorState[] = [];
  private currentIndex: number = -1;

  save(state: CodeEditorState): void {
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1);
    }

    this.history.push(state);
    this.currentIndex++;
  }

  undo(): CodeEditorState | null | undefined {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }

    return null;
  }

  redo(): CodeEditorState | null | undefined {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }

    return null;
  }
}

function main() {
  const history = new CodeEditorHistory();
  let editorState = new CodeEditorState("console.log('Hello World')", 2, false);
  history.save(editorState);

  console.log('Estado inicial');
  editorState.displayState();

  editorState = editorState.copyWith({
    content: 'console.log("Hello World"); \nconsole.log("new line");',
    cursorPosition: 12,
    unSavedChanges: true,
  });
  history.save(editorState);

  console.log('Estado modificado');
  editorState.displayState();

  console.log('después de mover el cursorPosition');
  editorState = editorState.copyWith({ cursorPosition: 5 });
  history.save(editorState);
  editorState.displayState();

  console.log('después del undo');
  editorState = history.undo()!;
  editorState.displayState();

  console.log('después del redo');
  editorState = history.redo()!;
  editorState.displayState();
}

main();

//TODO
interface PlayerProps {
  name: string;
  score: number;
  level: number;
}

class Player {
  readonly name: string;
  readonly score: number;
  readonly level: number;

  constructor({ level, name, score }: PlayerProps) {
    this.name = name;
    this.score = score;
    this.level = level;
  }

  copyWith({ name, score, level }: Partial<Player>): Player {
    return new Player({
      name: name ?? this.name,
      score: score ?? this.score,
      level: level ?? this.level,
    });
  }

  displayState(): void {
    console.log(`\nJugador: ${this.name}`);
    console.log(`Puntaje: ${this.score}`);
    console.log(`Nivel: ${this.level}`);
  }
}

function main2() {
  // Crear jugador inicial
  let player = new Player({ name: 'Carlos', score: 0, level: 1 });
  console.log('Estado inicial:');
  player.displayState();

  // Incrementar el puntaje
  player = player.copyWith({ score: 10 });
  console.log('\nDespués de incrementar el puntaje:');
  player.displayState();

  // Subir de nivel
  player = player.copyWith({ level: 2 });
  console.log('\nDespués de subir de nivel:');
  player.displayState();

  // Cambiar el nombre del jugador
  player = player.copyWith({ name: 'Carlos Pro' });
  console.log('\nDespués de cambiar el nombre:');
  player.displayState();
}

main2();
