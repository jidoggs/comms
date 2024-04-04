import React, { useContext } from 'react';
import { NoteContext } from '../../service-context/NotesContextWapper';
import CustomButton from '@/common/components/CustomButton';
import { EyeSlash, Thrash } from '@/common/components/icons';
import Colors from './Colors';

function ReadNote() {
  const noteContextInfo = useContext(NoteContext);
  return (
    <div>
      <p className="h-full min-h-20 text-sm leading-4.5 text-custom-main">
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
        <Colors onChange={noteContextInfo?.colorUpdateHandler} />
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
