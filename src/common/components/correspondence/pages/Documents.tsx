import React from 'react';
import { motion } from 'framer-motion';

const Documents = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      className="relative flex h-[70vh] w-full flex-col justify-end"
    >
      Documents
    </motion.div>
  );
};

export default Documents;
