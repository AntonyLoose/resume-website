export function fade_img_in(img, on_complete, interval = 10, increment = 0.005, initial_opacity = 0) {
	let opacity = initial_opacity;
	const id = setInterval(() => {
		opacity += increment;
		if (opacity >= 1) {
			img.style.opacity = "1";
			on_complete && on_complete();
			clearInterval(id);
		}
		img.style.opacity = `${opacity}`;
	}, interval)
}

export function fade_img_out(img, on_complete, interval = 10, increment = 0.005, min_opacity = 0) {
	let opacity = 1;
	const id = setInterval(() => {
		opacity -= increment;
		if (opacity <= min_opacity) {
			img.style.opacity = min_opacity.toString();
			on_complete && on_complete();
			clearInterval(id);
		}
		img.style.opacity = `${opacity}`;
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
export function getHexColor(cssVarName) {
	const rootStyle = getComputedStyle(document.documentElement);
	const colorValue = rootStyle.getPropertyValue(cssVarName).trim();
	return colorValue;
}

export function hexToRGBA(hex, opacity = 1) {
	hex = hex.replace(/^#/, '');
	let r = parseInt(hex.substring(0, 2), 16);
	let g = parseInt(hex.substring(2, 4), 16);
	let b = parseInt(hex.substring(4, 6), 16);
	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export function getRGBAColor(cssVarName, opacity = 1) {
	const hex = getHexColor(cssVarName);
	return hexToRGBA(hex, opacity);
}
