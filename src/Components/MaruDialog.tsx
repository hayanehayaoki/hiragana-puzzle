import { FC, memo } from "react";

export const MaruDialog: FC = memo(function MaruDialog() {
	return (
		<dialog
			className="Dialog__hidden"
			onClick={() => {
				window.location.reload();
			}}
		>
			<div className="Dialog__circle" />
		</dialog>
	);
});
