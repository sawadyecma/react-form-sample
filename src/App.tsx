import { Form_01 } from "./comps/form-01";
import { Form_02 } from "./comps/form-02";
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
    </div>
  );
}

export default App;
