//action Icons
import { ReactComponent as CancelIcon } from '../icons/card-icons/cancel.svg';
import { ReactComponent as DeleteIcon } from '../icons/card-icons/delete.svg';
import { ReactComponent as OptionsIcon } from '../icons/card-icons/options.svg';
import { ReactComponent as ApproveIcon } from '../icons/card-icons/approve.svg';

//Interaction Icons
import { ReactComponent as LikesIcon } from '../icons/card-icons/likes.svg';
import { ReactComponent as CommentsIcon } from '../icons/card-icons/comments.svg';
import { ReactComponent as SharesIcon } from '../icons/card-icons/shares.svg';
import { ReactComponent as ViewsIcon } from '../icons/card-icons/views.svg';
import { ReactComponent as RetweetsIcon } from '../icons/card-icons/retweets.svg';
import { ReactComponent as HeartIcon } from '../icons/card-icons/heart.svg';

export const interactionIconSorter = (channel) => {
	let iconPackage = [];
	if (channel === 'instagrambusiness' || channel === 'facebook') {
		iconPackage = [
			<LikesIcon />,
			<CommentsIcon />,
			<SharesIcon />,
			<ViewsIcon />,
		];
	} else if (channel === 'twitter') {
		iconPackage = [
			<HeartIcon />,
			<RetweetsIcon />,
			<CommentsIcon />,
			<ViewsIcon />,
		];
	}

	return iconPackage.map((item, index) => {
		return (
			<button className='interaction-icon' key={index}>
				{item}
				<p>0</p>
			</button>
		);
	});
};

export const actionsIconSorter = (status) => {
	let iconPackage = [];
	if (status === 0) {
		iconPackage = [<ApproveIcon />, <DeleteIcon />, <OptionsIcon />];
	}
	if (status === 1) {
		iconPackage = [<CancelIcon />, <DeleteIcon />, <OptionsIcon />];
	}
	if (status === 3) {
		iconPackage = [<DeleteIcon />, <OptionsIcon />];
	}

	return iconPackage.map((item, index) => {
		return (
			<button className='action-btn' key={index}>
				{item}
			</button>
		);
	});
};

export const dateLabel = (date) => {
	return new Date(date).toLocaleString('en-UK', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
};
