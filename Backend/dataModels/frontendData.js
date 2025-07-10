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
    foodImage: "/static/profile/Images/biriyani.png",
    foodName: "Biriyani",
    FoodRate: "200.00",
    type: "non-veg",
  },
  {
    foodImage: "/static/profile/Images/panneeer.png",
    foodName: "Panner",
    FoodRate: "150.00",
    type: "veg",
  },
  {
    foodImage: "/static/profile/Images/veg.png",
    foodName: "Meals",
    FoodRate: "180.00",
    type: "veg",
  },
  {
    foodImage: "/static/profile/Images/chips.png",
    foodName: "Fried",
    FoodRate: "190.00",
    type: "non-veg",
  },
];

const imagefiles = [
  "/static/profile/Images/malai kofta.jpg",
  "/static/profile/Images/butterchic.jpg",
  "/static/profile/Images/daal.avif",
];

const galleryPics = [
  "/static/profile/Images/gallery1.jpg",
  "/static/profile/Images/gallery2.jpg",
  "/static/profile/Images/gallery3.jpg",
  "/static/profile/Images/gallery4.jpeg",
  "/static/profile/Images/interior1.jpg",
  "/static/profile/Images/interior2.jpg",
  "/static/profile/Images/interior3.jpg",
  "/static/profile/Images/interior4.jpg",
];

const bookingPics = [
  {
    image: "/static/profile/Images/two seat.jpg",
    tableName: "Double Seator",
    count: 3,
  },
  {
    image: "/static/profile/Images/3 seat.jpg",
    tableName: "Triple Seator",
    count: 2,
  },
  {
    image: "/static/profile/Images/four seat.jpg",
    tableName: "Four Seator",
    count: 3,
  },
  {
    image: "/static/profile/Images/five seat.png",
    tableName: "Five Seator",
    count: 3,
  },
  {
    image: "/static/profile/Images/6 seat.jpg",
    tableName: "Six Seator",
    count: 2,
  },
  {
    image: "/static/profile/Images/8 seat.jpeg",
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
