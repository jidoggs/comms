import { useState } from 'react';

function useModalState<T extends string>(
  initialModalState: Record<T, boolean>
) {
  const [isModalOpen, setIsModalOpen] = useState(initialModalState);

  const showModal = (val: keyof typeof initialModalState) => {
    setIsModalOpen({ ...initialModalState, [val]: true });
  };

  const handleCancel = () => {
    setIsModalOpen({ ...initialModalState });
  };
  return {
    isModalOpen,
    showModal,
    handleCancel,
  };
}

export default useModalState;
