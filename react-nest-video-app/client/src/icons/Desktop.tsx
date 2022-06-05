import * as React from 'react';

function DesktopIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg width="1em" height="1em" viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g fill="none" fillRule="evenodd">
				<path d="M-1-2h24v24H-1z" />
				<path
					d="M20 0H2C.9 0 0 .9 0 2v12c0 1.1.9 2 2 2h7v2H8c-.55 0-1 .45-1 1s.45 1 1 1h6c.55 0 1-.45 1-1s-.45-1-1-1h-1v-2h7c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zm-1 14H3c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1z"
					fill="#1D1D1D"
				/>
			</g>
		</svg>
	);
}

export default DesktopIcon;
