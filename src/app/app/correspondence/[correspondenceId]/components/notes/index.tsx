import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { NoteContext } from '../../service-context/NotesContextWapper';
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
    <motion.div
      className={mergeClassName(
        'before:text-custom-note bg-custom-note relative flex h-full w-full max-w-100 flex-1 flex-col gap-y-1 rounded-10 p-2.5 shadow-wordBox before:absolute before:-top-3.5 before:left-1/2 before:z-[1] before:h-[15px] before:w-[18px] before:-translate-x-1/2 before:content-["▲"]',
        className
      )}
      initial={{
        y: -100,
      }}
      whileInView={{
        y: 0,
      }}
      exit={{
        y: -100,
      }}
      transition={{
        duration: 0.1,
      }}
    >
      {noteContextInfo?.noteType === 'form' ? <CreateNote /> : null}
      {noteContextInfo?.noteType === 'view' ? <ReadNote /> : null}
      {noteContextInfo?.noteType === 'private' ? <PrivateNote /> : null}
    </motion.div>
  );
}

export default Note;
