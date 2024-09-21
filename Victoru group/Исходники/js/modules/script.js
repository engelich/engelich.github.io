"use strict";

document.addEventListener('DOMContentLoaded', function() {

  // Открыть burger меню
  document.querySelector('body').addEventListener('click', function(event){
    if(!event.target.closest('.header__main-burger')){
      document.querySelector('.header__main-burger').classList.remove('active');
      document.querySelector('.header__main-nav').classList.remove('active');
    }
  });
  
  // Закрыть burger меню в любом месте 
  document.querySelector('.header__main-burger').addEventListener('click', function(){
    this.classList.toggle('active');
    if(this.classList.contains('active')){
        document.querySelector('.header__main-nav').classList.add('active');
    } else {
        document.querySelector('.header__main-nav').classList.remove('active');
    }
  });
  
  // Открыть закрыть PopUp

  function popoUpOpen(){
    document.querySelector('.popup').classList.add('active'); 
    document.querySelector('body').classList.add('active'); 
  }

  function popoUpClose(){
    document.querySelector('.popup').classList.remove('active');
      document.querySelector('body').classList.remove('active');
  }

  document.querySelector('.header__main-right-button').addEventListener('click', function(){
    popoUpOpen()
  })
  document.querySelector('.header__main-phone').addEventListener('click', function(){
    popoUpOpen()
  })
  document.querySelector('.popup__item-close').addEventListener('click', function(){
    popoUpClose()
  })

  document.querySelector('body').addEventListener('click', function(event){
    if(!event.target.closest('.popup__item') && !event.target.closest('.header__main-right-button')&& !event.target.closest('.header__main-phone') && !event.target.closest('button')){
      popoUpClose()
    }
  });
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(){
      popoUpOpen()
    })
  })
  
  

  // Открыть поиск
  document.querySelector('body').addEventListener('click', function(event){
    if(event.target.closest('.header__main-right-search')){
      document.querySelector('.header__main-right-search').classList.add('active')
    }else{
      document.querySelector('.header__main-right-search').classList.remove('active')
     
    }
    
  })

  // Выбор цвета
  
  document.querySelectorAll('.product__image-color span').forEach(elem => {
    elem.addEventListener('click', function() {
      document.querySelectorAll('.product__image-color span').forEach(el => {
        el.classList.remove('active');
      });
      this.classList.add('active');
    });
  });


  // Переключатель 

  document.querySelectorAll('.product__filter-checkbox').forEach(elem => {
    elem.addEventListener('change', function(event) {
      const priceElement = this.closest('.product__filter-item').querySelector('.product__filter-price-num');
      const sumElement = document.querySelector('.product__filter-sum-num');
      const price = parseFloat(priceElement.textContent.replace(/\s+/g, '')); 
      let currentSum = parseFloat(sumElement.textContent.replace(/\s+/g, '')); 
      const priceNorm = Math.abs(price)
      if (this.checked) {
        currentSum += priceNorm;
        priceElement.classList.add('active');
      } else {
        currentSum -= priceNorm;
        priceElement.classList.remove('active'); 
      }
      sumElement.textContent = currentSum.toLocaleString() ; 

    });
  });


