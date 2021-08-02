import Calendar from '../pages/calendar';
import Home from '../pages/home';
import Statistics from '../pages/statistics';
import Callback from '../pages/callback';

import { checkLogin } from "../utils/cookie";


const pathToRegex = (path) =>
	new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');

const navigateTo = (url, props = null) => {
	history.pushState({ url }, null, url);
	router();
};

const router = () => {
	const routes = [
		{ path: '/home', view: Home },
		{ path: '/calendar', view: Calendar },
		{ path: '/statistics', view: Statistics },
		{ path: '/callback', view: Callback},
	];	

	let match = routes.map((route) => {
		return {
			route: route,
			result: location.pathname.match(pathToRegex(route.path)),
		};
	}).find((potentialMatch) => potentialMatch.result !== null)

	if (!match) {
		match = {
			route: routes[0],
			result: [location.pathname],
		};
	}

	const $content = document.querySelector('.content');
	$content.innerHTML = '';



	if (checkLogin(true)) {
		new match.route.view($content);
	} else if (match.route.path === '/home') {
		new Home($content);
	} else if (match.route.path === '/callback') { 
		new Callback($content);
	}else{
		history.pushState(null, null, '/home');
		new Home($content);
	}
};

export { router, navigateTo };
