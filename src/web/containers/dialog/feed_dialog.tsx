import { useCallback } from 'react';
import { useModal } from '../../customHooks/useModal';

export default function FeedDialog() {
  const { ref, showModal, closeModal } = useModal();

  const stopPropagation = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
    },
    []
  );
  return (
    <div>
      <div className='feed_add_button' onClick={showModal}>
        +
      </div>
      <dialog
        ref={ref}
        onClick={closeModal}
        style={{
          height: '800px',
          width: '800px',
          overscrollBehaviorY: 'none',
        }}
      >
        <div
          onClick={stopPropagation}
          className='dialog_body'
          style={{ height: '1600px' }}
        >
          <div>dialog title</div>
          <input type='text' name='' id='' />
          <button onClick={closeModal}>close</button>
        </div>
      </dialog>
    </div>
  );
}
