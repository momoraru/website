// ------ menu waterfall scrolling interaction ----------

$(document).ready(function () {
	// Store each section's offset at the start
	let sections = $('article');
	let menuItems = $('.menu--nav a');

	$(window).on('scroll', function () {
		let scrollPos = $(window).scrollTop();

		// Iterate over each project section to check its position
		sections.each(function () {
			let section = $(this);
			let sectionTop = section.offset().top; // Adjust for any padding

			// Check if the current scroll position is in this section
			if (
				scrollPos >= sectionTop &&
				scrollPos < sectionTop + section.outerHeight()
			) {
				let currentId = section.attr('id');

				// Remove 'active' class from all menu items, then add it to the current
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
	});
});
