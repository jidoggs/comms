import React, { useContext } from 'react';
import { NoteContext } from './NotesContext';
import CustomButton from '@/common/components/CustomButton';
import { EyeSlash, Thrash } from '@/common/components/icons';

function ReadNote() {
  const noteContextInfo = useContext(NoteContext);
  return (
    <div>
      <p className="leading-4.5 h-full min-h-20 text-sm text-custom-main">
        {noteContextInfo?.note}
      </p>
      <div className="flex items-center justify-between">
        <CustomButton
          size="small"
          type="text"
          onClick={noteContextInfo?.togglePrivacyHandler}
        >
          <span>Private</span>
          <EyeSlash />
        </CustomButton>
        <CustomButton
          onClick={noteContextInfo?.deleteNoteHandler}
          icon={<Thrash />}
          size="small"
          type="text"
        />
      </div>
    </div>
  );
}

export default ReadNote;
