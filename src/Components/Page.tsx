import { FC, memo } from "react";
import { Column } from "./Column";
import { Piece } from "./Piece";
import { getQuiz, unusedHiragana } from "./puzzleData";

type PageProps = {
	index: number;
};

export const Page: FC<PageProps> = memo(function Page({ index }: PageProps) {
	const quiz = getQuiz();
	const hiraganas = quiz.name.split("");
	const hiraganaIndex = hiraganas.length;

	return (
		<div className="Page">
			<img src={`./image/${quiz.id}.png`} />
			<div
				className="Row__column"
				style={{
					padding: `0px ${80 - 40 * (hiraganaIndex - 2)}px`,
				}}
			>
				{hiraganas.map((char) => {
					return <Column key={`${index}-${char}}`} char={char} />;
				})}
			</div>
			<div className="Row__piece">
				{getPieces(hiraganas).map((char, index) => {
					return <Piece key={`${index}-${char}}`} char={char} index={index} />;
				})}
			</div>
		</div>
	);
});

const getPieces = (hiraganas: string[]): string[] => {
	const pieces = [...hiraganas];

	while (pieces.length < 6) {
		const idx = Math.floor(Math.random() * unusedHiragana.length);
		const newChar = unusedHiragana[idx];
		pieces.push(newChar);
	}

	return shuffleArray(pieces);
};

const shuffleArray = (array: string[]) => {
	const newArray = [...array];
	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray;
};
