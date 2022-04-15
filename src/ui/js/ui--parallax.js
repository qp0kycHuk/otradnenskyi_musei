const attr = {
	cover: 'data-parallax',
	speed: 'data-speed',
	parent: 'data-parallax-parent',

}

let flag = true;

function parallax() {
	if (!flag) return;
	flag = false;

	const parallaxItems = document.querySelectorAll('[' + attr.cover + ']');

	for (const i in parallaxItems) {
		if (!parallaxItems.hasOwnProperty(i)) return;

		const elem = parallaxItems[i];
		console.log(elem);

		const parent = elem.closest('[' + attr.parent + ']') || elem.parentElement;
		const parentOffset = parent.getBoundingClientRect().top;
		const coof = -parentOffset;
		const speed = elem.getAttribute(attr.speed);



		requestAnimationFrame(() => {
			if (elem.getAttribute(attr.cover) == 'x') {
				elem.style.transform = 'translateX(' + coof * speed + 'px)';
			} else {
				elem.style.transform = 'translateY(' + coof * speed + 'px)';
			}
			flag = true;
		})


	}
}

const init = () => {
	parallax();
	window.addEventListener('scroll', parallax);

}

const destroy = () => {
	window.removeEventListener('scroll', parallax);
}


export default { init, destroy }