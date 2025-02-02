import { createContext, Dispatch, SetStateAction } from "react";
import { PuzzleData, puzzleData } from "../Components/puzzleData";

type SetAction<T> = Dispatch<SetStateAction<T>>;

export type AppContextProps = {
	quiz: PuzzleData;
	setQuiz: SetAction<PuzzleData>;
};

/**
 * @returns 出題対象IDの取得
 */
export const getQuiz = (): PuzzleData => {
	const idx = Math.floor(Math.random() * puzzleData.length);
	return puzzleData[idx];
};

export const AppContext = createContext({} as AppContextProps);
