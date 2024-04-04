export type CreateNoteFormType = {
  note: string;
  isPrivate: boolean;
  color: string;
};

export type NoteInfo = {
  showNote: boolean;
  noteType: 'form' | 'view' | 'private';
} & CreateNoteFormType;

export type NotesContextType =
  | ({
      showNoteHandler: VoidFunction; //eslint-disable-line
      createNoteHandler: (val: CreateNoteFormType) => void; //eslint-disable-line
      deleteNoteHandler: VoidFunction; //eslint-disable-line
      togglePrivacyHandler: VoidFunction; //eslint-disable-line
    } & NoteInfo)
  | null;
