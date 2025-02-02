import { FC, memo, useEffect, useRef } from "react";

type PieceProps = {
	char: string;
	index: number;
};

export const Piece: FC<PieceProps> = memo(function Piece(props: PieceProps) {
	const { char, index } = props;
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (ref.current instanceof HTMLDivElement) {
			const doc = ref.current;
			doc.addEventListener("touchstart", touchstart, { passive: false });
			doc.addEventListener("touchmove", touchmove, { passive: false });
			doc.addEventListener("touchend", touchend, { passive: false });
		}
	}, []);

	return (
		<div
			className="Item__piece"
			draggable
			ref={ref}
			style={{ top: `${Math.floor(index / 3) * 80}px`, left: `${(index % 3) * 80}px` }}
		>
			{char}
		</div>
	);
});

const touchstart = (e: TouchEvent) => {
	const { clientX, clientY, target } = e.touches[0];
	if (target instanceof HTMLDivElement && target.draggable) {
		target.style.position = "fixed";
		target.style.top = `${clientY - target.offsetHeight / 2}px`;
		target.style.left = `${clientX - target.offsetWidth / 2}px`;
	}
};

const touchmove = (e: TouchEvent) => {
	const { clientX, clientY, target } = e.touches[0];
	if (target instanceof HTMLDivElement && target.draggable) {
		target.style.top = `${clientY - target.offsetHeight / 2}px`;
		target.style.left = `${clientX - target.offsetWidth / 2}px`;
	}
};

const touchend = (e: TouchEvent) => {
	// 解答欄の取得
	const { clientX, clientY } = e.changedTouches[0];

	const elements = document.elementsFromPoint(clientX, clientY);
	const overPieces = elements.filter((element) => {
		return element.className === "Item__piece";
	});
	if (overPieces.length > 1) {
		return;
	}
	const dropped = elements.find((element) => {
		return element.className === "Item__column";
	});

	if (dropped === undefined) {
		return;
	}
	(dropped as HTMLDivElement).click();
};
