import React, { ReactNode, createContext, useState } from 'react';
import { CreateNoteFormType, NoteInfo, NotesContextType } from './type';

const initialNoteInfo: NoteInfo = {
  showNote: false,
  noteType: 'form',
  note: '',
  color: '',
  isPrivate: false,
};

type Props = {
  children: ReactNode;
};

export const NoteContext = createContext<NotesContextType>(null);

function NotesContext({ children }: Props) {
  const [noteInfo, setNoteInfo] = useState<NoteInfo>(initialNoteInfo);

  const showNoteHandler = () => {
    if (noteInfo.showNote) return;
    setNoteInfo((prev) => ({ ...prev, showNote: true }));
  };

  const createNoteHandler = (val: CreateNoteFormType) => {
    setNoteInfo((prev) => ({
      ...prev,
      ...val,
      noteType: 'view',
    }));
  };

  const deleteNoteHandler = () => {
    setNoteInfo((prev) => ({ ...prev, note: '', noteType: 'private' }));
  };

  const togglePrivacyHandler = () => {
    setNoteInfo((prev) => ({ ...prev, isPrivate: !prev.isPrivate }));
  };

  return (
    <NoteContext.Provider
      value={{
        ...noteInfo,
        showNoteHandler,
        createNoteHandler,
        deleteNoteHandler,
        togglePrivacyHandler,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}

export default NotesContext;
