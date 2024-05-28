import PivotTable from "./components/PivotTable/pivotTable";
// import Panel from "./components/Panel/Panel";
// import ExpandableTable from "./components/ExpandableTable/Expandabletable";
// import { columns, data } from "./expandabledata";
// import { MovieDescription } from "./components/ExpandableTable/MovieDescription";
import "./App.css";

function App() {
  // const renderExpanderRow = (item) => {
  //   return (
  //     <MovieDescription
  //       img={item.img}
  //       alt={item.title}
  //       description={item.description}
  //     />
  //   );
  // };
  return (
    <div>
      <PivotTable />
      {/* <Panel isOpen={true}>
        <div>Here is my content</div>
      </Panel> */}
      {/* <ExpandableTable
        columns={columns}
        items={data}
        renderExpanderRow={renderExpanderRow}
      /> */}
    </div>
  );
}

export default App;
