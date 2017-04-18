// ------------------------------------
// Constants
// ------------------------------------
export const SPOTIFY_AUTH_INIT = 'SPOTIFY_AUTH_INIT';

const defaultSpotifyState = {
	isFetching: false,
	accessToken: null,
	refreshToken: null,
	isLoggedIn: false
};

export const spotifyAuthInit = ({accessToken, refreshToken}) => ({
	type: SPOTIFY_AUTH_INIT,
	payload: {accessToken, refreshToken}
});

export const actions = {
	spotifyAuthInit
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
	[SPOTIFY_AUTH_INIT]: (state, {payload}) => ({
		...state,
		accessToken: payload.accessToken,
		refreshToken: payload.refreshToken
	})
};

// ------------------------------------
// Reducer
// ------------------------------------

export default function currentUserReducer(state = defaultSpotifyState, action) {
	const handler = ACTION_HANDLERS[action.type];
	return handler ? handler(state, action) : state;
}
