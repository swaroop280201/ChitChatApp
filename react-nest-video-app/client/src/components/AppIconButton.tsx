import React from 'react';

interface Props {
	icon: any;
	title: string;
	backgroundColor?: string;
	onClick?: () => void;
}

const AppIconButton: React.FC<Props> = ({ icon, backgroundColor, title, onClick }) => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				marginRight: 10,
				marginLeft: 10
			}}
		>
			<div
				style={{
					backgroundColor:

							backgroundColor ? backgroundColor :
							'white',
					justifyContent: 'center',
					alignItems: 'center',
					display: 'flex',
					padding: 10,
					borderRadius: '50%',
					cursor: 'pointer'
				}}
				onClick={onClick}
			>
				{icon}
			</div>
			<h4>{title}</h4>
		</div>
	);
};

export default AppIconButton;
