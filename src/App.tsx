import { FC, useState } from "react";
import "./App.css";
import { MaruDialog } from "./Components/MaruDialog";
import { Page } from "./Components/Page";
import "./Styles/App.scss";

const App: FC = () => {
	const [index, setIndex] = useState<number>(0);

	return (
		<>
			<MaruDialog setIndex={setIndex} />
			<Page index={index} />
		</>
	);
};

export default App;
