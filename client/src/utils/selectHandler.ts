import { isEmpty } from "./util-func";

const handlingClassSelector = (fn, $target, selectors) => {
	if (isEmpty($target)) return;
	selectors.forEach((selector) => {
		$target.classList[fn](selector);
	});
};

export function addClassSelector($target, ...selectors) {
	handlingClassSelector('add', $target, selectors);
}

export function removeClassSelector($target, ...selectors) {
	handlingClassSelector('remove', $target, selectors);
}

export function toggleClassSelector($target, ...selectors) {
	handlingClassSelector('toggle', $target, selectors);
}
