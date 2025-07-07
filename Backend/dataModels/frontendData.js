const navBar = [
  {
    id: "navMenu",
    name: "menu",
  },
  {
    id: "navGallery",
    name: "gallery",
  },
  {
    id: "navBooking",
    name: "booking",
  },
  {
    id: "navAbout",
    name: "about",
  },
];

const menuItemsList = [
  {
    foodImage: "/Images/biriyani.png",
    foodName: "Biriyani",
    FoodRate: "200.00",
    type: "non-veg",
  },
  {
    foodImage: "/Images/panneeer.png",
    foodName: "Panner",
    FoodRate: "150.00",
    type: "veg",
  },
  {
    foodImage: "/Images/veg.png",
    foodName: "Meals",
    FoodRate: "180.00",
    type: "veg",
  },
  {
    foodImage: "/Images/chips.png",
    foodName: "Fried",
    FoodRate: "190.00",
    type: "non-veg",
  },
];

const imagefiles = [
  "/Images/malai kofta.jpg",
  "/Images/butterchic.jpg",
  "/Images/chana-masala.jpg",
];

const galleryPics = [
  "/Images/gallery1.jpg",
  "/Images/gallery2.jpg",
  "/Images/gallery3.jpg",
  "/Images/gallery4.jpeg",
  "/Images/interior1.jpg",
  "/Images/interior2.jpg",
  "/Images/interior3.jpg",
  "/Images/interior4.jpg",
];

const bookingPics = [
  {
    image: "/Images/two seat.jpg",
    tableName: "Double Seator",
    count: 3,
  },
  {
    image: "/Images/3 seat.jpg",
    tableName: "Triple Seator",
    count: 2,
  },
  {
    image: "/Images/four seat.jpg",
    tableName: "Four Seator",
    count: 3,
  },
  {
    image: "/Images/five seat.png",
    tableName: "Five Seator",
    count: 3,
  },
  {
    image: "/Images/6 seat.jpg",
    tableName: "Six Seator",
    count: 2,
  },
  {
    image: "/Images/8 seat.jpeg",
    tableName: "Eight Seator",
    count: 2,
  },
];

module.exports = {
  navBar,
  menuItemsList,
  imagefiles,
  galleryPics,
  bookingPics,
};
