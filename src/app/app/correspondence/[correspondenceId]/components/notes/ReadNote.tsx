import React, { useContext } from 'react';
import { NoteContext } from '../../service-context/NotesContextWapper';
import Title from '@/common/components/Title';
import CustomButton from '@/common/components/CustomButton';
import { EyeSlash, Thrash } from '@/common/components/icons';
import Colors from './Colors';

function ReadNote() {
  const noteContextInfo = useContext(NoteContext);
  return (
    <div className="flex flex-col">
      <Title className="h-full min-h-20 flex-1">{noteContextInfo?.note}</Title>
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
