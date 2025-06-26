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
const bookingPage = document.getElementById("bookingPage");
//const alertPlaceholder = document.querySelector("#alertPlaceholder");

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
              <div class="Btns">
                <button class="closePopup">Close</button>
                <button class="buy">Buynow</button>
              </div>
              
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
    count: 3,
  },
  {
    image: "3 seat.jpg",
    tableName: "Triple Seator",
    count: 2,
  },
  {
    image: "four seat.jpg",
    tableName: "Four Seator",
    count: 3,
  },
  {
    image: "five seat.png",
    tableName: "Five Seator",
    count: 3,
  },
  {
    image: "6 seat.jpg",
    tableName: "Six Seator",
    count: 2,
  },
  {
    image: "8 seat.jpeg",
    tableName: "Eight Seator",
    count: 2,
  },
];

//let bookingContainer = "";

function bookingRender(bookingarray) {
  bookingarray.forEach((BookPic) => {
    let bookingContainer = `
    <div class="bookingBack">
      <img src="../Images/${BookPic.image}" class="Bookimages" data-count="${BookPic.count}" data-table="${BookPic.tableName}">
      <p class="BookTableName">${BookPic.tableName}</p>
    </div>
    `;
    bookingdiv.innerHTML += bookingContainer;
  });
}

bookingRender(bookingPics);

const bookImg = document.querySelectorAll(".Bookimages");
bookImg.forEach((bmg) => {
  bmg.addEventListener("click", () => {
    // sendCount = bmg.getAttribute("data-count");
    forBooking(bmg.getAttribute("data-table"));
  });
});

// const bookImg = document.querySelectorAll(".Bookimages");
// bookImg.forEach((bmg) => {
//   bmg.addEventListener("click", () => {
//     // sendCount = bmg.getAttribute("data-count");
//     forBooking();
//   });
// });

const today = new Date().toISOString().split("T")[0];

function bookingFormTemplate(tableType) {
  return `
    <div class="bookNow">
      <div class="head">
        <p>Name : <strong>Customer</strong></p>
        <p>Table-type : <strong>${tableType}</strong></p>
      </div>  
      <div class="date">
        <label for="date">Select date   : </label>
        <input type="date" name="date" min="${today}">
      </div>
      <p>Choose time between 10.00AM to 08.00PM</p>
      <div class="time">
        <label for="stime">Starting time : </label>
        <input type="time" name="stime" min="10:00" max="20:00"><br>
        <label for="etime">Ending time      : </label>
        <input type="time" name="etime" min="10:00" max="20:00">
      </div>
      <div class="buttons">
        <button class="closeBooking">Close</button>
        <button class="bookBtn">Book Now</button> 
      </div>  
    </div>`;
}

function forBooking(tableType) {
  bookingPage.classList.remove("hide");
  bookingPage.classList.add("show");
  bookingPage.innerHTML = "";

  // for (let i = 1; i <= tableId; i++) {
  bookingPage.innerHTML = bookingFormTemplate(tableType);

  const bookBtns = document.querySelectorAll(".bookBtn");
  bookBtns.forEach((b) => {
    b.addEventListener("click", () => {
      const parent = b.closest(".bookNow");
      const startTime = parent.querySelector("input[name='stime']").value;
      const endTime = parent.querySelector("input[name='etime']").value;
      const bookDate = parent.querySelector("input[name='date']").value;
      const startInput = parent.querySelector("input[name='stime']");
      const endInput = parent.querySelector("input[name='etime']");
      const dateInput = parent.querySelector("input[name='date']");

      const alertPlaceholder = document.querySelector("#alertPlaceholder");
      alertPlaceholder.innerHTML = "";

      // let alertType = "";
      // let alertMessage = "";

      if (!startTime || !endTime || !bookDate) {
        // alert("Fill all the fields");
        showAlert("warning", "⚠️ Please fill in all the fields.");

        startInput.value = "";
        endInput.value = "";
        dateInput.value = "";
        return;
      } else if (startTime < "10:00" || endTime > "20:00") {
        // alert("Restaurant is open from 10:00 AM to 08:00 PM.");
        showAlert(
          "warning",
          "🕒 Restaurant is open from 10:00 AM to 08:00 PM only."
        );

        startInput.value = "";
        endInput.value = "";
        dateInput.value = "";
        return;
      } else {
        showAlert("success", `✅ Successfully booked a ${tableType} table!`);
      }

      function showAlert(type, message) {
        const alertPlaceholder = document.querySelector("#alertPlaceholder");
        alertPlaceholder.innerHTML = "";

        const alertDiv = document.createElement("div");
        alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-3`;
        alertDiv.setAttribute("role", "alert");
        alertDiv.innerHTML = `
              ${message}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;

        alertPlaceholder.appendChild(alertDiv);
      }
      //   successDiv.innerHTML = `
      // <p class="successMsg">Successfully ${tableType}  table Booked ...!</p>
      // `;
      //   setTimeout(() => {
      //     successDiv.style.display = "none";
      //     successDiv.style.transition = "0.3s ease";
      //   }, 2000);
      // alert("Booking successful!");
    });
  });

  const closeBtns = document.querySelectorAll(".closeBooking");
  closeBtns.forEach((cb) => {
    cb.addEventListener("click", () => {
      bookingPage.classList.add("hide");
    });
  });
}
