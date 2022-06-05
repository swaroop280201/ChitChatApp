import * as React from 'react';

function AudioIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			data-name="Layer 1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			{...props}
		>
			<path d="M16.5 8v4a4.27 4.27 0 01-4.5 4 4.27 4.27 0 01-4.5-4V8h-2v4a6.17 6.17 0 005.5 5.92V21H9v2h6v-2h-2v-3.08A6.17 6.17 0 0018.5 12V8z" />
			<path d="M12 15a3.5 3.5 0 003.5-3.5v-7a3.5 3.5 0 00-7 0v7A3.5 3.5 0 0012 15zM10.5 4.5a1.5 1.5 0 013 0v7a1.5 1.5 0 01-3 0z" />
		</svg>
	);
}

export default AudioIcon;
