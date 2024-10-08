export function fade_element_in(element, on_complete, interval = 10, increment = 0.005, initial_opacity = 0) {
	let opacity = initial_opacity;
	const id = setInterval(() => {
		opacity += increment;
		if (opacity >= 1) {
			element.style.opacity = "1";
			on_complete && on_complete();
			clearInterval(id);
		}
		element.style.opacity = `${opacity}`;
	}, interval)
}

export function fade_multiple_elements_in(elements, on_complete, interval = 10, increment = 0.005, initial_opacity = 0) {
	let opacity = initial_opacity;
	const id = setInterval(() => {
		opacity += increment;
		if (opacity >= 1) {
			elements.forEach(element => element.style.opacity = "1");
			on_complete && on_complete();
			clearInterval(id);
		}
		elements.forEach(element => element.style.opacity = `${opacity}`);
	}, interval)
}

export function fade_element_out(element, on_complete, interval = 10, increment = 0.005, min_opacity = 0) {
	let opacity = 1;
	const id = setInterval(() => {
		opacity -= increment;
		if (opacity <= min_opacity) {
			element.style.opacity = min_opacity.toString();
			on_complete && on_complete();
			clearInterval(id);
		}
		element.style.opacity = `${opacity}`;
	}, interval)
}

export function fade_multiple_elements_out(elements, on_complete, interval = 10, increment = 0.005, min_opacity = 0) {
	let opacity = 1;
	const id = setInterval(() => {
		opacity -= increment;
		if (opacity <= min_opacity) {
			elements.forEach(element => element.style.opacity = min_opacity.toString());
			on_complete && on_complete();
			clearInterval(id);
		}
		elements.forEach(element => element.style.opacity = `${opacity}`);
	}, interval)
}


export function check_intersecting_rectangles(rect1_x1, rect1_y1, rect1_x2, rect1_y2, rect2_x1, rect2_y1, rect2_x2, rect2_y2) {
	const x_intersect = (rect1_x1 >= rect2_x1 && rect1_x1 <= rect2_x2) ||
		(rect1_x2 <= rect2_x2 && rect1_x2 >= rect2_x1)
	const y_intersect = (rect1_y1 >= rect2_y1 && rect1_y1 <= rect2_y2) ||
		(rect1_y2 <= rect2_y2 && rect1_y2 >= rect2_y1);
	return x_intersect && y_intersect;
}

/**
 * Expects the cssVar to be a hex value, this function does not validate
 */
export function get_hex_color(cssVarName) {
	const rootStyle = getComputedStyle(document.documentElement);
	const colorValue = rootStyle.getPropertyValue(cssVarName).trim();
	return colorValue;
}

export function hex_to_rgba(hex, opacity = 1) {
	hex = hex.replace(/^#/, '');
	let r = parseInt(hex.substring(0, 2), 16);
	let g = parseInt(hex.substring(2, 4), 16);
	let b = parseInt(hex.substring(4, 6), 16);
	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export function get_RGBA_color(cssVarName, opacity = 1) {
	const hex = get_hex_color(cssVarName);
	return hex_to_rgba(hex, opacity);
}

export class LuckyDip {

	#_items;
	#_original_items;

	constructor(items) {
		this.#_items = items;
		this.#_original_items = items;
	}

	draw() {
		const index = Math.floor(Math.random() * this.#_items.length);
		const item = this.#_items[index];
		if (this.#_items.length == 1) {
			this.#_items = this.#_original_items;
		}
		this.#_items = this.#_items.filter(i => item != i);
		return item;
	}

	remove(item) {
		this.#_items = this.#_items.filter(i => item != i);
	}
}
