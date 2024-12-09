export class NotesError extends Error {
  constructor(
    public readonly code = 'NOT_FOUND',
    public readonly message = 'NOTES_ERROR',
  ) {
    super(NotesError.name);
    this.message = message;
    this.code = code;
  }
}
