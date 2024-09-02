import { generate_random_star, apply_gravity } from "./stars.js";

const container = document.getElementById("education-content");
const tick_increment = 50;
const max_stars = 20;
let stars = [];
let elapsed = 0;
let mouse_y = 0;
let mouse_x = 0;
let mouse_mass = -5000;

document.addEventListener("mousemove", event => {
	mouse_x = event.clientX + window.scrollX;
	mouse_y = event.clientY + window.scrollY;
})
document.addEventListener("mousedown", _ => mouse_mass = mouse_mass * -1);

setInterval(() => {
	stars.forEach(star => {
		apply_gravity(
			star,
			mouse_x,
			mouse_y,
			mouse_mass
		)
		star.tick();
	});
	if (elapsed % 500 == 0) {
		generate_star_and_add_to_dom();
		generate_star_and_add_to_dom();
		generate_star_and_add_to_dom();
	}
	elapsed += tick_increment;
}, tick_increment)


function generate_star_and_add_to_dom() {
	if (stars.length >= max_stars) {
		return;
	}
	const star = generate_random_star(
		30,
		50,
		2000,
		3000,
		2000,
		3000,
		4000,
		10000,
		tick_increment,
		(star) => {
			stars = stars.filter(s => s != star);
			container.removeChild(star.element);
		},
		0.4,
		30,
		1.1,
		1
	)
	stars.push(star);
	container.appendChild(star.element);
}
