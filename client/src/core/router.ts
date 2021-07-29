import Calendar from '../pages/calendar';
import Home from '../pages/home';
import Statistics from '../pages/statistics';

const pathToRegex = (path) =>
	new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');

const navigateTo = (url, props = null) => {
	history.pushState({url}, null , url); // props는 popstate시 자연스럽게 비워진다!
	router();
};

const router = () => {
	const routes = [
		{ path: '/home', view: Home },
		{ path: '/calendar', view: Calendar },
		{ path: '/statistics', view: Statistics },
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
	// $content.scrollTop = 0;
	$content.innerHTML = '';
	new match.route.view($content);
};

export { router, navigateTo };
