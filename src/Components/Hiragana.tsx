import { FC, memo } from "react";

type HiraganaProps = {
	char: string;
};

export const Hiragana: FC<HiraganaProps> = memo(function Hiragana(props: HiraganaProps) {
	const { char } = props;

	return <div>{char}</div>;
});
