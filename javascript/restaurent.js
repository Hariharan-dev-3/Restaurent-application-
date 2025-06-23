const menu = document.querySelector(".hamburger");
const closeBtn = document.querySelector(".Close");
const imageContainer = document.querySelector(".imageContainer");
const menuitem = document.querySelector(".item");
const listBox = document.querySelector(".box");
const displayMenu = document.getElementById("items");
const selectbutton = document.getElementById("selectButton");
const gallerydiv = document.getElementById("galleryContainer");
const bookingdiv = document.getElementById("bookContainer");
const popupdiv = document.getElementById("popupScreen");

const imagefiles = ["malai kofta.jpg", "butterchic.jpg", "chana-masala.jpg"];

const menuItemsList = [
  {
    foodImage: "biriyani.png",
    foodName: "Biriyani",
    FoodRate: "200.00",
    type: "non-veg",
  },
  {
    foodImage: "panneeer.png",
    foodName: "Panner",
    FoodRate: "150.00",
    type: "veg",
  },
  {
    foodImage: "veg.png",
    foodName: "Meals",
    FoodRate: "180.00",
    type: "veg",
  },
  {
    foodImage: "chips.png",
    foodName: "Fried",
    FoodRate: "190.00",
    type: "non-veg",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  menu.addEventListener("mouseover", () => {
    listBox.style.display = "flex";
    listBox.style.transition = "0.7s ease";
  });
  menu.addEventListener("mouseout", () => {
    listBox.style.display = "none";
    listBox.style.transition = "0.7s ease";
  });
  listBox.addEventListener("mouseover", () => {
    listBox.style.display = "flex";
  });
  listBox.addEventListener("mouseout", () => {
    listBox.style.display = "none";
  });

  function loadImage(images) {
    images.forEach((im) => {
      const image = document.createElement("img");
      image.src = `../Images/${im}`;
      image.alt = "image";
      image.setAttribute("class", "offerImage");
      imageContainer.appendChild(image);
    });
  }
  loadImage(imagefiles);

  function displayitems(menuitemscollection) {
    displayMenu.innerHTML = "";

    menuitemscollection.forEach((items) => {
      const itemdiv = document.createElement("div");
      itemdiv.setAttribute("class", "item");
      const MenuImage = document.createElement("img");
      MenuImage.setAttribute("class", "logo");
      MenuImage.src = `../Images/${items.foodImage}`;
      const textdiv = document.createElement("div");
      textdiv.setAttribute("class", "texts");
      const Fname = document.createElement("p");
      Fname.setAttribute("class", "foodName");
      Fname.textContent = items.foodName;
      const Frate = document.createElement("p");
      Frate.setAttribute("class", "foodRate");
      Frate.textContent = items.FoodRate;
      const Btn = document.createElement("button");
      Btn.setAttribute("class", "orderBtn");
      Btn.textContent = "Order Now";

      textdiv.appendChild(Fname);
      textdiv.appendChild(Frate);
      itemdiv.appendChild(MenuImage);
      itemdiv.appendChild(textdiv);
      itemdiv.appendChild(Btn);
      displayMenu.appendChild(itemdiv);

      Btn.addEventListener("click", () => {
        popupdiv.style.display = "block";
        const popupHTML = `
          
            <div class="popup">
              <img src="../Images/${items.foodImage}" class="popupImage" >
              <p class="NameText">${items.foodName}</p>
              <p class="priceText">Price: ${items.FoodRate} /-</p>
              <button class="closePopup">Close</button>
            </div>`;

        popupdiv.innerHTML = popupHTML;

        const closeBtns = document.querySelectorAll(".closePopup");
        closeBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            popupdiv.style.display = "none";
          });
        });
      });
    });
  }

  displayitems(menuItemsList);

  selectbutton.addEventListener("change", () => {
    const selecteditem = selectbutton.value;
    if (selecteditem === "All" || selecteditem === "") {
      displayitems(menuItemsList);
    } else {
      const sorted = menuItemsList.filter(
        (fItems) => fItems.type === selecteditem
      );
      displayitems(sorted);
    }
  });
});

const galleryPics = [
  "gallery1.jpg",
  "gallery2.jpg",
  "gallery3.jpg",
  "gallery4.jpeg",
];

let imageRender = "";

function galleryRender(pics) {
  pics.forEach((picture) => {
    imageRender += `<img src="../Images/${picture}" class="galleryPic">`;
  });
}

galleryRender(galleryPics);
gallerydiv.innerHTML = imageRender;

bookingPics = [
  {
    image: "two seat.jpg",
    tableName: "Double Seator",
  },
  {
    image: "3 seat.jpg",
    tableName: "Triple Seator",
  },
  {
    image: "four seat.jpg",
    tableName: "Four Seator",
  },
  {
    image: "five seat.png",
    tableName: "Five Seator",
  },
  {
    image: "6 seat.jpg",
    tableName: "Six Seator",
  },
  {
    image: "8 seat.jpeg",
    tableName: "Eight Seator",
  },
];

let bookingContainer = "";

function bookingRender(bookingarray) {
  bookingarray.forEach((BookPic) => {
    bookingContainer += `
    <div class="bookingBack">
      <img src="../Images/${BookPic.image}" class="Bookimages">
      <p class="BookTableName">${BookPic.tableName}</p>
    </div>
    `;
  });
}

bookingRender(bookingPics);
bookingdiv.innerHTML = bookingContainer;
