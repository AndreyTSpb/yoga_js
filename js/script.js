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

    function countDown(){
        /**
         * Плейс холдеры для счетчика  
         */
        let ph_hour = document.querySelector('#timer .hours'),
            ph_min  = document.querySelector('#timer .minutes'),
            ph_sec  = document.querySelector('#timer .seconds');

        /**
         * Заполняем значения переменных из плейсхолдеров с сайта,
         * преобразуем их к числу
         * и конвертируем это значение в Unix TimeStamps путем банального сложения умножения
         */    
        let hour = +ph_hour.textContent,
            min  = +ph_min.textContent, 
            sec  = +ph_sec.textContent, 
            timestamp = hour*60*60 + min*60 + sec; 
        
        /**
         * Проверяем если время больше одной секунды то запускаем счетчик иначе показываем нули
         */
        if(timestamp > 1){
            /**
             * Запускаем цыкл счетчика
             * Конец цыкла как счетчик достигнет timestamp
             */
            for (let i = 0; i < timestamp; i++) {
                /**
                 * С каждой итерацией цикла 
                 * задержку умножаем на счетчик цикла 
                 * и прибавляем одну милисекунду
                 */
                setTimeout(function () {
                    sec--;
                    if(sec < 0 ){
                        sec +=60;
                        min --;
                        if(min < 0){
                            min += 60;
                            hour --;
                            if(hour<0){
                                // если отнимать больше нечего то нули и прирываем выполнение функции
                                ph_hour.textContent = "00";
                                ph_min.textContent  = "00";
                                ph_sec.textContent  = "00";
                                return;
                            }
                        }
                    }
                    /**
                     * Заполняем плейсхолдеры полученными значениями
                     */
                    ph_sec.textContent  = (sec < 10) ? "0" + sec : sec;
                    ph_min.textContent  = (min < 10) ? "0" + min : min;
                    ph_hour.textContent = (hour < 10) ? "0"+hour : hour;
                }, 1000 * i + 1, i);
            }
        }else{
            ph_hour.textContent = "00";
            ph_min.textContent  = "00";
            ph_sec.textContent  = "00";
        }
    }


    /**
     * Запуск все функций
     */

    //Отображаем блоки по очереди
    showBlock('info-header', 'info-header-tab', 'info-tabcontent');
    countDown();
});