window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');


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
        if(target && target.classList.contains('info-header-tab')){
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
    
});