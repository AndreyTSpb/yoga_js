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

        info.addEventListener('click', function(event){
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
    



    /**
     * Запуск все функций
     */

    //Отображаем блоки по очереди
    showBlock('info-header', 'info-header-tab', 'info-tabcontent');
    setTimer('timer','2020-01-20');
});