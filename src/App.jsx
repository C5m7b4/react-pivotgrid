import PivotTable from "./components/PivotTable/pivotTable";
import Panel from "./components/Panel/Panel";

import "./App.css";

function App() {
  return (
    <div>
      <PivotTable />
      <Panel isOpen={true}>
        <div>Here is my content</div>
      </Panel>
    </div>
  );
}

export default App;
