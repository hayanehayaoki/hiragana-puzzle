import { Dispatch, FC, memo, SetStateAction } from "react";

type MaruDialogProps = {
	setIndex: Dispatch<SetStateAction<number>>;
};

export const MaruDialog: FC<MaruDialogProps> = memo(function MaruDialog(props: MaruDialogProps) {
	const { setIndex } = props;

	return (
		<dialog
			className="Dialog__hidden"
			onClick={() => {
				const element = document.getElementsByClassName("Dialog__shown");
				if (element[0] instanceof HTMLDialogElement) {
					element[0].className = "Dialog__hidden";
					setIndex((prev) => {
						return prev + 1;
					});
				}
			}}
		>
			<div className="Dialog__circle" />
		</dialog>
	);
});
