import Calendar from '@pages/calendar';
import Home from '@pages/home';
import Statistics from '@pages/statistics';
import Callback from '@pages/callback';
import NotFound from '@pages/notfound';
import { checkLogin } from "@utils/cookie";

const pathToRegex = (path) =>
	new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');

const navigateTo = (url, props = null) => {

	history.pushState({ url }, null, url);
	router();
};

const router = (appbar?: any) => {
	
	const routes = [
		{ path: '/home', view: Home },
		{ path: '/calendar', view: Calendar },
		{ path: '/statistics', view: Statistics },
		{ path: '/callback', view: Callback},
		{ path: '/notfound', view: NotFound},
	];	

	let match = routes.map((route) => {
		return {
			route: route,
			result: location.pathname.match(pathToRegex(route.path)),
		};
	}).find((potentialMatch) => potentialMatch.result !== null)

	if (!match) {
		match = {
			route: routes[4],
			result: [location.pathname],
		};
	}

	const $content = document.querySelector('.content');
	$content.innerHTML = '';


	if (checkLogin(false)) {
		new match.route.view($content);
	} else if (match.route.path === '/home') {
		new Home($content);
	} else if (match.route.path === '/callback') {
		new Callback($content, { appbar });
	} else if (location.pathname==='/') { 
		history.pushState(null, null, '/home');
		new Home($content);
	}else{
		history.pushState(null, null, '/notfound');
		new NotFound($content);
	}
};

export { router, navigateTo };
