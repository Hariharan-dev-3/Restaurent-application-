const menu=document.querySelector('.hamburger');
const closeBtn=document.querySelector('.Close');
const imageContainer=document.querySelector('.imageContainer');
const menuitem=document.querySelector('.item');
const listBox=document.querySelector('.box');
const displayMenu=document.getElementById('items');
const selectbutton=document.getElementById('selectButton');


document.addEventListener('DOMContentLoaded',()=>{
        menu.addEventListener("mouseover",()=>{
        listBox.style.display="flex";
        listBox.style.transition="0.7s ease";

    })
     menu.addEventListener("mouseout",()=>{
        listBox.style.display="none";
        listBox.style.transition="0.7s ease";

    })
    listBox.addEventListener("mouseover",()=>{
        listBox.style.display="flex";
       

    })
     listBox.addEventListener("mouseout",()=>{
        listBox.style.display="none";
        

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
        },
        {
            foodImage:"veg.png",
            foodName:"Meals",
            FoodRate:"180.00",
            type:"veg"
        },
        {
            foodImage:"chips.png",
            foodName:"Fried",
            FoodRate:"190.00",
            type:"non-veg"
        }
    ]

    function displayitems(menuitemscollection)
    {
        displayMenu.innerHTML='';
        
        menuitemscollection.forEach(items=>{
        const itemdiv=document.createElement('div');
        itemdiv.setAttribute('class','item');
        const MenuImage=document.createElement('img');
        MenuImage.setAttribute('class','logo');
        MenuImage.src=`../Images/${items.foodImage}`;
        const textdiv=document.createElement('div');
        textdiv.setAttribute('class','texts');
        const Fname=document.createElement('p');
        Fname.setAttribute('class','foodName');
        Fname.textContent=items.foodName;
        const Frate=document.createElement('p');
        Frate.setAttribute('class','foodRate');
        Frate.textContent=items.FoodRate;
        const Btn=document.createElement('button');
        Btn.setAttribute('class','orderBtn');
        Btn.textContent="Order Now";

        textdiv.appendChild(Fname);
        textdiv.appendChild(Frate);
        itemdiv.appendChild(MenuImage);
        itemdiv.appendChild(textdiv);
        itemdiv.appendChild(Btn);
        displayMenu.appendChild(itemdiv);


        })
    }

    
displayitems(menuItemsList);

selectbutton.addEventListener('change',()=>{
    const selecteditem=selectbutton.value;
    if(selecteditem==='All' || selecteditem===''){
        displayitems(menuItemsList);
    }
    else{
        const sorted=menuItemsList.filter(itemss=>itemss.type===selecteditem);
        displayitems(sorted);
    }

})






})