// Калькуляор расчета кедита 
    const contributionInput = document.getElementById('input-contribution');
    const creditInput = document.getElementById('input-credit');
    const contributionValue = document.querySelector('.calculator__credit-filter-range-sum-num');
    const resultValue = document.querySelector('.calculator__result-counter-inner-result-num');
    const ageValue = document.querySelector('.calculator__credit-filter-range-sum-num-age');
    const contributionRange = document.querySelector('.calculator__credit-castom-input-one');
    const creditRange = document.querySelector('.calculator__credit-castom-input-two');
    const totalCreditSpan = document.querySelector('.calculator__credit-result-sum-title');

    // Функция для расчета ежемесячного платежа
    function calculatePayment() {
        const contribution = parseFloat(contributionInput.value);
        const creditTerm = parseInt(creditInput.value) * 12; // переводим в месяцы
        const totalCredit = parseFloat(totalCreditSpan.textContent.replace(/\s/g, '')); 

        // Простой расчет 
        const loanAmount = totalCredit - contribution;
        const monthlyPayment = loanAmount / creditTerm; 

        // Обновляем значения в интерфейсе
        contributionValue.value = contribution.toLocaleString() + ' ₽';
        resultValue.textContent = Math.round(monthlyPayment).toLocaleString() + ' ₽';
       
    }

    // Обработчики для кнопок "плюс" и "минус"
    const minusButton = document.querySelector('.calculator__result-counter-inner-button--minus');
    const plusButton = document.querySelector('.calculator__result-counter-inner-button--pluse');

    minusButton.addEventListener('click', function(event) {
        let currentTerm = parseInt(ageValue.value.replace(/\s/g, ''));
        if (currentTerm > 1) {
            currentTerm -= 1;
            ageValue.value = currentTerm + ' лет';
            creditInput.value = currentTerm; // Синхронизация с creditInput
            calculatePayment(); // Пересчет платежа
        }
        event.stopPropagation();

    });

    plusButton.addEventListener('click', function(event) {
      let currentTerm = parseInt(ageValue.value.replace(/\s/g, ''));
      if (currentTerm < 8) { // Ограничение на увеличение
          currentTerm += 1;
          ageValue.value = currentTerm + ' лет';
          creditInput.value = currentTerm; // Синхронизация с creditInput
          calculatePayment(); // Пересчет платежа
          event.stopPropagation();
      }
  });
   

    // Функция для синхронизации значений ползунка и инпутов
    function syncContribution() {
        contributionInput.value = contributionRange.value;
        calculatePayment();
    }

    function syncCredit() {
        creditInput.value = creditRange.value;
        ageValue.value = creditRange.value + ' лет'; 
        calculatePayment();
    }

    // Слушатели событий для обновления значений
    contributionInput.addEventListener('input', calculatePayment);
    creditInput.addEventListener('input', calculatePayment);
    contributionRange.addEventListener('input', syncContribution);
    creditRange.addEventListener('input', syncCredit);

    calculatePayment();

    // Обновление цвета ползунка
    function updateSliderFill(input) {
        let value = ((input.value - input.min) / (input.max - input.min)) * 100; 
        input.style.background = `-webkit-linear-gradient(left, var(--colorSecondary) 0%, var(--colorSecondary) ${value}%, rgb(100, 105, 112) ${value}%, rgb(100, 105, 112) 100%)`;
    }

    // Range one
    contributionRange.addEventListener('input', function() {
        updateSliderFill(contributionRange);
        calculatePayment();
    });

    // Range two
    creditRange.addEventListener('input', function() {
        updateSliderFill(creditRange);
        let value = creditRange.value;

        // Преобразуем значение в годы и месяцы
        let years = Math.floor(value / 12);
        let months = value % 12;

        // Выводим значение
        calculatePayment();
    });
    syncCredit()
    calculatePayment();
    updateSliderFill(contributionRange);
    updateSliderFill(creditRange);

  //Swiper

  const swiper = new Swiper('.swiper-container', {
    loop: true,
    slidesPerView: 4,
    spaceBetween: 12,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 1.1,
        spaceBetween: 12,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 12,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 12,
      },
      1300: {
        slidesPerView: 4,
        spaceBetween: 12,
      },
    },
    on: {
        slideChange: function () {
            
            const activeIndex = this.realIndex; 

            
            const wraps = document.querySelectorAll('.comparison__elem-item-list');

            wraps.forEach((wrap) => {
                const element = wrap.querySelectorAll('.comparison__element');
                
              
                element.forEach((el, index) => {
                    el.style.display = 'none'; 
                    if (index === activeIndex) {
                        el.style.display = 'flex'; 
                    }
                });
            });
        },
    },
});

document.querySelectorAll('.comparison__elem-item-list').forEach((wrap) => {
    const element = wrap.querySelectorAll('.comparison__element');
    element[0].style.display = 'flex'; 
});

// Активные комплектации работают по data атрибутам значениями true, false

document.querySelectorAll('.comparison__element-list-detal-elem').forEach(function(element) {
  if (element.getAttribute('data-detal') === 'false') {
      const spans = element.getElementsByTagName('span');
      if (spans.length > 1) {
          spans[1].style.opacity='0' 
         
      }
      element.classList.add('active')
  }
});


});


