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
