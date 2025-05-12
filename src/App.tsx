import { Form_01 } from "./comps/form-01";
import { Form_02 } from "./comps/form-02";
import { Form_03 } from "./comps/form-03";
import { Form_04 } from "./comps/form-04";
import { Form_05 } from "./comps/form-05";
import { Form_06 } from "./comps/form-06";
import "./style.css";

function App() {
  return (
    <div
      style={{
        display: "grid",
        gap: 12,
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      }}
    >
      <Form_01 />
      <Form_02 />
      <Form_03 />
      <Form_04 />
      <Form_05 />
      <Form_06 />
    </div>
  );
}

export default App;
