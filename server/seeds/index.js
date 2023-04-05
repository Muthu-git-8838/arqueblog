const User = require("../model/user");
const Currency = require("../model/currency");
const bcrypt = require("bcrypt");
const Posttype = require("../model/posttype");
const Usertype = require("../model/usertype");
const Category = require("../model/category");
const saltRounds = 10;

const generateHash = async (password) =>
  await bcrypt.hash(password, saltRounds);

// Connect to MongoDB via

const seeds = [
  {
    model: User,
    data: [{
    
        "email": "Admin@blog.com",
        "password": "$2b$10$wRTk2qCh0A9d.1QgBYHyO.RWyjrMhFs7E9z2dt.OYNoHFPVjcTRyK",
        "first_name": "Admin",
        "last_name": "Blog",
        "followers_count": 0,
        "followers": [],
        "categories": [
            "science"
        ],
        "posts": [],
        "user_attachments": [],
        "accessToken": null,
        "accessTokenCreatedAt": null,
        "verifyToken": "26faca0e5e8f4b120d2d6c18086d899c",
        "verifyTokenCreatedAt": "2022-10-11T16:01:53.537Z",
        "forgotPasswordToken": null,
        "forgotPasswordTokenCreatedAt": null,
        "isActive": true,
        "isAdmin": true,
        "isApproved": false,
        "wishlist": [],
        "_id": "63459371cb7b90ab3ba0ea93",
        "createdAt": "2022-10-11T16:01:53.552Z",
        "updatedAt": "2022-10-11T16:01:53.552Z",
        "__v": 0
    },
    ],
  },
  // {
  //   model: Usertype,
  //   data: [
  //     { _id: "consumer", type: "Consumer", description: "Consumer" },
  //     { _id: "company", type: "Company", description: "Company" },
  //     { _id: "individualvendor", type: "Individual Vendor", description: "Individual Vendor" },
  //   ],
  // },
  {
    model: Posttype,
    data: [
      { _id: "qa", type: "qa", description: "Q&a" },
      { _id: "blog", type: "blog", description: "Blog" },

    ],
  },
  // {
  //   model: Currency,
  //   data: [{ _id: "usd", name: "USD", is_active: true }],
  // },
  {
    model: Category,
    data: [
        {
          _id: "science",
          name: "Science",
          description: "ScienceBlogs is an invitation blog network.",
          image: "science.png",
          is_active: true,
          updatedAt: "2022-10-12T07:01:11.192Z",
        },
        {
          _id: "sports",
          name: "Sports",
          description: "Sports bloggers choose a specific games.",
          image: "sports.png",
          is_active: true,
          updatedAt: "2022-10-12T07:01:11.192Z",
        },
        {
          _id: "books",
          name: "Books",
          description: "Describe your book in simple terms.",
          image: "books.png",
          is_active: true,
          updatedAt: "2022-10-12T07:01:11.192Z",
        },
        {
          _id: "travel",
          name: "Travel",
          description: "Make an easy to read description for travels.",
          image: "travel.png",
          is_active: true,
          updatedAt: "2022-10-12T07:01:11.192Z",
        },
        {
          _id: "food",
          description: "Food blogging is a feature of food journalism.",
          image: "food.png",
          is_active: true,
          name: "Food",
          updatedAt: "2022-10-12T07:01:11.192Z",
        },
        {
          _id: "lifestyle",
          name: "Lifestyle",
          description: "A lifestyle blogger creates personal interests.",
          image: "lifestyle.png",
          is_active: true,
          updatedAt: "2022-10-12T07:01:11.192Z",
        },
        {
          _id: "news",
          name: "News",
          description: "A news blog is a written and current-stories content.",
          image: "news.png",
          is_active: true,
          updatedAt: "2022-10-12T07:01:11.192Z",
        },
        {
          _id: "movies",
          name: "Movies",
          description: "A movie blog is a website write articles about films.",
          image: "movies.png",
          is_active: true,
          updatedAt: "2022-10-12T07:01:11.192Z",
        },
        {
          _id: "politics",
          name: "Politics",
          description: "A political blog is a form of covering politics.",
          image: "politics.png",
          is_active: true,
          updatedAt: "2022-10-12T07:01:11.192Z",
        },
        {
          _id: "history",
          name: "History",
          description: "The modern blog evolved from the online diary.",
          image: "history.png",
          is_active: true,
          updatedAt: "2022-10-12T07:01:11.192Z",
        },
        {
          _id: "economics",
          name: "Economics",
          description: "Economics is the study of limited resources.",
          image: "economics.png",
          is_active: true,
          updatedAt: "2022-10-12T07:01:11.192Z",
        },
        {
          _id: "finance",
          name: "Finance",
          description: "Finance is the process of raising funds.",
          image: "finance.png",
          is_active: true,
          updatedAt: "2022-10-12T07:01:11.192Z",


        },
        // {
        //   _id: "laboratory_and_diagnostic_services",
        //   description: "uhjewvijwkwkc",
        //   image: "flask.png",
        //   is_active: true,
        //   name: "Laboratory and diagnostic services",
        // },
        // {
        //   _id: "pharmacy_and_medical_products",
        //   description: "description",
        //   image: "blood-sample.png",
        //   is_active: true,
        //   name: "Pharmacy and medical products",
        // },
        // {
        //   _id: "event_organizers",
        //   description: "description",
        //   image: "staff.png",
        //   is_active: true,
        //   name: "Event organizers",
        // },
        // {
        //   _id: "catering_&_food",
        //   description: "description",
        //   image: "hot.png",
        //   is_active: true,
        //   name: "Catering & food",
        // },
        // {
        //   _id: "travell_&_tours",
        //   description: "description",
        //   image: "travel.png",
        //   is_active: true,
        //   name: "Travell & tours",
        // },
        // {
        //   _id: "tutoring_and_home_schooling",
        //   description: "description",
        //   image: "homeschooling.png",
        //   is_active: true,
        //   name: "Tutoring and home schooling",
        // },
        // {
        //   _id: "doctors,_therapists_and_nurse",
        //   description: "description",
        //   image: "stethoscope.png",
        //   is_active: true,
        //   name: "Doctors, therapists and nurse",
        // },
        // {
        //   _id: "artissts",
        //   description: "description",
        //   image: "paint-brush.png",
        //   is_active: true,
        //   name: "Artissts",
        // },
  
    ],
  },
];

const insertSeeds = async () => {
  try {
    for (const seed of seeds) {
      for (const data of seed.data) {
        seed.model.findOneAndUpdate(
          data,
          data,
          { upsert: true },
          (err, doc) => {
            console.log(doc);
          }
        );
      }
    }
    // await insertGames();
    // await insertCoin();
  } catch (error) {
    console.log(error);
  }
};

module.exports = insertSeeds;
