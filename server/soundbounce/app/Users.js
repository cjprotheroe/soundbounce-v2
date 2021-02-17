import shortid from 'shortid';
import _debug from 'debug';
const debug = _debug('soundbounce:users');
import {User, UserActivity, UserActivities} from '../data/schema';

export default class Users {
	loginUser({profile, accessToken, refreshToken}) {
		let {display_name} = profile;
		const {id, email, images} = profile;
		if (!display_name) {
			// use the username (id) as the display name if none provided
			display_name = id;
		}

		debug(`${display_name} (${id}) has authorized with spotify.`);

		const avatarUrl = (images && images.length) > 0
			? `${images[0].url}`
			: null;

		return User.findOrCreate({
			where: {id},
			defaults: {
				name: display_name,
				nickname: display_name,
				avatar: avatarUrl,
				email,
				profile
			}
		}).then((user)=> {
			UserActivity.create({
				userId: id,
				type: UserActivities.login
			});

			// update the access / refresh token in the db
			user[0].set('accessToken', accessToken);
			user[0].set('refreshToken', refreshToken);
			user[0].set('profile', profile);
			user[0].set('avatar', avatarUrl);

			return user[0].save();
		});
	}

	getUsersToSendWithRoomSync(userIds, roomId) {

		// todo: also get room status such as creator, admin based on roomId
		// currently getting listeners only
		return User
			.findAll({where: {id: userIds}, attributes: ['id', 'nickname', 'avatar']})
			.then(users =>
				users ? users.map(user => ({
					...user.get({plain: true}),
					tags: ['listener']
				})) : []);
		return []
	}
}

