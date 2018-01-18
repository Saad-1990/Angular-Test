jQuery(document).ready(function($){
	if( $('.cd-form').length > 0 ) {
		//set some form parameters
		var device = checkWindowWidth(),
			tableFinalWidth = ( device == 'mobile') ? $(window).width()*0.9 : 210,
			tableFinalHeight = ( device == 'mobile' ) ? 93 : 255;
			formMaxWidth = 900,
			formMaxHeight = 650,
			animating =  false; 

		//set animation duration/delay
		var	animationDuration = 800,
			delay = 200,
			backAnimationDuration = animationDuration - delay;

		//store DOM elements
		var formPopup = $('.cd-pricing'),
			coverLayer = $('.cd-overlay');

		//select a plan and open the signup form
		formPopup.on('click', 'a', function(event){
			event.preventDefault();
			triggerAnimation( $(this).parents('.cd-pricing-footer').parent('div'), coverLayer, true);
		});

		//close the signup form clicking the 'X' icon, the keyboard 'esc' or the cover layer
		$('.cd-form').on('click', '.cd-close', function(event){
			event.preventDefault();
			triggerAnimation( formPopup.find('.selected-table'), coverLayer, false);
		});
		$(document).keyup(function(event){
			if( event.which=='27' ) {
				triggerAnimation( formPopup.find('.selected-table'), coverLayer, false);
			}
		});
		coverLayer.on('click', function(event){
			event.preventDefault();
			triggerAnimation( formPopup.find('.selected-table'), coverLayer, false);
		});

		//show/hide credit card fields if user selected credit card as gateway
		$('.cd-payment-gateways').on('change', function(){
			($('#card').is(':checked')) 
				? $('.cd-credit-card').velocity("slideDown", { duration: 300 }) 
				: $('.cd-credit-card').velocity("slideUp", { duration: 300 });
		});

	}

	function triggerAnimation(table, layer, bool) {
		if( !animating ) {
			layer.toggleClass('is-visible', bool);
			animateForm(table, bool);
			table.toggleClass('selected-table', bool);
		}
	}

	function animateForm(table, animationType) {
		animating = true;

		var form = $('.cd-form'),
			formPlan = form.find()

		if( animationType ) {//open the form

			formPlan.html(table.html());

            //animate popout form - set initial width, hight and position - then animate them to their final values
			form.velocity(
			{
                'width': '50px',
                'height': '50px',
				'right': '30px',
				'bottom': '30px',
				'translateX': '0px',
				'translateY': '0px',
				'opacity': 1,
			}, 100, function(){
				table.addClass('empty-box');

				form.velocity(
				{
                    'width': '320px',
                    'height': '400px',
                    'right': '0',
                    'bottom': '0',
                    'translateX': '0px',
                    'translateY': '0px',
                    'opacity': 1,
				}, animationDuration, [ 400, 0 ], function(){
					animating = false;
					setTimeout(function(){
						form.children('form').addClass('is-scrollable');
					}, 100);
				}).addClass('is-visible');

			});
		} else {//close the form
			form.children('form').removeClass('is-scrollable');

			//animate plan info inside the form to its final dimension
			formPlan.velocity(
			{
                'width': '50px',
                'height': '50px',
                'right': '10px',
                'bottom': '10px',
                'translateX': '0px',
                'translateY': '0px',
                'opacity': 1,
			}, {
				duration: backAnimationDuration,
				easing: "easeInCubic",
				delay: '100',
			});

			//animate form to its final dimention/position
			form.velocity(
			{
                'width': '80px',
                'height': '80px',
                'right': '30px',
                'bottom': '30px',
                'opacity': '0',
			}, {
				duration: backAnimationDuration,
				easing: "easeOutCubic",
				delay: '100',
				complete: function(){
					table.removeClass('empty-box');
					form.velocity({
                        'translateX': '0px',
                        'translateY': '0px',
					}, 100).find('form').scrollTop(0);
					animating = false;
				}
			}).removeClass('is-visible');

		}
	}

	function checkWindowWidth() {
		var mq = window.getComputedStyle(document.querySelector('.cd-form'), '::before').getPropertyValue('content').replace(/"/g, '').replace(/'/g, '');
		return mq;
	}



	//evaluate form dimention/position
	function formWidth() {
		return ( formMaxWidth <= $(window).width()*0.9) ? formMaxWidth : $(window).width()*0.9;
	}
	function formHeight() {
		return ( formMaxHeight <= $(window).height()*0.9) ? formMaxHeight : $(window).height()*0.9;
	}
	function formTop(formHeight) {
		return ($(window).height() - formHeight)/2;
	}
	function formLeft(formWidth) {
		return ($(window).width() - formWidth)/2;
	}

});