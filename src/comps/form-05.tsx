import React from "react";
import { InputModal } from "./form-05/input-modal";
import { z } from "zod";

const schema = z.object({
  first: z.string().min(1, "Please enter your first name"),
  second: z.string().min(1, "Please enter your last name"),
});

const useModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return {
    isOpen,
    openModal: () => setIsOpen(true),
    closeModal: () => setIsOpen(false),
  };
};

export const Form_05 = () => {
  const firstModalProps = useModal();
  const secondModalProps = useModal();

  return (
    <div className="form">
      <p className="text-white">zod schemaを渡せるフォーム</p>
      {firstModalProps.isOpen ? (
        <InputModal
          isOpen={firstModalProps.isOpen}
          onClose={() => firstModalProps.closeModal()}
          schema={schema}
        />
      ) : null}

      <button onClick={() => firstModalProps.openModal()}>
        open 2 text Modal
      </button>

      {secondModalProps.isOpen ? (
        <InputModal
          isOpen={secondModalProps.isOpen}
          onClose={secondModalProps.closeModal}
          schema={z.object({
            first: z.string().min(1, "Please enter your first name"),
            second: z.string().email("Please enter a valid email"),
          })}
        />
      ) : null}

      <button onClick={secondModalProps.openModal}>open 2 email Modal</button>
    </div>
  );
};
