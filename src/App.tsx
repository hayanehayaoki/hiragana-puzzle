import { FC, useState } from "react";
import "./App.css";
import { Page } from "./Components/Page";
import { AppContext, AppContextProps, getQuiz } from "./Constants/AppContext";
import "./Styles/App.scss";

const App: FC = () => {
	const [quizType, setQuizType] = useState<AppContextProps["quiz"]>(getQuiz());

	const defaultContext: AppContextProps = {
		quiz: quizType,
		setQuiz: setQuizType,
	};

	return (
		<AppContext.Provider value={defaultContext}>
			<Page />
		</AppContext.Provider>
	);
};

export default App;
