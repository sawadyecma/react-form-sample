import React from "react";
import { InputModal } from "./form-04/input-modal";

export const Form_04 = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="form">
      <p className="text-white">rulesを渡せるフォーム</p>
      {isOpen ? (
        <InputModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          formProps={[
            {
              rule: {
                required: "Please enter your first name",
              },
            },
            {
              rule: {
                required: "Please enter your last name",
              },
            },
          ]}
        />
      ) : null}

      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        open Modal
      </button>
    </div>
  );
};
