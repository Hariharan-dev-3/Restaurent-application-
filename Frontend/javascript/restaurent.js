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

const imagefiles = ["malai kofta.jpg", "butterchic.jpg", "chana-masala.jpg"];

// home page image rendering function

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

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:5000/api/v1/navbar")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        const link = document.getElementById(item.id);
        if (link) {
          link.textContent = item.name;
        }
      });
    })
    .catch((err) => console.error("Navbar fetch failed:", err));

  fetch("http://localhost:5000/api/v1/menuitems")
    .then((response) => response.json())
    .then((data) => {
      renderMenuItems(data);
      console.log(data);
    })
    .catch((error) => {
      console.error("Error fetching menu items:", error);
    });

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

  // const menuItemsList = [
  //   {
  //     foodImage: "biriyani.png",
  //     foodName: "Biriyani",
  //     FoodRate: "200.00",
  //     type: "non-veg",
  //   },
  //   {
  //     foodImage: "panneeer.png",
  //     foodName: "Panner",
  //     FoodRate: "150.00",
  //     type: "veg",
  //   },
  //   {
  //     foodImage: "veg.png",
  //     foodName: "Meals",
  //     FoodRate: "180.00",
  //     type: "veg",
  //   },
  //   {
  //     foodImage: "chips.png",
  //     foodName: "Fried",
  //     FoodRate: "190.00",
  //     type: "non-veg",
  //   },
  // ];

  // menu page rendering function

  // function displayitems(menuitemscollection) {
  //   displayMenu.innerHTML = "";

  //   menuitemscollection.forEach((items) => {
  //     const itemdiv = document.createElement("div");
  //     itemdiv.setAttribute("class", "item");
  //     const MenuImage = document.createElement("img");
  //     MenuImage.setAttribute("class", "logo");
  //     MenuImage.src = `../Images/${items.foodImage}`;
  //     const textdiv = document.createElement("div");
  //     textdiv.setAttribute("class", "texts");
  //     const Fname = document.createElement("p");
  //     Fname.setAttribute("class", "foodName");
  //     Fname.textContent = items.foodName;
  //     const Frate = document.createElement("p");
  //     Frate.setAttribute("class", "foodRate");
  //     Frate.textContent = items.FoodRate;
  //     const Btn = document.createElement("button");
  //     Btn.setAttribute("class", "orderBtn");
  //     Btn.textContent = "Order Now";

  //     textdiv.appendChild(Fname);
  //     textdiv.appendChild(Frate);
  //     itemdiv.appendChild(MenuImage);
  //     itemdiv.appendChild(textdiv);
  //     itemdiv.appendChild(Btn);
  //     displayMenu.appendChild(itemdiv);

  function renderMenuItems(menuItems) {
    displayMenu.innerHTML = "";

    menuItems.forEach((items) => {
      const itemdiv = document.createElement("div");
      itemdiv.setAttribute("class", "item");

      const MenuImage = document.createElement("img");
      MenuImage.setAttribute("class", "logo");
      MenuImage.src = `http://localhost:5000${items.foodImage}`;
      // MenuImage.src = items.foodImage.startsWith("/Images/")
      //   ? items.foodImage
      //   : `../Images/${items.foodImage}`;

      const textdiv = document.createElement("div");
      textdiv.setAttribute("class", "texts");

      const Fname = document.createElement("p");
      Fname.setAttribute("class", "foodName");
      Fname.textContent = items.foodName;

      const Frate = document.createElement("p");
      Frate.setAttribute("class", "foodRate");
      Frate.textContent = `₹${items.FoodRate}`;

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
              <img src="http://localhost:5000${items.foodImage}" class="popupImage" >
              <p class="NameText">${items.foodName}</p>
              <p class="priceText">Price: ${items.FoodRate} /-</p>
              <div class="Btns">
                <button class="closePopup">Close</button>
                <button class="buy" id="buyNow">Buynow</button>
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

      $("#buyNow").click(() => {
        buyNowForm();
      });
    });
  }

  // displayitems(menuItemsList);

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
  "interior1.jpg",
  "interior2.jpg",
  "interior3.jpg",
  "interior4.jpg",
];

let imageRender = "";

// gallery page image rendering function

