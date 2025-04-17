// ------ menu waterfall scrolling interaction ----------

$(document).ready(function () {
	let sections = $('article');
	let menuItems = $('.menu--nav a');

	function handleScroll() {
		if ($(window).width() < 780) {
			// Disable scroll-based menu highlighting on mobile
			menuItems.removeClass('active first-active');
			return;
		}

		let scrollPos = $(window).scrollTop();

		sections.each(function () {
			let section = $(this);
			let sectionTop = section.offset().top;

			if (
				scrollPos >= sectionTop &&
				scrollPos < sectionTop + section.outerHeight()
			) {
				let currentId = section.attr('id');

				// Remove previous active states
				menuItems.removeClass('active first-active');

				// Get the current menu item
				let currentMenuItem = $('#nav a[href="#' + currentId + '"]');
				currentMenuItem.addClass('active');

				// If it's the first menu item, apply a different class
				if (menuItems.first().is(currentMenuItem)) {
					currentMenuItem.addClass('first-active');
				}
			}
		});
	}

	function handleMobileMenu() {
		if ($(window).width() < 780) {
			menuItems.off('click').on('click', function () {
				// Remove active class from all menu items
				menuItems.removeClass('active');

				// Immediately add the active class to the clicked item
				$(this).addClass('active');

				// Allow default behavior (smooth scrolling to section)
			});
		} else {
			menuItems.off('click'); // Remove mobile click event on larger screens
		}
	}

	// Initialize functions
	handleScroll();
	handleMobileMenu();

	// Listen for scroll and resize events
	$(window).on('scroll', handleScroll);
	$(window).on('resize', function () {
		handleScroll();
		handleMobileMenu();
	});
});