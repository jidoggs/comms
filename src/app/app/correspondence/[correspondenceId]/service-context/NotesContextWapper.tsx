import React, { createContext, useState } from 'react';
import { RadioGroupProps } from 'antd/es/radio';
import { customThemeColor } from '@/common/utils';
import {
  CreateNoteFormType,
  NoteInfo,
  NotesContextType,
} from '../components/notes/type';
import { ContextWrapper } from '@/types';

const initialNoteInfo: NoteInfo = {
  showNote: false,
  noteType: 'form',
  note: '',
  color: customThemeColor.cream_100,
  isPrivate: false,
};

export const NoteContext = createContext<NotesContextType>(null);

function NotesContextWapper({ children }: ContextWrapper) {
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
    // setNoteInfo((prev) => ({ ...prev, note: '', noteType: 'private' }));
    setNoteInfo({ ...initialNoteInfo });
  };

  const togglePrivacyHandler = () => {
    setNoteInfo((prev) => ({ ...prev, isPrivate: !prev.isPrivate }));
  };

  const colorUpdateHandler: RadioGroupProps['onChange'] = (e) => {
    const color = e.target.value;
    setNoteInfo((prev) => ({ ...prev, color }));
  };

  return (
    <>
      <NoteContext.Provider
        value={{
          ...noteInfo,
          showNoteHandler,
          createNoteHandler,
          deleteNoteHandler,
          togglePrivacyHandler,
          colorUpdateHandler,
        }}
      >
        {children}
      </NoteContext.Provider>
    </>
  );
}

export default NotesContextWapper;
