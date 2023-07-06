
const mobileNavButton = document.querySelector('.mobile-nav-button');
const mobileNavIcon = document.querySelector('.mobile-nav-button__icon');
const mobileNav = document.querySelector('.mobile-nav');

function calcFullScrollHeight() {
	return Math.max(
		document.body.scrollHeight,
		document.documentElement.scrollHeight,
		document.body.offsetHeight,
		document.documentElement.offsetHeight,
		document.body.clientHeight,
		document.documentElement.clientHeight
	);
}

const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows()
		);
	},
};


// Включение мобильной навигации
// Клик по кнопке
mobileNavButton.addEventListener('click', function () {
	// Анимация кнопки
	mobileNavIcon.classList.toggle('active');
	
	// Анимация появления навигации
	mobileNav.classList.toggle('visible');
	// Запрещаем скролл внутри страницы
	document.body.classList.toggle('no-scroll');

	// Решаем проблему с прыгающим контентом, когда исчезает скролл
	if ( calcFullScrollHeight() > window.innerHeight && !isMobile.any()) {
		document.body.classList.toggle('fix-scroll-jump');
	}

});

mobileNav.addEventListener('click', function () {
	turnOffMobileNav();
});

// Закрываем моб навигацию при клике на ссылки внутрии нее
mobileNav.querySelectorAll('a').forEach(function (link) {
	link.addEventListener('click', function () {
		turnOffMobileNav();
	});
});


// Функция выключения мобильной навигации
function turnOffMobileNav() {
	// Выключаем иконку
	if (mobileNavIcon.classList.contains('active')) {
		mobileNavIcon.classList.remove('active');
	}

    //Выключаем расположение кнопки после нажатия
    if (mobileNavButton.classList.contains('move')) {
		mobileNavButton.classList.remove('move');
	}

	// Выключаем панель с меню
	if (mobileNav.classList.contains('visible')) {
		mobileNav.classList.remove('visible');
	}

	// Выключаем замок на скролл для всей страницы
	if (document.body.classList.contains('no-scroll')) {
		document.body.classList.remove('no-scroll');
	}

	// Выключаем класс fix-scroll-jump
	if (document.body.classList.contains('fix-scroll-jump')) {
		document.body.classList.remove('fix-scroll-jump');
	}
}

// slider //

$(function () {
	const galleryThumbs = new Swiper(".gallery-thumbs", {
	  centeredSlides: true,
	  centeredSlidesBounds: true, 
	  direction: "vertical",
	  spaceBetween: 7,
	  slidesPerView: 5,
	  freeMode: false,
	  watchSlidesVisibility: true,
	  watchSlidesProgress: true,
	  watchOverflow: true,
	});

	const galleryTop = new Swiper(".gallery-top", {
	  direction: "horizontal",
	  
	  keyboard: {
		enabled: true,
	  },
	  thumbs: {
		swiper: galleryThumbs
	  }
	});
	galleryTop.on("slideChangeTransitionStart", function () {
	  galleryThumbs.slideTo(galleryTop.activeIndex);
	});
	galleryThumbs.on("transitionStart", function () {
	  galleryTop.slideTo(galleryThumbs.activeIndex);
	});
  });

  // Счетчик

  let counter = document.querySelector('.count');
  let increase = document.querySelector('.increase');
  let decrease = document.querySelector('.decrease');


  increase.addEventListener('click', function() {
	 counter.innerHTML++
  })

  decrease.addEventListener('click', function() {
	if(counter.innerHTML > 1) {
		counter.innerHTML--
	}
 })

 // Модалка

 const modal = document.querySelector('.modal');
 const btnModal = document.querySelector('.card__counter-modal-link');
 const formModal = document.querySelector('.modal__form')

 btnModal.addEventListener('click', () => {
	modal.classList.toggle('active');
	
 })

modal.addEventListener('click', (e) => {
	e.target.classList.remove('active');
})

formModal.addEventListener('submit', (e) => {
	e.preventDefault()
	modal.classList.remove('active');
})



