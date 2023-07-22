$(document).ready(function () {
	"use strict"; // start of use strict


	/*==============================
	Player
	==============================*/
	$('.player__btn').on('click', function() {
		$(this).toggleClass('player__btn--active');
		$('.player').toggleClass('player--active');
	});

	const controls = `
	<div class="plyr__controls">
		<div class="plyr__actions">
			<button type="button" class="plyr__control plyr__control--prev">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path d="M13 8.76844L19.0966 4.30838C20.3991 3.41122 21.9998 4.57895 21.9998 6.42632L21.9998 17.5737C21.9998 19.4211 20.3991 20.5888 19.0966 19.6916L13 15.2316" stroke="#1C274C" stroke-width="1.5"/>
					<path d="M2.92136 10.1468C1.69288 10.9545 1.69288 13.0455 2.92135 13.8532L10.3388 18.7302C11.5327 19.5152 13 18.4934 13 16.877L13 7.12303C13 5.50658 11.5327 4.48482 10.3388 5.26983L2.92136 10.1468Z" stroke="#1C274C" stroke-width="1.5"/>
				</svg>
			</button>

			<button type="button" class="plyr__control" data-plyr="play">
				<svg class="icon--pressed" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path d="M16,2a3,3,0,0,0-3,3V19a3,3,0,0,0,6,0V5A3,3,0,0,0,16,2Zm1,17a1,1,0,0,1-2,0V5a1,1,0,0,1,2,0ZM8,2A3,3,0,0,0,5,5V19a3,3,0,0,0,6,0V5A3,3,0,0,0,8,2ZM9,19a1,1,0,0,1-2,0V5A1,1,0,0,1,9,5Z"></path>
				</svg>
				<svg class="icon--not-pressed" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path xmlns="http://www.w3.org/2000/svg" d="M20.4086 9.35258C22.5305 10.5065 22.5305 13.4935 20.4086 14.6474L7.59662 21.6145C5.53435 22.736 3 21.2763 3 18.9671L3 5.0329C3 2.72368 5.53435 1.26402 7.59661 2.38548L20.4086 9.35258Z" />
				</svg>
			</button>

			<button type="button" class="plyr__control plyr__control--next">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path d="M10.9998 8.76844L4.90312 4.30838C3.60064 3.41122 2 4.57895 2 6.42632L2 17.5737C2 19.4211 3.60065 20.5888 4.90313 19.6916L10.9998 15.2316" stroke="#1C274C" stroke-width="1.5"/>
					<path d="M21.0786 10.1468C22.3071 10.9545 22.3071 13.0455 21.0786 13.8532L13.6612 18.7302C12.4673 19.5152 11 18.4934 11 16.877L11 7.12303C11 5.50658 12.4673 4.48482 13.6612 5.26983L21.0786 10.1468Z" stroke="#1C274C" stroke-width="1.5"/>
				</svg>
			</button>
		</div>

		<div class="plyr__wrap">
			<div class="plyr__progress">
				<input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek">
				<progress class="plyr__progress__buffer" min="0" max="100" value="0">% buffered</progress>
				<span role="tooltip" class="plyr__tooltip">00:00</span>
			</div>

			<div class="plyr__time plyr__time--current" aria-label="Current time">00:00</div>
		</div>

		<div class="plyr__wrap">
			<button type="button" class="plyr__control" aria-label="Mute" data-plyr="mute">
				<svg class="icon--pressed" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.43,4.1a1,1,0,0,0-1,.12L6.65,8H3A1,1,0,0,0,2,9v6a1,1,0,0,0,1,1H6.65l4.73,3.78A1,1,0,0,0,12,20a.91052799FA07"/></svg>
				<svg class="icon--not-pressed" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.43,4.1a1,1,0,0,0-1,.12L6.65,8H3A1,1,0,0,0,2,9v6a1,1,0,0,0,1,1H6.65l4.73,3.78A1,1,0,0,0,12,20a.9101FFF26AF3"/></svg>
				<span class="label--pressed plyr__tooltip" role="tooltip">Unmute</span>
				<span class="label--not-pressed plyr__tooltip" role="tooltip">Mute</span>
			</button>

			<div class="plyr__volume">
				<input data-plyr="volume" type="range" min="0" max="1" step="0.05" value="1" autocomplete="off" aria-label="Volume">
			</div>

			<a href="release.html" class="plyr__control" aria-label="لیست پخش">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15,13H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Zm0-4H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"/></svg>
				<span class="plyr__tooltip" role="tooltip">لیست پخش</span>
			</a>
		</div>
	</div>
	
	
	`;
	var player = new Plyr('#audio', {
		controls,
		volume: 0.5,
	});


	var audio = $('#audio');

	player.on('play', event => {
		$('a[data-link].active, a[data-playlist].active').addClass('play');
		$('a[data-link].active, a[data-playlist].active').removeClass('pause');
	});

	player.on('pause', event => {
		$('a[data-link].active, a[data-playlist].active').removeClass('play');
		$('a[data-link].active, a[data-playlist].active').addClass('pause');
	});

	/* single */
	$('a[data-link]').on('click', function(e){
		e.preventDefault();
		let link = $(this);
		run(link, audio[0]);
	});

	function run(link, player){
		if ($(link).hasClass('play')) {
			$(link).removeClass('play');
			audio[0].pause();
			$(link).addClass('pause');
		}
		else if ($(link).hasClass('pause')) {
			$(link).removeClass('pause');
			audio[0].play();
			$(link).addClass('play');
		}
		else {
			$('a[data-link]').removeClass('active');
			$('a[data-link]').removeClass('pause');
			$('a[data-link]').removeClass('play');
			$(link).addClass('active');
			$(link).addClass('play');
			player.src = $(link).attr('href');

			let title = $(link).data('title');
			let artist = $(link).data('artist');
			let img = $(link).data('img');
			$('.player__title').text(title);
			$('.player__artist').text(artist);
			$('.player__cover img').attr('src', img);
			audio[0].load();
			audio[0].play();
		}
	}

	/*==============================
	Menu
	==============================*/
	$('.header__btn').on('click', function() {
		$(this).toggleClass('header__btn--active');
		$('.sidebar').toggleClass('sidebar--active');
	});

	$('.header__search .close, .header__action--search button').on('click', function() {
		$('.header__search').toggleClass('header__search--active');
	});

	/*==============================
	Home slider
	==============================*/
	$('.hero').owlCarousel({
		mouseDrag: true,
		touchDrag: true,
		dots: true,
		loop: true,
		autoplay: false,
		smartSpeed: 600,
		autoHeight: true,
		items: 1,
		responsive: {
			0 : {
				margin: 20,
			},
			576 : {
				margin: 20,
			},
			768 : {
				margin: 30,
			},
			1200 : {
				margin: 30,
			},
		}
	});

	/*==============================
	Carousel
	==============================*/
	$('.main__carousel--events').owlCarousel({
		mouseDrag: true,
		touchDrag: true,
		dots: true,
		loop: true,
		autoplay: false,
		smartSpeed: 600,
		margin: 20,
		autoHeight: true,
		responsive: {
			0 : {
				items: 1,
			},
			576 : {
				items: 2,
			},
			768 : {
				items: 2,
				margin: 30,
			},
			992 : {
				items: 3,
				margin: 30,
			},
			1200 : {
				items: 3,
				margin: 30,
				mouseDrag: false,
			},
		}
	});

	$('.main__carousel--artists').owlCarousel({
		mouseDrag: true,
		touchDrag: true,
		dots: true,
		loop: true,
		autoplay: false,
		smartSpeed: 600,
		margin: 20,
		autoHeight: true,
		responsive: {
			0 : {
				items: 2,
			},
			576 : {
				items: 3,
			},
			768 : {
				items: 4,
				margin: 30,
			},
			992 : {
				items: 6,
				margin: 30,
			},
			1200 : {
				items: 6,
				margin: 30,
			},
		}
	});

	$('.main__carousel--store').owlCarousel({
		mouseDrag: true,
		touchDrag: true,
		dots: true,
		loop: true,
		autoplay: false,
		smartSpeed: 600,
		margin: 20,
		autoHeight: true,
		responsive: {
			0 : {
				items: 2,
			},
			576 : {
				items: 3,
			},
			768 : {
				items: 3,
				margin: 30,
			},
			992 : {
				items: 4,
				margin: 30,
			},
			1200 : {
				items: 5,
				margin: 30,
			},
		}
	});

	$('.main__carousel--podcasts').owlCarousel({
		mouseDrag: true,
		touchDrag: true,
		dots: true,
		loop: true,
		autoplay: false,
		smartSpeed: 600,
		margin: 20,
		autoHeight: true,
		responsive: {
			0 : {
				items: 1,
			},
			576 : {
				items: 2,
			},
			768 : {
				items: 2,
				margin: 30,
			},
			992 : {
				items: 3,
				margin: 30,
			},
			1200 : {
				items: 3,
				margin: 30,
				mouseDrag: false,
			},
		}
	});

	/*==============================
	Navigation
	==============================*/
	$('.main__nav--prev').on('click', function() {
		var carouselId = $(this).attr('data-nav');
		$(carouselId).trigger('prev.owl.carousel');
	});
	$('.main__nav--next').on('click', function() {
		var carouselId = $(this).attr('data-nav');
		$(carouselId).trigger('next.owl.carousel');
	});

	/*==============================
	Partners
	==============================*/
	$('.partners').owlCarousel({
		mouseDrag: false,
		touchDrag: false,
		dots: false,
		loop: true,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		smartSpeed: 600,
		margin: 20,
		responsive : {
			0 : {
				items: 2,
			},
			576 : {
				items: 3,
				margin: 20,
			},
			768 : {
				items: 4,
				margin: 30,
			},
			992 : {
				items: 4,
				margin: 30,
			},
			1200 : {
				items: 6,
				margin: 30,
			},
			1900 : {
				items: 8,
				margin: 30,
			},
		}
	});

	/*==============================
	Product
	==============================*/
	$('.store-item__carousel').owlCarousel({
		mouseDrag: true,
		touchDrag: true,
		dots: true,
		loop: true,
		autoplay: false,
		smartSpeed: 600,
		autoHeight: true,
		items: 1,
		margin: 20,
	});

	/*==============================
	Filter
	==============================*/
	$('.filter__item-menu li').each( function() {
		$(this).attr('data-value', $(this).text().toLowerCase());
	});

	$('.filter__item-menu li').on('click', function() {
		var text = $(this).text();
		var item = $(this);
		var id = item.closest('.filter').attr('id');
		$('#'+id).find('.filter__item-btn input').val(text);
	});

	/*==============================
	Modal
	==============================*/
	$('.open-video, .open-map').magnificPopup({
		disableOn: 0,
		fixedContentPos: true,
		type: 'iframe',
		preloader: false,
		removalDelay: 300,
		mainClass: 'mfp-fade',
	});

	$('.open-modal').magnificPopup({
		fixedContentPos: true,
		fixedBgPos: true,
		overflowY: 'auto',
		type: 'inline',
		preloader: false,
		focus: '#username',
		modal: false,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in',
	});

	$('.modal__close').on('click', function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});

	/*==============================
	Select
	==============================*/
	$('.main__select').select2({
		minimumResultsForSearch: Infinity
	});

	/*==============================
	Scrollbar
	==============================*/
	var Scrollbar = window.Scrollbar;

	$('.sidebar__nav-link[data-toggle="collapse"]').on('click', function() {
		if ($('.sidebar__menu--scroll').length) {
			Scrollbar.init(document.querySelector('.sidebar__menu--scroll'), {
				damping: 0.1,
				renderByPixels: true,
				alwaysShowTracks: true,
				continuousScrolling: false,
			});
		}
	});

	if ($('.dashbox__table-scroll').length) {
		Scrollbar.init(document.querySelector('.dashbox__table-scroll'), {
			damping: 0.1,
			renderByPixels: true,
			alwaysShowTracks: true,
			continuousScrolling: true
		});
	}

	if ($('.cart__table-scroll').length) {
		Scrollbar.init(document.querySelector('.cart__table-scroll'), {
			damping: 0.1,
			renderByPixels: true,
			alwaysShowTracks: true,
			continuousScrolling: true
		});
	}

	if ($('.dashbox__scroll').length) {
		Scrollbar.init(document.querySelector('.dashbox__scroll'), {
			damping: 0.1,
			renderByPixels: true,
			alwaysShowTracks: true,
			continuousScrolling: true
		});
	}

	if ($('.release__list').length) {
		Scrollbar.init(document.querySelector('.release__list'), {
			damping: 0.1,
			renderByPixels: true,
			alwaysShowTracks: true,
			continuousScrolling: true
		});
	}

	/*==============================
	Bg
	==============================*/
	$('.hero__slide, .event').each( function() {
		if ($(this).attr("data-bg")){
			$(this).css({
				'background': 'url(' + $(this).data('bg') + ')',
				'background-position': 'center center',
				'background-repeat': 'no-repeat',
				'background-size': 'cover'
			});
		}
	});

	/*==============================
	Inputmask
	==============================*/
	$('.stats__form input').inputmask('99-99-99-99');


	/* playlist */
	if ($('.main__list--playlist').length) {
		var current = 0;
		var playlist = $('.main__list--playlist');
		var tracks = playlist.find('li a[data-playlist]');
		var len = tracks.length;

		playlist.find('a[data-playlist]').on('click', function(e){
			e.preventDefault();
			let link = $(this);
			current = link.parent().index();
			run2(link, audio[0]);
		});

		player.on('ended', event => {
			let link = $('.single-item__cover.play');
			current++;
			if (current == len) {
				current = 0;
				link = playlist.find('a[data-playlist]')[0];
			} else {
				link = playlist.find('a[data-playlist]')[current];
			}
			run2($(link),audio[0]);
		});

		$('.plyr__control--prev').on('click', function(e){
			let link = $('.single-item__cover.play');
			current--;
			if (current == -1) {
				current = len - 1;
				link = playlist.find('a[data-playlist]')[current];
			} else {
				link = playlist.find('a[data-playlist]')[current];
			}
			run2($(link),audio[0]);
		});

		$('.plyr__control--next').on('click', function(e){
			let link = $('.single-item__cover.play');
			current++;
			if (current == len) {
				current = 0;
				link = playlist.find('a[data-playlist]')[0];
			} else {
				link = playlist.find('a[data-playlist]')[current];
			}
			run2($(link),audio[0]);
		});

		function run2(link, player){
			if ($(link).hasClass('play')) {
				$(link).removeClass('play');
				audio[0].pause();
				$(link).addClass('pause');
			}
			else if ($(link).hasClass('pause')) {
				$(link).removeClass('pause');
				audio[0].play();
				$(link).addClass('play');
			}
			else {
				$('a[data-playlist]').removeClass('active');
				$('a[data-playlist]').removeClass('pause');
				$('a[data-playlist]').removeClass('play');
				$(link).addClass('active');
				$(link).addClass('play');
				player.src = $(link).attr('href');

				let title = $(link).data('title');
				let artist = $(link).data('artist');
				let img = $(link).data('img');
				$('.player__title').text(title);
				$('.player__artist').text(artist);
				$('.player__cover img').attr('src', img);
				audio[0].load();
				audio[0].play();
			}
		}
	}
});