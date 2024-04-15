import React, { useContext, useRef } from 'react';
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
  const containerRef = useRef<null | HTMLDivElement>(null);
  const y = containerRef?.current?.offsetHeight || 128;

  return (
    <motion.div
      className={mergeClassName(
        'relative flex h-full w-full max-w-100 flex-1 flex-col gap-y-1 rounded-10 bg-custom-note p-2.5 shadow-wordBox before:absolute before:-top-3.5 before:left-1/2 before:z-[1] before:h-[15px] before:w-[18px] before:-translate-x-1/2 before:text-custom-note before:content-["▲"]',
        className
      )}
      initial={{
        y: -y,
      }}
      whileInView={{
        y: 0,
      }}
      exit={{
        y: -y,
        opacity: 0,
      }}
      transition={{
        duration: 0.2,
      }}
      ref={containerRef}
    >
      {noteContextInfo?.noteType === 'form' ? <CreateNote /> : null}
      {noteContextInfo?.noteType === 'view' ? <ReadNote /> : null}
      {noteContextInfo?.noteType === 'private' ? <PrivateNote /> : null}
    </motion.div>
  );
}

export default Note;
