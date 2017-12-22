const cardData = [
  {
    label: {
      title: "Mastercard Benefits",
      color: "#141413",
      text: "#FFFFFF"
    },
    type: "basic",
    title: "Duck and Rice",
    image: "images/1.jpg",
    meta: {
      location: "London",
      type: "Chinese"
    },
    benefits: "This is thing, time two thing"
  },
  {
    label: {
      title: "Brand",
      color: "#FFFFFF",
      text: "#141413"
    },
    fullCard: true,
    type: "full-card",
    title: "Currys PC World",
    image: "images/3.jpg",
    category: "Technology & gadgets",
    benefits: "2 benefits available"
  },
  {
    label: {
      title: "Hot Tickets",
      color: "#C75E0F",
      text: "#FFFFFF"
    },
    type: "basic",
    title: "Adele goes to town in a lovely little boat",
    image: "images/2.jpg",
    date: {
      day: "21st May",
      time: "7.00pm"
    },
    price: {
      status: "<strong class='warning'>Sold out</strong>",
      value: "£2000"
    },
    meta: {
      location: "London",
      type: "Chinese"
    },
  },
  {
    label: {
      title: "Good deal",
      color: "#CE2B33",
      text: "#FFFFFF"
    },
    type: "basic",
    title: "Belsazar Cocktail Masterclass",
    image: "images/4.jpg",
    category: "Technology & gadgets",
    meta: {
      location: "London",
      type: "Chinese"
    }
  },
  {
    label: {
      title: "Article",
      color: "#FFFFFF",
      text: "#141413"
    },
    type: "article",
    title: "How to spend the perfect summer's day in Venice",
    image: "images/5.jpg",
    price: {
      status: "12/04/2017",
      value: "travel"
    }
  },
  {
    label: {
      title: "Article",
      color: "#FFFFFF",
      text: "#141413"
    },
    type: "article",
    title: "The hottest new spots in the capital",
    image: "images/6.jpg",
    price: {
      status: "15/08/2017",
      value: "dining"
    }
  },
  {
    label: {
      title: "Mastercard Benefits",
      color: "#141413",
      text: "#FFFFFF"
    },
    type: "basic",
    title: "Duck and Rice",
    image: "images/4.jpg",
    meta: {
      location: "London",
      type: "Chinese"
    },
    benefits: "This is thing, time two thing"
  },
  {
    label: {
      title: "Article",
      color: "#FFFFFF",
      text: "#141413"
    },
    type: "article",
    title: "The hottest new spots in the capital",
    image: "images/3.jpg",
    price: {
      status: "15/08/2017",
      value: "dining"
    }
  }
]

const basicSource = document.getElementById("basic-card-template").innerHTML;
const basicTemplate = Handlebars.compile(basicSource);

var cards = "";
for(var i =0; i<cardData.length; i++){
  cards += basicTemplate(cardData[i]);
}
const section = document.querySelector("#cards");
section.innerHTML = cards;