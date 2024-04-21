import Folder from "./components/Folder";
import "./styles.css";
import { folderData } from "./constants/folderData";
import { useTreeTraversal } from "./customHooks";

export default function App() {
  const [tree, insertNode] = useTreeTraversal(folderData);
  return (
    <div className="App">
      <Folder folderData={tree} createNewEntity={insertNode} />
    </div>
  );
}
