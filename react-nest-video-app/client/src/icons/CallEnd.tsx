import * as React from 'react';

function CallEnd(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg width="1em" height="1em" viewBox="0 0 24 9" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g fill="none" fillRule="evenodd">
				<path d="M0-7h24v24H0z" />
				<path
					d="M4.51 8.48l2-1.59c.48-.38.76-.96.76-1.57v-2.6c3.02-.98 6.29-.99 9.32 0v2.61c0 .61.28 1.19.76 1.57l1.99 1.58c.8.63 1.94.57 2.66-.15l1.22-1.22c.8-.8.8-2.13-.05-2.88C16.76-1.43 7.1-1.43.69 4.23c-.85.75-.85 2.08-.05 2.88l1.22 1.22c.71.72 1.85.78 2.65.15z"
					fill="#1D1D1D"
				/>
			</g>
		</svg>
	);
}

export default CallEnd;
