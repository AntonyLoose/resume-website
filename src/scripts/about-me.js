import { fade_img_in, fade_img_out, getHexColor, getRGBAColor } from "./index.js";
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
	"TypeScript/JavaScript",
	"HTML",
	"CSS",
	"THREE.js",
	"React",
	"Next.js"
]
const hidden_skills = [
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
];
const profile_pic = document.getElementById("profile-pic");
const skills_list = document.getElementById("skills-list");
const lis = skills.map(skill => create_li_element(skill));
const hidden_lis = hidden_skills.map(skill => create_li_element(skill));
const see_more = document.createElement("li");
see_more.textContent = "...See more";
see_more.className = "link";
const see_less = document.createElement("li");
see_less.className = "link";
see_less.textContent = "...See less";

lis.forEach(li => skills_list.appendChild(li));
skills_list.appendChild(see_more);

let profile_pic_hidden = false;
let animating = false;
profile_pic.onclick = () => {
	if (animating) return;
	if (!profile_pic_hidden) {
		animating = true;
		fade_img_out(profile_pic, () => {
			profile_pic_hidden = true;
			animating = false;
		}, 10, 0.02, 0.05);
	} else {
		animating = true;
		fade_img_in(profile_pic, () => {
			profile_pic_hidden = false;
			animating = false;
		}, 10, 0.02, 0.05);
	}
}

see_more.onclick = () => {
	skills_list.removeChild(see_more);
	hidden_lis.forEach(li => skills_list.appendChild(li));
	skills_list.appendChild(see_less);
}

see_less.onclick = () => {
	skills_list.removeChild(see_less);
	hidden_lis.forEach(li => skills_list.removeChild(li));
	skills_list.appendChild(see_more);
}


// CHART
const ctx = document.getElementById('chart');
const data = {
	labels: skills,
	datasets: [{
		label: "Skills Breakdown",
		data: [95, 80, 90, 70, 75, 65],
		backgroundColor: getRGBAColor("--primary", 0.3),
		borderColor: getRGBAColor("--primary")
	}]
}

const options = {
	scales: {
		r: {
			suggestedMin: 0,
			angleLines: {
				color: getRGBAColor("--subscript", 0.6)
			},
			grid: {
				color: getRGBAColor("--subscript", 0.2)
			},
			pointLabels: {
				font: {
					size: 13
				},
				color: getHexColor("--subscript"),
			},
			ticks: {
				callback: (value, index) => "",
				font: {
					size: 13,
				},
				color: getHexColor("--subscript"),
				backdropColor: "transparent"
			}
		}
	},
	plugins: {
		legend: {
			display: false
		}
	}
}

const config = {
	type: "radar",
	data: data,
	options: options
}

new Chart(ctx, config);

// STARS
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

