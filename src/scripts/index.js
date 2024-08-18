// Functions
export function fade_img_in(img, on_complete, interval = 10, increment = 0.005) {
	let opacity = 0;
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

export function fade_img_out(img, on_complete, interval = 10, increment = 0.005) {
	let opacity = 1;
	const id = setInterval(() => {
		opacity -= increment;
		if (opacity <= 0) {
			img.style.opacity = "0";
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
