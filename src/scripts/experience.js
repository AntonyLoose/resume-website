import { generate_random_star, apply_gravity } from "./stars.js";

const container = document.getElementById("experiences-root");
const tick_increment = 50;
const max_stars = 60;
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
		10,
		30,
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
		}
	)
	stars.push(star);
	container.appendChild(star.element);
}

// EMAILS
function show_references() {
	const auslan_ref = document.getElementById("auslan-ref");
	const auslan_text_content = "ka<span class='spam-protection'>Seriously, the fact that I need to do this says a lot about the world</span>lin.stefan<!-- 123stopspam -->ov@mona<!-- 123stopspam -->sh.edu ";
	auslan_ref.innerHTML = auslan_text_content;
	auslan_ref.className = "subscript marginless";

	const ilearn_ref = document.getElementById("ilearn-ref");
	const ilearn_text_content = "devmym<!-- 123stopspam -->ai<span class='spam-protection'>No, go away</span>l1@gm<!-- 123stopspam -->ail.com";
	ilearn_ref.innerHTML = ilearn_text_content;
	ilearn_ref.className = "subscript marginless";

	const intake_ref = document.getElementById("intake_ref");
	const intake_text_conent = "nabeeb2<!-- 123stopspam -->000@g<span class='spam-protection'>Nice try buddy</span>mai<!-- 123stopspam -->l.com";
	intake_ref.innerHTML = intake_text_conent;
	intake_ref.className = "subscript marginless";

	const woolies_ref = document.getElementById("woolies_ref");
	const woolies_text_content = "042<!-- 123stopspam -->6 16<span class='spam-protection'>No, I don't want you messaging my ex-manager saying this website is out of date, thanks and goodbye.</span>9 41<!-- 123stopspam -->7";
	woolies_ref.innerHTML = woolies_text_content;
	woolies_ref.className = "subscript marginless";
}

const show_refs_button = document.getElementById("show-references");
show_refs_button.onclick = show_references;
