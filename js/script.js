window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');


    function AddHide(key){
        tabContent[key].classList.add("hide");
        tabContent[key].classList.remove("show");
    }

    function AddShow(key){
        tabContent[key].classList.add("show");
        tabContent[key].classList.remove("hide");
    }

    function ShowHideTabs(){
        tab.forEach(function(item, key){
            if(item.classList.contains('action')){
                AddShow(key);
            }else{
                AddHide(key);
            }
            item.addEventListener('click', function(){
                tab.forEach(function(i, k){
                    if(k != key){
                        AddHide(k);
                        i[k].classList.remove('action');
                    }
                });
                AddShow(key);
                item.classList.add('action');
            });
        });
    }

    ShowHideTabs();
    
});