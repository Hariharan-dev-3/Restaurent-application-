const menu=document.querySelector('.hamburger');
const closeBtn=document.querySelector('.Close');
const imageContainer=document.querySelector('.imageContainer');
const menuitem=document.querySelector('.item');
const listBox=document.querySelector('.box');


document.addEventListener('DOMContentLoaded',()=>{
        menu.addEventListener("click",()=>{
        listBox.style.display="flex";
        listBox.style.transition="0.7s ease";

    })

    closeBtn.addEventListener("click",()=>{
        listBox.style.display="none";
        listBox.style.transition="0.7s ease";
    })

    const imagefiles=["malai kofta.jpg","butterchic.jpg","chana-masala.jpg"];


    imagefiles.forEach(im=>{
        const image=document.createElement('img');
        image.src=`../Images/${im}`;
        image.alt="image";
        image.setAttribute('class','offerImage');
        imageContainer.appendChild(image);
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

