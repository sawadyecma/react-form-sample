import { Form_01 } from "./comps/form-01";
import { Form_02 } from "./comps/form-02";
import { Form_03 } from "./comps/form-03";
import "./style.css";

function App() {
  return (
    <div
      style={{
        display: "grid",
        gap: 12,
      }}
    >
      <Form_01 />
      <Form_02 />
      <Form_03 />
    </div>
  );
}

export default App;
