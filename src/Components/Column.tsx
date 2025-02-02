import { FC, memo, MouseEvent } from "react";

type ColumnProps = {
	char: string;
};

export const Column: FC<ColumnProps> = memo(function Piece(props: ColumnProps) {
	const { char } = props;

	return (
		<div
			className="Item__column"
			onClick={(e: MouseEvent<HTMLDivElement>) => {
				mark(e);
				const elements = document.getElementsByClassName("Item__column");
				const showDialog = Array.from(elements).every((element) => {
					return (element as HTMLDivElement).style.visibility === "hidden";
				});

				if (showDialog) {
					const element = document.getElementsByTagName("dialog")[0];
					if (element instanceof HTMLDialogElement) {
						(element as HTMLDialogElement).className = "Dialog__shown";
					}
				}
			}}
		>
			{char}
		</div>
	);
});

const mark = (e: MouseEvent<HTMLDivElement>): void => {
	const column = e.target as HTMLDivElement;
	const columnRect = column.getBoundingClientRect();
	const centerX = columnRect.left + columnRect.width / 2;
	const centerY = columnRect.top + columnRect.height / 2;

	const elements = document.elementsFromPoint(centerX, centerY);
	const piece = elements.find((element) => {
		return element.className === "Item__piece";
	});
	if (piece === undefined) {
		return;
	}
	const pieceDiv = piece as HTMLDivElement;

	if (column.innerText !== pieceDiv.innerText) {
		return;
	}

	// 重なり範囲の計算
	const pieceRect = pieceDiv.getBoundingClientRect();

	const overlapWidth = Math.max(
		0,
		Math.min(pieceRect.right, columnRect.right) - Math.max(pieceRect.left, columnRect.left),
	);
	const overlapHeight = Math.max(
		0,
		Math.min(pieceRect.bottom, columnRect.bottom) - Math.max(pieceRect.top, columnRect.top),
	);

	const overlapArea = overlapWidth * overlapHeight;
	const elementArea = pieceRect.width * pieceRect.height;

	const overlapRatio = overlapArea / elementArea;

	// 正解のとき、解答欄を非表示にしてピースの位置をずらす
	if (overlapRatio >= 0.7) {
		column.style.visibility = "hidden";
		// margin分を5ずつ除外
		pieceDiv.style.top = `${columnRect.top - 5}px`;
		pieceDiv.style.left = `${columnRect.left - 5}px`;
		// 背景透過
		pieceDiv.style.backgroundColor = "rgba(0,0,0,0)";
		pieceDiv.draggable = false;
	}
};
