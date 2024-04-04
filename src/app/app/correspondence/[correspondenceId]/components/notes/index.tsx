import React, { useContext } from 'react';
import { NoteContext } from '../service-context/NotesContextWapper';
import CreateNote from './CreateNote';
import ReadNote from './ReadNote';
import PrivateNote from './PrivateNote';
import { mergeClassName } from '@/common/utils';

type Props = {
  className?: string;
};

function Note({ className }: Props) {
  const noteContextInfo = useContext(NoteContext);

  return (
    <div
      className={mergeClassName(
        'flex w-full max-w-100 flex-col gap-y-1 rounded-10 bg-custom-cream_100 p-2.5 shadow-wordBox before:absolute before:-top-3.5 before:left-1/2 before:z-10 before:-translate-x-1/2 before:text-custom-cream_100 before:content-["▲"]',
        className
      )}
      data-color={noteContextInfo?.color}
      style={{
        background: noteContextInfo?.color,
      }}
    >
      {noteContextInfo?.noteType === 'form' ? <CreateNote /> : null}
      {noteContextInfo?.noteType === 'view' ? <ReadNote /> : null}
      {noteContextInfo?.noteType === 'private' ? <PrivateNote /> : null}
    </div>
  );
}

export default Note;
