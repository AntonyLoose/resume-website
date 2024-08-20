import { check_intersecting_rectangles } from "./index.js";

// TODO: review this
class Star {
	#_opacity = 0;
	#_max_opacity = 0.6;
	#_vx = 0;
	#_vy = 0;
	#_terminal_velocity = 50;
	// this is sort of a cut off, otherwise the increment just keeps getting smaller and smaller
	#_min_velocity = 0.2;
	#_friction = 1.2;
	#_elapsed_time = 0;
	#_faded_in = false;
	#_x;
	#_y;
	#_width;
	#_height;
	#_mass;
	#_density = 2;
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
		this.#_mass = width * height * this.#_density;
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

	get mass() {
		return this.#_mass;
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

	// update_vx & update_vy attempt to simulate air resistance (also without a terminal velocity these stars can
	// get extremely fast)
	#_update_vx(vx) {
		if (vx < this.#_min_velocity && vx > -this.#_min_velocity) {
			this.#_vx = 0;
		} else if (vx > this.#_terminal_velocity) {
			this.#_vx = this.#_terminal_velocity;
		} else if (vx < -this.#_terminal_velocity) {
			this.#_vx = -this.#_terminal_velocity
		} else {
			this.#_vx = vx;
		}
	}

	#_update_vy(vy) {
		if (vy < this.#_min_velocity && vy > -this.#_min_velocity) {
			this.#_vy = 0;
		} else if (vy > this.#_terminal_velocity) {
			this.#_vy = this.#_terminal_velocity;
		} else if (vy < -this.#_terminal_velocity) {
			this.#_vy = -this.#_terminal_velocity
		} else {
			this.#_vy = vy;
		}
	}

	#_update_xy() {
		this.#_x += this.#_vx;
		this.#_y += this.#_vy;
		this.#_element.style.left = this.#_x + "px";
		this.#_element.style.top = this.#_y + "px";
	}

	// A very wack implementation of friction
	// TODO: a better implementation of friction
	#_apply_friction() {
		const fx = this.#_vx / (1 + this.#_friction);
		const fy = this.#_vy / (1 + this.#_friction);
		// this ensures that we stop in a reasonable time
		const constant_speed_loss_due_to_friction = this.#_friction / 10;
		this.apply_force(-fx, -fy);
		if (this.#_vx != 0) {
			this.#_update_vx(this.#_vx -= (this.#_vx > 0 ? constant_speed_loss_due_to_friction : -constant_speed_loss_due_to_friction));
		}
		if (this.#_vy != 0) {
			this.#_update_vy(this.#_vy -= (this.#_vy > 0 ? constant_speed_loss_due_to_friction : -constant_speed_loss_due_to_friction));
		}
	}

	apply_force(fx, fy) {
		const ax = fx / this.#_mass;
		const ay = fy / this.#_mass;
		this.#_update_vx(this.#_vx + ax * this.#_tick_inrement);
		this.#_update_vy(this.#_vy + ay * this.#_tick_inrement);
	}

	tick() {
		if (!this.#_faded_in) {
			this.#_fade_in();
		} else if (this.#_elapsed_time - this.#_fade_in_time >= this.#_life_time) {
			this.#_fade_out();
		}
		this.#_element.style.filter = `blur(${(Math.abs(this.#_vx) + Math.abs(this.#_vy)) / 12}px)`;
		this.#_apply_friction();
		this.#_update_xy();
		this.#_elapsed_time += this.#_tick_inrement;
	}
}

// TODO: review this
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

// TODO: review this
function apply_gravity(
	star,
	mouse_x,
	mouse_y,
	mouse_mass = 5000,
	max_gravitational_force = 50,
	gravitational_constant = 0.067
) {
	const rx = mouse_x - star.x;
	const ry = mouse_y - star.y;
	const r = Math.sqrt(rx ** 2 + ry ** 2);
	let fx = (gravitational_constant * mouse_mass * star.mass * rx) / (r ** 3);
	let fy = (gravitational_constant * mouse_mass * star.mass * ry) / (r ** 3);

	fx = fx >= 0 ? Math.min(fx, max_gravitational_force) : Math.max(fx, -max_gravitational_force);
	fy = fy >= 0 ? Math.min(fy, max_gravitational_force) : Math.max(fy, -max_gravitational_force);

	star.apply_force(fx, fy);
}

// TODO: clean this up
let mouse_y = 0;
let mouse_x = 0;
document.addEventListener("mousemove", event => {
	mouse_x = event.clientX;
	mouse_y = event.clientY;
})

// TODO: clean this up
const tick_increment = 50;
const container = document.getElementById("experiences-root");
const max_stars = 30;
let stars = [];
let elapsed = 0;

setInterval(() => {
	stars.forEach(star => {
		apply_gravity(
			star,
			mouse_x,
			mouse_y,
			-5000
		)
		star.tick();
	});
	if (elapsed % 500 == 0) {
		generate_random_star();
		generate_random_star();
		generate_random_star();
	}
	elapsed += tick_increment;
}, tick_increment)
