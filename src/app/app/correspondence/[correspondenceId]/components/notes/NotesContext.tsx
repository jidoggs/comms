import React, { ReactNode, createContext, useState } from 'react';
import { RadioGroupProps } from 'antd';
import { CreateNoteFormType, NoteInfo, NotesContextType } from './type';
import { customThemeColor } from '@/common/utils';

const initialNoteInfo: NoteInfo = {
  showNote: false,
  noteType: 'form',
  note: '',
  color: customThemeColor.cream_100,
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

  const colorUpdateHandler: RadioGroupProps['onChange'] = (e) => {
    const color = e.target.value;
    setNoteInfo((prev) => ({ ...prev, color }));
  };

  return (
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
  );
}

export default NotesContext;
