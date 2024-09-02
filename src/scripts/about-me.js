import { fade_element_in, fade_element_out, fade_multiple_elements_in, fade_multiple_elements_out, get_hex_color, get_RGBA_color, LuckyDip } from "./index.js";
import { generate_random_star, apply_gravity } from "./stars.js";

// SKILLS
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
const lis = skills.map(skill => create_li_element(skill));
const hidden_lis = hidden_skills.map(skill => create_li_element(skill));
const skills_list = document.getElementById("skills-list");
lis.forEach(li => skills_list.appendChild(li));

const see_more = document.createElement("li");
see_more.textContent = "...See more";
see_more.className = "link see-more";
skills_list.appendChild(see_more);
see_more.onclick = () => {
	skills_list.removeChild(see_more);
	hidden_lis.forEach(li => skills_list.appendChild(li));
	skills_list.appendChild(see_less);
}

const see_less = document.createElement("li");
see_less.className = "link see-more";
see_less.textContent = "...See less";
see_less.onclick = () => {
	skills_list.removeChild(see_less);
	hidden_lis.forEach(li => skills_list.removeChild(li));
	skills_list.appendChild(see_more);
}

// PROFILE
const profile_pic = document.getElementById("profile-pic");
const lowest_opacity = 0.05;
let profile_pic_hidden = false;
let animating = false;
profile_pic.onclick = () => {
	if (animating) return;
	if (!profile_pic_hidden) {
		animating = true;
		fade_element_out(profile_pic, () => {
			profile_pic_hidden = true;
			animating = false;
		}, 10, 0.02, lowest_opacity);
	} else {
		animating = true;
		fade_element_in(profile_pic, () => {
			profile_pic_hidden = false;
			animating = false;
		}, 10, 0.02, lowest_opacity);
	}
}

// FUN FACTS
function generate_fun_fact_elements(fun_fact) {
	const title = document.createElement("p");
	title.id = "fun-fact-title";
	title.className = "fun-fact-title marginless";
	title.textContent = fun_fact.title;

	const subscript = document.createElement("p")
	subscript.id = "fun-fact-subscript";
	subscript.className = "fun-fact-subscript subscript";
	subscript.textContent = fun_fact.subscript;

	return [title, subscript];
}

const fun_facts = [
	{
		title: "Mac Miller",
		subscript: "Favourite Artist"
	},
	{
		title: "Chess",
		subscript: "Favourite Boardgame (I'm not vey good 😅)"
	},
	{
		title: "#050F36",
		subscript: "My favourite colour"
	},
	{
		title: "Ceylon",
		subscript: "Favourite tea"
	},
	{
		title: "Deakin Hall",
		subscript: "I lived for 3 years in"
	},
	{
		title: "Adelaide",
		subscript: "I grew up in"
	}
]
const dip = new LuckyDip(fun_facts);
const first_fact = dip.draw();
const [first_title, first_subscript] = generate_fun_fact_elements(first_fact);
const fun_fact_container = document.getElementById("fun-fact-container");
fun_fact_container.appendChild(first_subscript);
fun_fact_container.appendChild(first_title);

function swap_fun_fact() {
	const next_fact = dip.draw();
	const [new_title, new_subscript] = generate_fun_fact_elements(next_fact);
	new_title.style.opacity = 0;
	new_subscript.style.opacity = 0;
	const title = document.getElementById("fun-fact-title");
	const subscript = document.getElementById("fun-fact-subscript");
	fade_multiple_elements_out([title, subscript], () => {
		fun_fact_container.removeChild(subscript);
		fun_fact_container.removeChild(title);
		fun_fact_container.appendChild(new_subscript);
		fun_fact_container.appendChild(new_title);
		fade_multiple_elements_in([new_title, new_subscript], () => setTimeout(swap_fun_fact, 5000), 10, 0.008);
	}, 10, 0.008);
}

setTimeout(swap_fun_fact, 5000);

// CHART
const ctx = document.getElementById('chart');
const data = {
	labels: skills,
	datasets: [{
		label: "Skills Breakdown",
		data: [95, 80, 90, 70, 75, 65],
		backgroundColor: get_RGBA_color("--primary", 0.3),
		borderColor: get_RGBA_color("--primary")
	}]
}

const options = {
	scales: {
		r: {
			suggestedMin: 0,
			angleLines: {
				color: get_RGBA_color("--subscript", 0.6)
			},
			grid: {
				color: get_RGBA_color("--subscript", 0.2)
			},
			pointLabels: {
				font: {
					size: 13
				},
				color: get_hex_color("--subscript"),
			},
			ticks: {
				callback: () => "",
				font: {
					size: 13,
				},
				color: get_hex_color("--subscript"),
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

new Chart(ctx, {
	type: "radar",
	data: data,
	options: options
});

// STARS
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

