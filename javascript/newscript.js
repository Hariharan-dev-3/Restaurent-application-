document.addEventListener('DOMContentLoaded',()=>{
    const navbar=document.querySelector('.navbar');
    const menu=document.querySelector('.hamburger');
    const closeBtn=document.querySelector('.Close')

    const listBox=document.querySelector('.box');

    menu.addEventListener("click",()=>{
        listBox.style.display="flex";
        listBox.style.transition="0.7s ease";

    })

    closeBtn.addEventListener("click",()=>{
        listBox.style.display="none";
        listBox.style.transition="0.7s ease";
    })


        // window.addEventListener('scroll',()=>{
        //     let navheight=navbar.offsetHeight;
        //     let scrollheight=window.scrollY;
        //     let displayStatus = window.getComputedStyle(menu).display;
            

        //     console.log('navbar height',navheight);
        //     console.log('scroll height',scrollheight);
        //      console.log('status',displayStatus);

        //     if(scrollheight>navheight){
        //             menu.style.display="block";
        //     }
        //     else{
        //         menu.style.display="none";
        //     }
        // })

})

