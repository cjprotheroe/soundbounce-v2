/**
 * Created by paulbarrass on 23/04/2017.
 */
import Sequelize from 'sequelize';
import secrets from '../../../config/secrets/secrets';
import _debug from 'debug';
const debug = _debug('soundbounce:data:sequelize');

const options = {
	logging: (...msg) => debug(msg), 
	host: secrets.postgres.host,
	dialect: "postgres",
	define: { paranoid: true },
	dialectOptions: {
		options: {
			requestTimeout: 5
		}
	},
};
const sequelize = new Sequelize(secrets.postgres.database, secrets.postgres.username, secrets.postgres.password, options);

export default sequelize;