function galleryRender(pics) {
  pics.forEach((picture) => {
    imageRender += `<img src="../Images/${picture}" class="galleryPic" id="galleryPics">`;
    $("#galleryPics").click(() => {});
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
    const tableType = bmg.getAttribute("data-table");
    const loggedInUsers = JSON.parse(sessionStorage.getItem("loggedIn")) || [];
    const activeUser = loggedInUsers.find((user) => user.isLoggedIn === true);

    if (activeUser) {
      forBooking(tableType, activeUser.userName);
    } else {
      showAlert("warning", "Please log in to book a table.");
    }
  });
});

const today = new Date().toISOString().split("T")[0];

function bookingFormTemplate(tableType, userName) {
  return `
    <div class="bookNow">
      <div class="title">
        <h3>Table Booking form 📌</h3>
        <button class="cornerClose">X</button>
      </div>
      <div class="head">
        <p><strong>👋 Hello ${userName}</strong></p>
        <p>Table-type : <strong>${tableType}</strong></p>
      </div>  
      <div class="date">
        <label for="date">Select date 📆</label>
        <input type="date" name="date" min="${today}" value="${today}">
      </div>
      <p class="note"><b> ⏳ Choose time between 10.00AM to 08.00PM ⏳</b></p>
      <div class="time">
        <label for="stime">🕘 Starting time</label>
        <input type="time" name="stime" min="10:00" max="20:00" value="10:00"><br>
        <label for="etime">🕗 Ending time</label>
        <input type="time" name="etime" min="10:00" max="20:00" value="08:00">
      </div>
      <div class="buttons">
        <button class="closeBooking">Close</button>
        <button class="bookBtn">Book Now</button> 
      </div>  
    </div>`;
}

function forBooking(tableType, userName) {
  bookingPage.classList.remove("hide");
  bookingPage.classList.add("show");
  bookingPage.innerHTML = "";

  bookingPage.innerHTML = bookingFormTemplate(tableType, userName);
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

      if (!startTime || !endTime || !bookDate) {
        showAlert("warning", "Please fill in all the fields.");

        startInput.value = "";
        endInput.value = "";
        dateInput.value = "";
        return;
      } else if (startTime < "10:00" || endTime > "20:00") {
        showAlert(
          "warning",
          " Restaurant is open from 10:00 AM to 08:00 PM only."
        );

        startInput.value = "";
        endInput.value = "";
        return;
      } else {
        showAlert("success", `Successfully booked a ${tableType} table!`);
        bookingPage.classList.add("hide");
        bookingPage.classList.remove("show");
      }
    });
  });

  const closeBtns = document.querySelectorAll(".closeBooking , .cornerClose");
  closeBtns.forEach((cb) => {
    cb.addEventListener("click", () => {
      bookingPage.classList.add("hide");
    });
  });
}

function showAlert(type, message) {
  const alertPlaceholder = document.querySelector("#alertPlaceholder");
  alertPlaceholder.innerHTML = "";

  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-3`;
  alertDiv.setAttribute("role", "alert");
  alertDiv.setAttribute("id", "alertBox");
  alertDiv.innerHTML = `
              ${message}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;

  alertPlaceholder.appendChild(alertDiv);
  setTimeout(() => {
    alertDiv.classList.add("hide");
  }, 3000);
}

$("#loginTag").click((e) => {
  e.preventDefault();
  loginRender();
});

function loginRender() {
  $("#regAuthendication").removeClass("show");
  $("#authendication").addClass("show");
  $("#toRegister").click((e) => {
    e.preventDefault();
    registerRender();
  });
}

function closeLogin() {
  $("#authendication").removeClass("show");
  $("#regAuthendication").removeClass("show");
}

function registerRender() {
  $("#authendication").removeClass("show");
  $("#regAuthendication").addClass("show");
  $("#toLogin").click((e) => {
    e.preventDefault();
    loginRender();
  });
}

