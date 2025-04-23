/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

class CodeEditorState {
  readonly content: string;
  readonly cursorPosition: number;
  readonly unSavedChanges: boolean;

  constructor(
    content: string,
    cursorPosition: number,
    unSavedChanges: boolean,
  ) {
    this.content = content;
    this.cursorPosition = cursorPosition;
    this.unSavedChanges = unSavedChanges;
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
