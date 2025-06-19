const menu=document.querySelector('.hamburger');
const closeBtn=document.querySelector('.Close');
const imageContainer=document.querySelector('.imageContainer');
const menuitem=document.querySelector('.item');
const listBox=document.querySelector('.box');
const displayMenu=document.getElementById('items');


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

    const menuItemsList=[
        {
            foodImage:"biriyani.png",
            foodName:"Biriyani",
            FoodRate:"200.00",
            type:"non-veg"
        },
        {
            foodImage:"panneeer.png",
            foodName:"Panner",
            FoodRate:"150.00",
            type:"veg"
        }
    ]

    menuItemsList.forEach(items=>{
        const itemdiv=document.createElement('div').setAttribute('class','item');
        const MenuImage=document.createElement('img').setAttribute('class','logo');
        MenuImage.src=`../Image/${items.foodImage}`;
        const textdiv=document.createElement('div').setAttribute('class','texts');
        const Fname=document.createElement('p').setAttribute('class','foodName');
        Fname.textContent=items.foodName;
        const Frate=document.createElement('p').setAttribute('class','foodRate');
        Frate.textContent=items.FoodRate;

        textdiv.appendChild(Fname);
        textdiv.appendChild(Frate);
        itemdiv.appendChild(MenuImage);
        itemdiv.appendChild(textdiv);
        displayMenu.appendChild(itemdiv);


        })






})

