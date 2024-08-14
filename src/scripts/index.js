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
