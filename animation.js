const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!motionPreference.matches && "IntersectionObserver" in window) {
	document.documentElement.classList.add("js-motion");

	const introElements = document.querySelectorAll("header h1, header nav, #home");
	const heroElements = document.querySelectorAll("#home h2, #home p, #home a");
	const revealElements = document.querySelectorAll(
		"#about > *, #skills > h2, #skills li, #projects > div, #contact > *, footer > *"
	);

	introElements.forEach((element) => element.classList.add("intro-enter"));
	heroElements.forEach((element) => element.classList.add("hero-enter"));

	revealElements.forEach((element, index) => {
		element.classList.add("reveal");
		element.style.setProperty("--reveal-delay", `${(index % 5) * 70}ms`);
	});

	const revealObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				}
			});
		},
		{
			threshold: 0.15,
			rootMargin: "0px 0px -32px 0px",
		}
	);

	revealElements.forEach((element) => revealObserver.observe(element));
}

document.querySelectorAll("#skills li").forEach((item) => {
	item.addEventListener("click", () => {
		if (motionPreference.matches) return;

		item.animate(
			[
				{ transform: "translateY(0) scale(1)" },
				{ transform: "translateY(-5px) scale(1.02)", offset: 0.4 },
				{ transform: "translateY(1px) scale(0.99)", offset: 0.72 },
				{ transform: "translateY(0) scale(1)" },
			],
			{
				duration: 360,
				easing: "cubic-bezier(0.2, 0.7, 0.2, 1)",
			}
		);
	});
});
