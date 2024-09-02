import { fade_element_in, fade_element_out } from "./index.js";

// Constants
const landing_background_images = [
	"../public/images/melbourne-night.jpg",
	"../public/images/woodside.jpg",
	"../public/images/murray-river-night.jpeg",
]

// Functions
function swap_current_image() {
	const container = document.getElementById("background-container");
	const curr_background_img = document.getElementById("background");
	const id = curr_background_img.src;
	const curr_background_index = landing_background_images.findIndex(img_src => id.includes(img_src.slice(2)));
	const next_background_index = curr_background_index + 1 >= landing_background_images.length ? 0 : curr_background_index + 1;
	const new_background_img = document.createElement("img");
	curr_background_img.style.position = "absoulte";
	new_background_img.src = landing_background_images[next_background_index];
	new_background_img.className = "bg-img";
	new_background_img.style.opacity = "0";
	new_background_img.style.position = "absolute";
	container.appendChild(new_background_img);

	fade_element_out(curr_background_img, () => {
		container.removeChild(curr_background_img);
	}, 10, 0.005);
	fade_element_in(new_background_img, () => {
		new_background_img.id = "background";
	}, 10, 0.005);
}

// Other
setInterval(() => {
	swap_current_image();
}, 10000)
