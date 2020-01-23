window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    function showBlock(menu, menuItems, tabs){
        let tab = document.querySelectorAll("."+menuItems),
            info = document.querySelector("."+menu),
            tabContent = document.querySelectorAll("."+tabs);


        function AddHide(key){
            for(let i = key; i < tabContent.length; i++){
                tabContent[i].classList.add("hide");
                tabContent[i].classList.remove("show");
            }
        }
        AddHide(1);

        function AddShow(key){
            if(tabContent[key].classList.contains('hide')){
                tabContent[key].classList.add("show");
                tabContent[key].classList.remove("hide");
            }
        }

        info.addEventListener('click', (event)=>{
            let target = event.target;
            //проверка действительно ли это меню табов
            if(target && target.classList.contains(menuItems)){
                //перебираем все табы и сравниваем с нажатым
                for(let i = 0; i < tab.length; i++){
                    //если совпало то скрыть все, но открыть нажатый
                    if(target == tab[i]){
                        AddHide(0);
                        AddShow(i);
                    }
                }
            }
        });
    }
    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }


    //COUNTDOWN

    /**
     * Преобразуем время полученное от пользователя или со страницы
     * в юниксовое время 
     */
    function getTime(endtime){
        /**
         * Получаем время для счетчика в секундах 
         */
        let t = (Date.parse(endtime) - Date.parse(new Date))/1000;
        /**
         * Получаем секунды минуты и часы до окончания счетчика
         */
        let sec = Math.floor(t % 60); // остаток от деления будут секундами
        // endtime разделить на 60 секунд что бы получить количество минут и потом еще раз разделитиь на 60 чтобы получить остаток
        let min = Math.floor((t/60) % 60);
        // endtime надо разделить на 3600 
        let hour = Math.floor(t/3600);
        /**
         * для получения дней 
         * let hour = Math.floor((endtime/3600) % 24);
         * let day = Math.floor(endtime/60*60*24);
         */
        /**
         * Возвращаем объект
         */
        return {
            'endtime': t,
            'hours': hour,
            'min': min,
            'sec': sec
        }
    }

    /**
     * Заполняем плейсхолдеры данными
     */
    function setTimer(id, deadline){
        /**
         * Плейс холдеры для счетчика  
         */
        let timer = document.getElementById(id),
            ph_hour = timer.querySelector('.hours'),
            ph_min  = timer.querySelector('.minutes'),
            ph_sec  = timer.querySelector('.seconds'),
            timerInterval = setInterval(updateClock,1000);

        //Обновление времени на странице
        function updateClock(){
            let t = getTime(deadline);
            ph_hour.textContent = (t.hours<10)?"0"+t.hours:t.hours;
            ph_min.textContent  = (t.min<10)?"0"+t.min:t.min;
            ph_sec.textContent  = (t.sec<10)?"0"+t.sec:t.sec;

            //прерываем таймер 
            if(t.endtime <= 0 ){
                clearInterval(timerInterval);
                // Ставим нули
                ph_hour.textContent = "00";
                ph_min.textContent  = "00";
                ph_sec.textContent  = "00";
            }
        }
    };


    //MODAL WINDOW "GET MORE"
    /*VERSION 1*/
    /**
     * Открытие модального окна
     * Аргумент это класс модалки, чтобы можно было вызывать универсально
     */
    function showModal(name_modal){
        /**
         * Получаем ссылку на модалку по ее классу.(находит первый элемент с таким классом на странице)
         */
        let modal = document.querySelector('#'+name_modal);

        /**
         * меняем значение дисплей на block
         */
        modal.style.display = 'block';

        /**
         * Получаем кнопку закрыть для этой модалки
         */
        let close = modal.querySelector('.popup-close');
        close.addEventListener('click', closeModal.bind(null, name_modal)); //передаем параметры в функцию без ее вызова
    }

    /**
     * Закрытие модального окна
     */
    function closeModal(name_modal){
        
        let modal = document.querySelector('#'+name_modal);
        modal.style.display = 'none';
    }

    /**
     * Обработка нажания кнопки для запуска модалки
     * param@ name_button
     */
    function btnShowModal(name_button){
        /**
         * Получаем все кнопки с указанным классом 
         */
        let btns = document.querySelectorAll('.'+name_button);
        /**
         * навешиваем слушателя для каждой кнопки в массиве
         */
        for(let btn of btns){
            btn.addEventListener('click', clikBtnModalShow);
        }

        function clikBtnModalShow(){
            let name_modal = this.getAttribute('data-modal');
            if(name_modal != null && name_modal.length > 0) showModal(name_modal);
        }
    }

    //btnShowModal('more');

    //SHOW MODAL VERSION 2

    let more = document.querySelector('.more'),
        descBtns = document.querySelectorAll('.description-btn'), 
        overlay = document.querySelector('.overlay'),
        close   = document.querySelector('.popup-close');

    /**
     * Показать модалку
     */
    function showModal2(){
            overlay.style.display = 'block';
            this.classList.add('more-splash'); //добавим красоты for button
            document.body.style.overflow = 'hidden'; //блокировка прокрутки страницы - включение
    }
    /**
     * Скрыть модалку
     */
    function closeModal2(){
        overlay.style.display = 'none';
        more.classList.remove('more-splash'); //добавим красоты for button
        document.body.style.overflow = ''; //блокировка прокрутки страницы - отключение
    }

    /**
     * Слушатель на кнопки подробней
     */
    for(let descBtn of descBtns){
        descBtn.addEventListener('click', showModal2);
    }

    /**
     * Слушатель на кнопку открывания модалки
     */
    more.addEventListener('click',showModal2);

    /**
     * Слушатель на кнопку закрыть модалку
     */
    close.addEventListener('click', closeModal2);



    /**
     * Запуск все функций
     */

    //Отображаем блоки по очереди
    showBlock('info-header', 'info-header-tab', 'info-tabcontent');
    setTimer('timer','2020-01-25');


    //FORM
    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Мы скоро свяжемся с Вами!',
        failure: 'Что-то пошло не так...'
    } 

    let forms = document.querySelectorAll('.contact-form-free'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');

    //add listener
    forms.forEach(function(form){

        form.addEventListener('submit',(event)=>{
            let input = form.getElementsByTagName('input');
            event.preventDefault();

            function sendForm(form){
                form.appendChild(statusMessage);
                return new Promise((resolve, reject) => {
                        //request
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                    let formData = new FormData(form); //Для получения всех данных из формы для отправки запроса
                    request.send(formData);

                    request.addEventListener('readystatechange',()=>{
                        if(request.readyState === 4){
                            if(request.status == 200){
                                resolve(message.success);
                            }else{
                                 reject(message.failure);
                            }
                        } 
                    });

                });
            }

            sendForm(form)
                .then(mess=>{
                    statusMessage.innerHTML = mess;
                    console.log('ok');
                })
                .catch(mess=>{
                    statusMessage.innerHTML = mess;
                    console.log('error');
                })
                .finally(()=>{
                    //clear input
                    for(let i =0; i<input.length; i++){
                        input[i].value = '';
                    }
                })

        });
    });
});