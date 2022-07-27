$(document).ready(function() {
	//  ========= Variables =========
	var body = $('body'),
			html = body.width(),
			timer; // for disable scroll
	// ========= =========== =========== ===========

	// Disable hover effect when client scrolles the page
	$(window).on('scroll',function() {
		clearTimeout(timer);
		if(!body.hasClass('disable-hover')) {
			body.addClass('disable-hover');
		}

		timer = setTimeout(function() {
			body.removeClass('disable-hover');
		}, 200);
	});

	$('.js-open-mobile-menu-btn').on('click', function(e) {
		e.preventDefault();

		$('html').toggleClass('is-fixed');
		$(this).toggleClass('is-active');
		$('.js-nav').toggleClass('is-opened');
	});


	$('.form-input').on('focus', function() {
		var value = $(this).val();

		if($(this).hasClass('is-error')) {
			$(this).removeClass('is-error');
		}

		if (!$(this).val() || $(this).val() == "") {
			$(this).next('.form-input-placeholder').css('display', 'none');
		}

	});

	$('.form-input').on('blur', function() {
		var value = $(this).val();

		if ($(this).val() || $(this).val() !== "") {
			$(this).next('.form-input-placeholder').css('display', 'none');
		} else {
			$(this).next('.form-input-placeholder').css('display', 'block');
		}

	});

	$('.js-select').on('click', function(e) {
		$(this).toggleClass('is-active');
	});

	$('.js-select .form-select-option').on('click', function(e) {
		var currencyLogo = $(this).attr('data-currency-logo');
		var currencyAbbr = $(this).attr('data-currency-abbr');
		var currencyTitle = $(this).attr('data-currency-name');
		var currencyKey = $(this).attr('data-currency-key');

		var select = $(this).parents('.js-select');

		select.find('.js-select-input').val(currencyKey).trigger('change');
		select.find('.js-select-choiced .exchange-heading__currency-logo img').attr('src', currencyLogo);
		select.find('.js-select-choiced .main-currency__abbr').html(currencyAbbr);
		select.find('.js-select-choiced .main-currency__title').html(currencyTitle);
	});

	$(document).mouseup(function (e) {
		var select = $('.js-select');
		if (select.has(e.target).length === 0){
			select.removeClass('is-active');
		}
	});


	$('.js-open-requrest-form-btn').on('click', function(e) {
		e.preventDefault();
		$('html').addClass('is-fixed');
		$('.js-request-popup').fadeIn(300);
	});

	$('.js-close-popup-btn').on('click', function(e) {
		e.preventDefault();
		$('html').removeClass('is-fixed');
		$('.js-popup').fadeOut(300);
	});

	$('.popup__overflow').on('click', function(e) {
		e.stopPropagation();

		var content = $(this).find('.popup__body');

		if(!content.is(e.target) && content.has(e.target).length === 0) {
			$('html').removeClass('is-fixed');
			$('.js-popup').fadeOut(300);
		}

	});

	$('.js-form').submit(function(e) {
		e.preventDefault();

		var that = $(this);
			inputs = that.find('.js-required-input'),
			flag = true;

		// Validate
		$(inputs).each(function() {
			if(!$(this).val() || $(this).val() == "") {
				$(this).addClass('is-error');
				flag = false;
			}
		});

		if(!flag) {return false;}

		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: that.serialize()
		}).done(function() {
			$('.js-request-popup').fadeOut(300);
			$('.js-thanks').fadeIn(300);
			$('html').addClass('is-fixed');
			that.trigger("reset");
			setTimeout(function() {
				$('.js-thanks .thanks-loader').addClass('is-loaded');
				$('.js-thanks .thanks-block-content__text').css('opacity', 1);
			}, 2000);
		});

	});




});
