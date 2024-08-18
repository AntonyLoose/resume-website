import { check_intersecting_rectangles } from "./index.js";

class Star {
	#_opacity = 0;
	#_max_opacity = 0.6;
	#_vx = 0;
	#_vy = 0;
	#_ax = 0;
	#_ay = 0;
	#_friction = 2.0;
	#_elapsed_time = 0;
	#_faded_in = false;
	#_x;
	#_y;
	#_width;
	#_height;
	#_element;
	#_life_time;
	#_tick_inrement;
	#_fade_in_time;
	#_fade_out_time;
	#_on_death;

	constructor(x, y, width, height, life_time, fade_in_time, fade_out_time, tick_increment, on_death) {
		this.#_x = x;
		this.#_y = y;
		this.#_width = width;
		this.#_height = height;
		this.#_tick_inrement = tick_increment;
		this.#_life_time = life_time;
		this.#_fade_in_time = fade_in_time;
		this.#_fade_out_time = fade_out_time;
		this.#_on_death = on_death;
		this.#_element = document.createElement("div");
		this.#_element.className = "star";
		this.#_element.style.top = y + "px";
		this.#_element.style.left = x + "px";
		this.#_element.style.width = width + "px";
		this.#_element.style.height = height + "px";
		this.#_element.style.opacity = "0";
		container.appendChild(this.#_element);
	}

	get x() {
		return this.#_x;
	}

	get y() {
		return this.#_y;
	}

	get width() {
		return this.#_width;
	}

	get height() {
		return this.#_height;
	}

	get element() {
		return this.#_element;
	}

	#_fade_in() {
		this.#_opacity += this.#_tick_inrement / this.#_fade_in_time;
		this.#_element.style.opacity = (this.#_opacity).toString();
		if (this.#_opacity >= this.#_max_opacity) {
			this.#_faded_in = true;
			this.#_opacity = this.#_max_opacity;
		}
	}

	#_fade_out() {
		this.#_opacity -= this.#_tick_inrement / this.#_fade_out_time;
		this.#_element.style.opacity = (this.#_opacity).toString();
		if (this.#_opacity <= 0) {
			this.#_opacity = 0;
			this.#_on_death();
		}
	}

	#_update_xy() {
		this.#_x += this.#_vx;
		this.#_y += this.#_vy;
		this.#_element.style.left = this.#_x + "px";
		this.#_element.style.top = this.#_y + "px";
	}

	accelerate(ax, ay) {
		this.#_ax += ax;
		this.#_ay += ay;
		this.#_vx = this.#_vx + ax * this.#_tick_inrement;
		this.#_vy = this.#_vy + ay * this.#_tick_inrement;
	}

	deaccelerate(ax, ay) {
		// TODO: make this work properly
		this.#_ax = ax;
		this.#_ay = ay;
		this.#_vx = this.#_vx - ax * this.#_tick_inrement;
		this.#_vy = this.#_vy - ay * this.#_tick_inrement;
	}

	tick() {
		if (!this.#_faded_in) {
			this.#_fade_in();
		} else if (this.#_elapsed_time - this.#_fade_in_time >= this.#_life_time) {
			this.#_fade_out();
		}
		this.#_ax = this.#_ax / this.#_friction;
		this.#_ay = this.#_ay / this.#_friction;
		this.deaccelerate(this.#_ax, this.#_ay);
		this.#_update_xy();
		this.#_elapsed_time += this.#_tick_inrement;
	}
}

function generate_random_star() {
	const doc_width = document.documentElement.offsetWidth;
	const doc_height = document.documentElement.offsetHeight;
	const x = doc_width * Math.random();
	const y = doc_height * Math.random();
	const size = 10 + 20 * Math.random();
	const fade_in_time = 2000 + Math.random() * 1000;
	const fade_out_time = 2000 + Math.random() * 1000;
	const life_time = 3000 + Math.random() * 1000;
	if (stars.length < max_stars) {
		const star = new Star(
			x,
			y,
			size,
			size,
			life_time,
			fade_in_time,
			fade_out_time,
			tick_increment,
			() => {
				stars = stars.filter(s => star != s);
				container.removeChild(star.element);
			}
		);
		container.appendChild(star.element);
		stars.push(star);
	}
}

function apply_gravity(star, mouse_x, mouse_y, mouse_box_size, multiplier = 1) {
	const mouse_x1 = mouse_x - mouse_box_size / 2;
	const mouse_y1 = mouse_y - mouse_box_size / 2;
	const mouse_x2 = mouse_x + mouse_box_size / 2;
	const mouse_y2 = mouse_y + mouse_box_size / 2;
	const star_x1 = star.x - star.width / 2;
	const star_y1 = star.y - star.height / 2;
	const star_x2 = star.x + star.width / 2;
	const star_y2 = star.y + star.height / 2;
	const intersecting = check_intersecting_rectangles(
		star_x1,
		star_y1,
		star_x2,
		star_y2,
		mouse_x1,
		mouse_y1,
		mouse_x2,
		mouse_y2,
	)
	const x_diff = star.x - mouse_x;
	const y_diff = star.y - mouse_y;
	const ax = x_diff / (mouse_box_size / 2);
	const ay = y_diff / (mouse_box_size / 2);
	if (intersecting) {
		star.accelerate(ax * multiplier, ay * multiplier);
		star.element.style.backgroundColor = "red";
	} else {
		star.element.style.backgroundColor = "white";
	}
}

let mouse_y = 0;
let mouse_x = 0;
const mouse_box_size = 200;
const test_rect = document.createElement("div");
test_rect.style.border = "2px solid red";
test_rect.style.height = mouse_box_size + "px";
test_rect.style.width = mouse_box_size + "px";
test_rect.style.position = "absolute";
document.documentElement.appendChild(test_rect);
document.addEventListener("mousemove", event => {
	mouse_x = event.clientX;
	mouse_y = event.clientY;
})

const tick_increment = 10;
const container = document.getElementById("experiences-root");
const max_stars = 30;
let stars = [];
let elapsed = 0;

setInterval(() => {
	test_rect.style.top = mouse_y - mouse_box_size / 2 + "px";
	test_rect.style.left = mouse_x - mouse_box_size / 2 + "px";
	stars.forEach(star => {
		apply_gravity(
			star,
			mouse_x,
			mouse_y,
			mouse_box_size
		)
		star.tick();
	});
	if (elapsed % 200 == 0) {
		generate_random_star();
	}
	elapsed += tick_increment;
}, tick_increment)

// setInterval(() => {
// const mouse_box_size = 200;
// stars = stars.map(star => {
// const intersecting = check_intersecting_rectangles(
// star_x1,
// star_y1,
// star_x2,
// star_y2,
// mouse_x1,
// mouse_y1,
// mouse_x2,
// mouse_y2,
// )
// if (intersecting) {
// const { x_shift, y_shift } = calculate_xy_shift(
// mouse_x,
// mouse_y,
// star.x,
// star.y,
// mouse_box_size,
// mouse_box_size
// );
// star.x = star.x + x_shift;
// star.y = star.y + y_shift;
// star.element.style.top = star.y + "px";
// star.element.style.left = star.x + "px";
// }
// return star;
// })
// }, 10);
