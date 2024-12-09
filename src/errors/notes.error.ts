export class NotesError extends Error {
  constructor(
    public readonly code = 'NOT_FOUND',
    public readonly message = 'NOTES_ERROR',
    public readonly params?: Record<any, any>,
    public readonly isInformative?: boolean,
  ) {
    super(NotesError.name);
    this.message = message;
    this.code = code;
    this.params = params || {};
    this.isInformative = isInformative;
  }
}