//login validation
$(document).ready(function () {
  $(document).on("click", "#registerBtn", () => {
    registerFormValidation();
  });

  function registerFormValidation() {
    const userName = $("#username").val().trim();
    const userEmail = $("#usermail").val().trim();
    const userPass = $("#userpassword").val().trim();
    const confirmPass = $("#confirmPassword").val().trim();

    console.log(userName, userEmail, userPass, confirmPass);

    if (userName || userEmail || userPass || confirmPass) {
      if (!regValidator(userName, userEmail, userPass, confirmPass)) {
        return;
      }
    } else {
      showAlert("warning", " ❗ fill all the fields");
      return;
    }

    const userData = {
      userName: userName,
      email: userEmail,
      password: userPass,
      confirmPassword: confirmPass,
    };

    const allUsers = JSON.parse(localStorage.getItem("users")) || [];

    const alreadyExist = allUsers.some((user) => user.email === userEmail);

    if (alreadyExist) {
      showAlert("warning", " ❗ already username registered");
      $("#username").val("");
      $("#usermail").val("");
      $("#userpassword").val("");
      return;
    } else {
      allUsers.push(userData);
      localStorage.setItem("users", JSON.stringify(allUsers));
      showAlert("success", "data stored");
      $("#username").val("");
      $("#usermail").val("");
      $("#userpassword").val("");
      loginRender();
    }
  }

  $(document).on("click", "#loginBtn", () => {
    loginFormValidation();
  });
  function loginFormValidation() {
    $("#authendication").addClass("show");
    const loginEmail = $("#loginMail").val().trim();
    const loginPass = $("#loginPass").val().trim();
    console.log(loginEmail);
    console.log(loginPass);

    if (loginEmail || loginPass) {
      if (!loginValidator(loginEmail, loginPass)) {
        return;
      }
    } else {
      showAlert("warning", "fill all the details");
      return;
    }

    const checkLogin = JSON.parse(localStorage.getItem("users")) || [];
    console.log(checkLogin);

    const matchData = checkLogin.find(
      (data) => data.email === loginEmail && data.password === loginPass
    );

    const sessionUsers = [];
    const loginData = {
      isLoggedIn: true,
      userName: matchData.userName,
    };

    if (matchData) {
      sessionUsers.push(loginData);
      sessionStorage.setItem("loggedIn", JSON.stringify(sessionUsers));
      console.log(matchData);
      afterLogin(loginData.userName);
      $("#loginMail").val("");
      $("#loginPass").val("");
      return;
    } else {
      showAlert("warning", "❗ Invalid credentials");
      return;
    }
  }

  function regValidator(name, email, password, confirm) {
    const isValidName = /^[^\d\s][a-zA-Z0-9]{3,14}$/.test(name);
    const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/.test(
      email
    );
    const isValidPass = password === confirm && password.length >= 8;

    if (!isValidName) {
      showAlert("warning", "❗ invalid name format");
      $("#username").val("");
      return false;
    } else if (!isValidEmail) {
      showAlert("warning", "❗ invalid email format");
      $("#usermail").val("");
      return false;
    } else if (!isValidPass) {
      showAlert("warning", "❗ password mismatch error");
      $("#userpassword").val("");
      $("#confirmPassword").val("");
      return false;
    } else {
      $("#username").val("");
      $("#usermail").val("");
      $("#userpassword").val("");
      $("#confirmPassword").val("");
      return true;
    }
  }

  function loginValidator(email, password) {
    const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/.test(
      email
    );
    const isValidPass = password.length >= 8;

    if (!isValidEmail) {
      showAlert("warning", "❗ invalid email format or Password");
      $("#loginMail").val("");
      return false;
    } else if (!isValidPass) {
      showAlert("warning", "❗ password mismatch error");
      $("#loginPass").val("");
      return false;
    } else {
      $("#loginEmail").val("");
      $("#loginPass").val("");

      return true;
    }
  }

  function afterLogin(userName) {
    const loggedInUsers = JSON.parse(sessionStorage.getItem("loggedIn")) || [];
    const isActive = loggedInUsers.find((user) => user.isLoggedIn === true);
    const name = userName;
    if (isActive) {
      $("#loader").addClass("show");
      $("#authendication").removeClass("show");
      setTimeout(() => {
        $("#loader").removeClass("show");
        $("#loginTag").text("Logout");
        $("#loginTag").attr("data-status", "true");
        $("#loginUserName").css("display", "block");
        $("#loginUserName").text(`👨‍🍳 Welcome ${name}`);
        $("#authendication").removeClass("show");
        showAlert("success", " ✅ logged in successfully ✅");
      }, 3000);

      $("#loginTag")
        .off("click")
        .on("click", (e) => {
          e.preventDefault();
          $("#loader").addClass("show");

          loggedInUsers.forEach((user) => {
            if (user.userName === userName) {
              user.isLoggedIn = false;
            }
          });

          setTimeout(() => {
            sessionStorage.setItem("loggedIn", JSON.stringify(loggedInUsers));
            $("#loginTag").text("Login").attr("data-status", "false");
            $("#loginUserName").css("display", "none").text("");
            $("#loader").removeClass("show");
            showAlert("success", " ✅ Logged out successfully ✅");
          }, 3000);
        });
    } else {
      showAlert("warning", "not Registered");
    }
  }
});
