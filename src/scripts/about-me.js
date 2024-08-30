import { generate_random_star, apply_gravity } from "./stars.js";

function generate_star_and_add_to_dom(tick_increment) {
	if (stars.length >= max_stars) {
		return;
	}
	const star = generate_random_star(
		10,
		15,
		2000,
		3000,
		2000,
		3000,
		3000,
		4000,
		tick_increment,
		(star) => {
			stars = stars.filter(s => s != star);
			container.removeChild(star.element);
		},
		0.5,
		50,
		1.2,
		4
	)
	stars.push(star);
	container.appendChild(star.element);
}

function create_li_element(text) {
	const li = document.createElement("li");
	li.textContent = text;
	return li;
}

const skills = [
	"npm",
	"Webpack",
	"express",
	"nginx",
	"Linux",
	"AWS",
	"Docker",
	"Kubernetes",
	"SQL",
	"Python",
	"c",
	"Arduino",
	"Swift"
]
const skills_list = document.getElementById("skills-list");
const lis = skills.map(skill => create_li_element(skill));
const see_more = document.getElementById("see-more");
const see_less = document.createElement("li");
see_less.className = "link";
see_less.textContent = "...See less";

see_more.onclick = () => {
	skills_list.removeChild(see_more);
	lis.forEach(li => skills_list.appendChild(li));
	skills_list.appendChild(see_less);
}

see_less.onclick = () => {
	skills_list.removeChild(see_less);
	lis.forEach(li => skills_list.removeChild(li));
	skills_list.appendChild(see_more);
}


const container = document.getElementById("about-content");
const tick_increment = 50;
const max_stars = 30;
let stars = [];
let elapsed = 0;
let mouse_y = 0;
let mouse_x = 0;
let mouse_mass = -3000;

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
		generate_star_and_add_to_dom(tick_increment);
		generate_star_and_add_to_dom(tick_increment);
		generate_star_and_add_to_dom(tick_increment);
	}
	elapsed += tick_increment;
}, tick_increment)

// TODO: setup charts js
