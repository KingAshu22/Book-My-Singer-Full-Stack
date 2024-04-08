const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const nodemailer = require("nodemailer");
const cors = require("cors");
const Recaptcha = require("express-recaptcha").RecaptchaV3;
const redirections = require("./redirections");

const { google } = require("googleapis");
const keys = require("./secrets.json");

const spreadsheetId = "1e0LVQGWxSNtwtIaGRIqnBXFttMY5sNbo_Dd8H9A5rtY";

const app = express();
const corsOptions = {
  origin: [
    "http://localhost:3001",
    "https://5lq8djtf-3001.inc1.devtunnels.ms",
    "https://gigsar.vercel.app",
  ], // Add your additional domain here
};

app.use(cors(corsOptions));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({ secret: "your-secret-key", resave: true, saveUninitialized: true })
);

// Configure reCAPTCHA with your secret key
const recaptcha = new Recaptcha(
  "6LcO1TAoAAAAAFgMNRsIWJo_RIcv3qI5trmTiRdH",
  "6LcO1TAoAAAAABTUFWk1LfuVLHugKDSIELY828nB"
);

mongoose.connect(
  "mongodb+srv://bookanartist2:NRMVq0Q1CJI4xZNa@book-my-singer.da90nao.mongodb.net/",
  { useNewUrlParser: true }
);

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  role: String,
});

const User = new mongoose.model("User", userSchema);

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
});

const Admin = new mongoose.model("Admin", adminSchema);

const artistSchema = new mongoose.Schema({
  metaTitle: String,
  metaDesc: String,
  keywords: String,
  linkid: String,
  name: String,
  gender: String,
  profilePic: String,
  contact: String,
  location: String,
  price: String,
  artistType: String,
  bandMemberName: String,
  code: String,
  eventsType: String,
  genre: String,
  languages: String,
  playback: String,
  original: String,
  time: String,
  instruments: String,
  awards: String,
  spotify: String,
  gallery: Array,
  events: Array,
  testLinks: Array,
  reviews: Array,
  blog: String,
});

const Artist = new mongoose.model("Artist", artistSchema);

const blogSchema = new mongoose.Schema({
  metaTitle: String,
  metaDesc: String,
  keywords: String,
  linkid: String,
  title: String,
  thumbnail: String,
  thumbAlt: String,
  thumbTitle: String,
  thumbDesc: String,
  thumbCap: String,
  gallery: Array,
  events: Array,
  blog: String,
  relatedBlog: Array,
  relatedArtist: Array,
});

const Blog = new mongoose.model("Blog", blogSchema);

const artistCategorySchema = new mongoose.Schema({
  metaTitle: String,
  metaDesc: String,
  keywords: String,
  category: String,
  subCategory: String,
  title: String,
  thumbnail: String,
  gallery: Array,
  events: Array,
  blog: String,
  relatedBlog: Array,
});

const ArtistCategory = new mongoose.model(
  "ArtistCategory",
  artistCategorySchema
);

const eventCategorySchema = new mongoose.Schema({
  metaTitle: String,
  metaDesc: String,
  keywords: String,
  category: String,
  subCategory: String,
  title: String,
  thumbnail: String,
  gallery: Array,
  events: Array,
  blog: String,
  relatedBlog: Array,
});

const EventCategory = new mongoose.model("EventCategory", eventCategorySchema);

function isAuthenticated(req, res, next) {
  if (
    req.session?.user?.role === "admin" ||
    req.session?.user?.role === "user"
  ) {
    return next();
  } else {
    res.render("login-error");
  }
}

app.get("/", (req, res) => {
  res.render("home.ejs");
});

redirections.forEach((rule) => {
  app.get(rule.oldUrl, (req, res) => {
    res.redirect(301, rule.newUrl);
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/admin-login", (req, res) => {
  res.render("admin-login");
});

app.get("/create-artist", isAuthenticated, (req, res) => {
  res.render("create-artist");
});

app.get("/create-blog", isAuthenticated, (req, res) => {
  res.render("create-blog");
});

app.get("/create-category", isAuthenticated, (req, res) => {
  res.render("create-category");
});

app.get("/create-event", isAuthenticated, (req, res) => {
  res.render("create-event");
});

app.get("/artist", async (req, res) => {
  const artists = await Artist.find({}).sort({ _id: -1 });

  res.render("artist", {
    artists,
  });
});

app.get("/artist-registration", (req, res) => {
  res.render("artist-registration");
});

app.get("/api/artist", async (req, res) => {
  const artists = await Artist.find({}).sort({ _id: -1 });

  res.status(200).json(artists);
});

app.get("/api/artist/artistType/:artistType", async (req, res) => {
  const { artistType } = req.params;
  const artists = await Artist.find({ artistType }).sort({ _id: -1 });

  res.status(200).json(artists);
});

app.get("/api/artist/artistName/:linkid", async (req, res) => {
  const { linkid } = req.params;
  const artist = await Artist.findOne({ linkid });
  res.status(200).json(artist);
});

app.get("/event-category", async (req, res) => {
  res.render("event-home");
});

app.get("/event-category/wedding", (req, res) => {
  res.render("wedding-home");
});

app.get("/event-category/corporate", (req, res) => {
  res.render("corporate-home");
});

app.get("/event-category/college", (req, res) => {
  res.render("college-home");
});

app.get("/privacy-policy", (req, res) => {
  res.render("privacy-policy");
});

app.get("/artist-category/singers/indian-idol-singers", (req, res) => {
  res.render("indian-idol");
});

app.get("/artist-category/:category/:subCategory", async (req, res) => {
  try {
    const { category, subCategory } = req.params;

    // Fetch artist from the database based on artistType and linkid
    const artistCategory = await ArtistCategory.findOne({
      category,
      subCategory,
    });

    if (artistCategory) {
      // Render the "singer" view and pass the artist's information
      res.render("category", { artistCategory });
    } else {
      // Redirect to the login page if artist is not found
      res.redirect("/");
    }
  } catch (error) {
    res.redirect("/");
  }
});

app.get("/event-category/:category/:subCategory", async (req, res) => {
  try {
    const { category, subCategory } = req.params;

    // Fetch artist from the database based on artistType and linkid
    const eventCategory = await EventCategory.findOne({
      category,
      subCategory,
    });

    // Convert the category to lowercase
    const lowercaseCategory = category.toLowerCase();

    // Use a regular expression to perform a case-insensitive search
    const regexCategory = new RegExp(lowercaseCategory, "i");

    // Find artists with eventType containing the category
    const singers = await Artist.find({
      eventType: regexCategory,
      artistType: "singer",
    });
    const bands = await Artist.find({
      eventType: regexCategory,
      artistType: "live-band",
    });
    const celebrity = await Artist.find({
      eventType: regexCategory,
      artistType: "celebrity-singer",
    });

    if (eventCategory) {
      // Render the "singer" view and pass the artist's information
      res.render("event", { eventCategory, singers, bands, celebrity });
    } else {
      // Redirect to the login page if artist is not found
      res.redirect("/");
    }
  } catch (error) {
    res.redirect("/");
  }
});

app.get("/all-artists", isAuthenticated, async (req, res) => {
  const artists = await Artist.find({}).sort({ _id: -1 });

  res.render("allArtists", {
    artists,
  });
});

app.get("/all-artist-category", isAuthenticated, async (req, res) => {
  const artistCategories = await ArtistCategory.find({}).sort({ _id: -1 });

  const seoScores = artistCategories.map(calculateOnPageSEOScore);

  res.render("allArtistCategory", {
    artistCategories,
    seoScores,
  });
});

app.get("/all-event-category", isAuthenticated, async (req, res) => {
  const eventCategories = await EventCategory.find({}).sort({ _id: -1 });

  const seoScores = eventCategories.map(calculateOnPageSEOScore);

  res.render("allEventCategory", {
    eventCategories,
    seoScores,
  });
});

function calculateOnPageSEOScore(blog) {
  // Your SEO scoring logic here
  const metaTitle = blog?.metaTitle?.toLowerCase();
  const metaDesc = blog.metaDesc.toLowerCase();
  const blogContent = blog.blog.toLowerCase();
  const title = blog.title.toLowerCase();
  const keywords = blog.keywords.toLowerCase();
  const keywordList = keywords.split(",").map((keyword) => keyword.trim());

  let metaTitleScore = 0;
  let metaDescScore = 0;
  let blogContentScore = 0;
  let titleScore = 0;

  // Check if at least one keyword is found in each part of the content
  keywordList.forEach((keyword) => {
    if (metaTitle?.includes(keyword)) {
      metaTitleScore += 10; // Score if a keyword is found in meta title
    }
    if (metaDesc.includes(keyword)) {
      metaDescScore += 10; // Score if a keyword is found in meta description
    }
    if (blogContent.includes(keyword)) {
      blogContentScore += 10; // Score if a keyword is found in blog content
    }
    if (title.includes(keyword)) {
      titleScore += 10; // Score if a keyword is found in title
    }
  });

  // Calculate the total SEO score
  const totalScore =
    metaTitleScore + metaDescScore + blogContentScore + titleScore;

  // Calculate the individual scores as an object
  const individualScores = {
    metaTitleScore,
    metaDescScore,
    blogContentScore,
    titleScore,
  };

  // Calculate the percentage score
  const percentage = (totalScore / 40) * 100;

  // Return an object with individual scores and total score
  return {
    individualScores,
    totalScore,
    percentage: percentage.toFixed(2),
  };
}

app.get("/all-blogs", isAuthenticated, async (req, res) => {
  const blogs = await Blog.find({}).sort({ _id: -1 });

  const seoScores = blogs.map(calculateOnPageSEOScore);

  res.render("allBlogs", {
    blogs,
    seoScores,
  });
});

app.get("/blog", async (req, res) => {
  const blogs = await Blog.find({}).sort({ _id: -1 });

  res.render("blog-list", {
    blogs,
  });
});

app.get("/artist/:artistType/:linkid", async (req, res) => {
  try {
    const { artistType, linkid } = req.params;

    // Fetch artist from the database based on artistType and linkid
    const artist = await Artist.findOne({ artistType, linkid });

    if (artist) {
      // Render the "singer" view and pass the artist's information
      res.render("singer", { artist });
    } else {
      // Redirect to the login page if artist is not found
      res.redirect("/");
    }
  } catch (error) {
    res.redirect("/");
  }
});

app.get(
  "/edit-artist/:artistType/:linkid",
  isAuthenticated,
  async (req, res) => {
    try {
      const { artistType, linkid } = req.params;

      const artist = await Artist.findOne({ artistType, linkid });

      if (artist) {
        // Render the "singer" view and pass the artist's information
        res.render("edit-artist", { artist });
      } else {
        // Redirect to the login page if artist is not found
        res.status(404).send("No Artist Found");
      }
    } catch (error) {
      res.redirect("/");
    }
  }
);

app.get(
  "/edit-artist-category/:category/:subCategory",
  isAuthenticated,
  async (req, res) => {
    try {
      const { category, subCategory } = req.params;

      const artistCategory = await ArtistCategory.findOne({
        category,
        subCategory,
      });

      if (artistCategory) {
        // Render the "singer" view and pass the artist's information
        res.render("edit-artist-category", { artistCategory });
      } else {
        // Redirect to the login page if artist is not found
        res.status(404).send("No Artist Found");
      }
    } catch (error) {
      res.redirect("/");
    }
  }
);

app.get(
  "/edit-event-category/:category/:subCategory",
  isAuthenticated,
  async (req, res) => {
    try {
      const { category, subCategory } = req.params;

      const eventCategory = await EventCategory.findOne({
        category,
        subCategory,
      });

      if (eventCategory) {
        // Render the "singer" view and pass the artist's information
        res.render("edit-event-category", { eventCategory });
      } else {
        // Redirect to the login page if artist is not found
        res.status(404).send("No Artist Found");
      }
    } catch (error) {
      res.redirect("/");
    }
  }
);

app.get("/blog/:linkid", async (req, res) => {
  try {
    const { linkid } = req.params;

    const blog = await Blog.findOne({ linkid });
    const relatedBlogData = [];
    const relatedArtistData = [];

    if (blog.relatedBlog.length > 1) {
      await Promise.all(
        blog.relatedBlog.map(async function (relatedLinkId) {
          const blogDocument = await Blog.findOne({ linkid: relatedLinkId });
          const blogData = {
            linkid: blogDocument.linkid,
            thumbnail: blogDocument.thumbnail,
            title: blogDocument.title,
            metaDesc: blogDocument.metaDesc,
          };
          relatedBlogData.push(blogData);
        })
      );
    }

    if (blog.relatedArtist.length > 1) {
      await Promise.all(
        blog.relatedArtist.map(async function (relatedArtistLinkId) {
          const artistDocument = await Artist.findOne({
            linkid: relatedArtistLinkId,
          });
          const artistData = {
            linkid: artistDocument.linkid,
            artistType: artistDocument.artistType,
            name: artistDocument.name,
            profilePic: artistDocument.profilePic,
          };
          relatedArtistData.push(artistData);
        })
      );
    }

    if (blog) {
      res.render("blog", { blog, relatedBlogData, relatedArtistData });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

app.get("/edit-blog/:linkid", isAuthenticated, async (req, res) => {
  try {
    const { linkid } = req.params;

    const blog = await Blog.findOne({ linkid });
    const relatedBlogDatas = [];

    for (const linkId of blog.relatedBlog) {
      const blogDocument = await Blog.findOne({ linkId });
      if (blogDocument) {
        relatedBlogDatas.push(blogDocument);
      }
    }
    if (blog) {
      res.render("edit-blog", { blog, relatedBlogDatas });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    res.redirect("/");
  }
});

app.get("/user-dashboard", isAuthenticated, (req, res) => {
  res.render("user-dashboard");
});

app.get("/success", (req, res) => {
  res.render("success");
});

app.get("/spam", (req, res) => {
  res.render("spam");
});

app.get("/enquiry", (req, res) => {
  res.render("enquire");
});

app.get("*", (req, res) => {
  res.redirect("/");
});

// Configure nodemailer to send emails
const transporter = nodemailer.createTransport({
  service: "gmail", // e.g., Gmail
  auth: {
    user: "bookanartist2@gmail.com",
    pass: "fwri rlpw upfc stif",
  },
});

// Function to generate a random OTP
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Function to send an email with OTP
async function sendOTPByEmail(email, otp) {
  const mailOptions = {
    from: "bookanartist2@gmail.com",
    to: email,
    subject: "Your OTP for Two-Step Verification",
    text: `Your OTP is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
}

let otp;

app.post("/pallavi-chaudhary", async (req, res) => {
  try {
    const { name, email, contact, message } = req.body;

    // Validate form fields if needed

    const mailOptions = {
      from: "bookanartist2@gmail.com",
      to: "bookanartist2@gmail.com",
      subject: "Contact Form Submission - Pallavi Chaudhary",
      text: `Name: ${name}\n Email: ${email} \n Contact: ${contact} \n Message: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).redirect("https://pallavichaudharylive.com/success");
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).redirect("https://pallavichaudharylive.com/error");
  }
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({ username });
  if (user) {
    if ((await password) === user.password) {
      // Generate and send OTP
      otp = generateOTP();
      await sendOTPByEmail("bookanartist2@gmail.com", otp);

      // Store OTP and its expiration time in the user document
      user.otp = otp;
      user.otpExpiry = Date.now() + 2 * 60 * 1000; // 2 minutes validity
      await user.save();

      // Redirect to OTP verification page
      res.render("otp", {
        user,
      });
    } else {
      res.send("Wrong Password");
    }
  } else {
    res.send("User not found");
  }
});

// Add a route for OTP verification
app.post("/verify-otp", async (req, res) => {
  const username = req.body.username;
  const inputotp = req.body.otp;

  const user = await User.findOne({ username });

  if (user && otp == inputotp) {
    req.session.user = user;
    res.render("user-dashboard", {
      user,
    });
  } else {
    res.send("Invalid OTP or OTP expired. Please try again.");
  }
});

app.post("/add-artist", isAuthenticated, (req, res) => {
  const data = req.body;

  const metaTitle = data.metaTitle;
  const metaDesc = data.metaDesc;
  const keywords = data.keywords;
  const name = data.name;
  const lowerCaseName = name.toLowerCase();
  const linkid = lowerCaseName.replace(/ /g, "-");
  const profilePic = data.profilePic;
  const contact = data.contact;
  const location = data.location;
  const price = data.price;
  const artistType = data.artistType;
  const bandMemberName = data.bandMemberName;
  const code = data.code;
  const eventsType = data.events;
  const genre = data.genre;
  const languages = data.languages;
  const playback = data.playback;
  const original = data.original;
  const time = data.time;
  const instruments = data.instruments;
  const awards = data.awards;
  const gallery = data.galleryLink;
  const eventName = data.eventName;
  const eventType = data.eventType;

  // Function to determine event type based on link
  function getEventType(link) {
    return link.includes("aws") ? "aws" : "youtube";
  }

  // Create the events array
  const events = eventName.map((name, index) => ({
    name: name,
    links: eventType[index],
    type: eventType[index].map((link) => getEventType(link)),
  }));

  const testLinks = data.testLink;
  const reviews = data.review;
  const blog = data.blog;

  const artist = new Artist({
    metaTitle,
    metaDesc,
    keywords,
    name,
    linkid,
    profilePic,
    contact,
    location,
    price,
    artistType,
    bandMemberName,
    code,
    eventsType,
    genre,
    languages,
    playback,
    original,
    time,
    instruments,
    awards,
    gallery,
    events,
    testLinks,
    reviews,
    blog,
  });

  artist
    .save()
    .then(() => {
      res.redirect("user-dashboard");
    })
    .catch((error) => {
      res.send(error);
    });
});

app.post("/edit-artist", isAuthenticated, async (req, res) => {
  const data = req.body;

  const metaTitle = data.metaTitle;
  const metaDesc = data.metaDesc;
  const keywords = data.keywords;
  const name = data.name;
  const lowerCaseName = name.toLowerCase();
  const linkid = lowerCaseName.replace(/ /g, "-");
  const profilePic = data.profilePic;
  const contact = data.contact;
  const location = data.location;
  const price = data.price;
  const artistType = data.artistType;
  const bandMemberName = data.bandMemberName;
  const code = data.code;
  const eventsType = data.events;
  const genre = data.genre;
  const languages = data.languages;
  const playback = data.playback;
  const original = data.original;
  const time = data.time;
  const instruments = data.instruments;
  const awards = data.awards;
  const gallery = data.galleryLink;
  const eventName = data.eventName;
  const eventType = data.eventType;

  // Function to determine event type based on link
  function getEventType(link) {
    return link.includes("aws") ? "aws" : "youtube";
  }

  // Create the events array
  const events = eventName.map((name, index) => ({
    name: name,
    links: eventType[index],
    type: eventType[index].map((link) => getEventType(link)),
  }));

  const testLinks = data.testLink;
  const reviews = data.review;
  const blog = data.blog;

  const artist = await Artist.updateOne(
    { artistType, linkid },
    {
      metaTitle,
      metaDesc,
      keywords,
      name,
      profilePic,
      contact,
      location,
      price,
      bandMemberName,
      code,
      eventsType,
      genre,
      languages,
      playback,
      original,
      time,
      instruments,
      awards,
      gallery,
      events,
      reviews,
      blog,
    }
  )
    .then(() => {
      res.redirect("/artist/" + artistType + "/" + linkid);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.post("/add-blog", isAuthenticated, (req, res) => {
  const data = req.body;

  const metaTitle = data.metaTitle;
  const metaDesc = data.metaDesc;
  const keywords = data.keywords;
  const title = data.title;
  const thumbnail = data.thumbnail;
  const thumbAlt = data.thumbAlt;
  const thumbTitle = data.thumbTitle;
  const thumbDesc = data.thumbDesc;
  const thumbCap = data.thumbCap;
  const lowerCaseName = title.toLowerCase();
  const linkid = lowerCaseName.replace(/ /g, "-");
  const gallery = data.galleryLink;
  const eventName = data.eventName;
  const eventType = data.eventType;
  const relatedBlog = data.relatedBlog;
  const relatedArtist = data.relatedArtist;
  // Function to determine event type based on link
  function getEventType(link) {
    return link.includes("aws") ? "aws" : "youtube";
  }

  // Create the events array
  const events = eventName.map((name, index) => ({
    name: name,
    links: eventType[index],
    type: eventType[index].map((link) => getEventType(link)),
  }));
  const blog = data.blog;

  const blogs = new Blog({
    metaTitle,
    metaDesc,
    keywords,
    title,
    thumbnail,
    thumbAlt,
    thumbTitle,
    thumbDesc,
    thumbCap,
    linkid,
    gallery,
    events,
    blog,
    relatedBlog,
    relatedArtist,
  });

  blogs
    .save()
    .then(() => {
      res.redirect("/all-blogs");
    })
    .catch((error) => {
      res.send(error);
    });
});

app.post("/add-category", isAuthenticated, (req, res) => {
  const data = req.body;

  const metaTitle = data.metaTitle;
  const metaDesc = data.metaDesc;
  const keywords = data.keywords;
  let category = data.category.toLowerCase().replace(/ /g, "-");
  let subCategory = data.subCategory.toLowerCase().replace(/ /g, "-");
  const title = data.title;
  const thumbnail = data.thumbnail;
  const gallery = data.galleryLink;
  const eventName = data.eventName;
  const eventType = data.eventType;
  const relatedBlog = data.relatedBlog;
  // Function to determine event type based on link
  function getEventType(link) {
    return link.includes("aws") ? "aws" : "youtube";
  }

  // Create the events array
  const events = eventName.map((name, index) => ({
    name: name,
    links: eventType[index],
    type: eventType[index].map((link) => getEventType(link)),
  }));
  const blog = data.blog;

  const artistCategory = new ArtistCategory({
    metaTitle,
    metaDesc,
    keywords,
    category,
    subCategory,
    title,
    thumbnail,
    gallery,
    events,
    blog,
    relatedBlog,
  });

  artistCategory
    .save()
    .then(() => {
      res.redirect("/artist-category/" + category + "/" + subCategory);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.post("/add-event", isAuthenticated, (req, res) => {
  const data = req.body;

  const metaTitle = data.metaTitle;
  const metaDesc = data.metaDesc;
  const keywords = data.keywords;
  let category = data.category.toLowerCase().replace(/ /g, "-");
  let subCategory = data.subCategory.toLowerCase().replace(/ /g, "-");
  const title = data.title;
  const thumbnail = data.thumbnail;
  const gallery = data.galleryLink;
  const eventName = data.eventName;
  const eventType = data.eventType;
  const relatedBlog = data.relatedBlog;
  // Function to determine event type based on link
  function getEventType(link) {
    return link.includes("aws") ? "aws" : "youtube";
  }

  // Create the events array
  const events = eventName.map((name, index) => ({
    name: name,
    links: eventType[index],
    type: eventType[index].map((link) => getEventType(link)),
  }));
  const blog = data.blog;

  const eventCategory = new EventCategory({
    metaTitle,
    metaDesc,
    keywords,
    category,
    subCategory,
    title,
    thumbnail,
    gallery,
    events,
    blog,
    relatedBlog,
  });

  eventCategory
    .save()
    .then(() => {
      res.redirect("/event-category/" + category + "/" + subCategory);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.post("/edit-event", isAuthenticated, async (req, res) => {
  const data = req.body;

  const id = data.id;
  const metaTitle = data.metaTitle;
  const metaDesc = data.metaDesc;
  const keywords = data.keywords;
  let category = data.category.toLowerCase().replace(/ /g, "-");
  let subCategory = data.subCategory.toLowerCase().replace(/ /g, "-");
  const title = data.title;
  const thumbnail = data.thumbnail;
  const gallery = data.galleryLink;
  const eventName = data.eventName;
  const eventType = data.eventType;
  const relatedBlog = data.relatedBlog;
  // Function to determine event type based on link
  function getEventType(link) {
    return link.includes("aws") ? "aws" : "youtube";
  }

  // Create the events array
  const events = eventName.map((name, index) => ({
    name: name,
    links: eventType[index],
    type: eventType[index].map((link) => getEventType(link)),
  }));
  const blog = data.blog;

  const eventCategory = await EventCategory.updateOne(
    { category, subCategory },
    {
      metaTitle,
      metaDesc,
      keywords,
      category,
      subCategory,
      title,
      thumbnail,
      gallery,
      events,
      blog,
      relatedBlog,
    }
  )
    .then(() => {
      res.redirect("/event-category/" + category + "/" + subCategory);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.post("/edit-artist-category", isAuthenticated, async (req, res) => {
  const data = req.body;

  const id = data.id;
  const metaTitle = data.metaTitle;
  const metaDesc = data.metaDesc;
  const keywords = data.keywords;
  let category = data.category.toLowerCase().replace(/ /g, "-");
  let subCategory = data.subCategory.toLowerCase().replace(/ /g, "-");
  const title = data.title;
  const thumbnail = data.thumbnail;
  const gallery = data.galleryLink;
  const eventName = data.eventName;
  const eventType = data.eventType;
  const relatedBlog = data.relatedBlog;
  // Function to determine event type based on link
  function getEventType(link) {
    return link.includes("aws") ? "aws" : "youtube";
  }

  // Create the events array
  const events = eventName.map((name, index) => ({
    name: name,
    links: eventType[index],
    type: eventType[index].map((link) => getEventType(link)),
  }));
  const blog = data.blog;

  const artistCategory = await ArtistCategory.updateOne(
    { category, subCategory },
    {
      metaTitle,
      metaDesc,
      keywords,
      category,
      subCategory,
      title,
      thumbnail,
      gallery,
      events,
      blog,
      relatedBlog,
    }
  )
    .then(() => {
      res.redirect("/artist-category/" + category + "/" + subCategory);
    })
    .catch((error) => {
      res.send(error);
    });
});

// Create a new JWT client using the keys file
const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
]);

async function appendData(data) {
  try {
    await client.authorize();
    const sheets = google.sheets({ version: "v4", auth: client });

    if (!data.budget) {
      data.budget = `${data.startingBudget} - ${data.endingBudget}`;
    }
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1", // Change this to the appropriate sheet name and range
      valueInputOption: "RAW",
      resource: {
        values: [
          [
            data.name,
            data.email,
            data.contact,
            data.location,
            data.eventType,
            data.artistType,
            data.date,
            data.budget,
            data.message,
          ],
        ], // Assuming data is an object with key-value pairs
      },
    });
    console.log("Data inserted successfully:");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

app.post("/contact-form", async (req, res) => {
  const formData = req.body;
  console.log(formData);

  // Checking if contact number is empty or message length is greater than 100
  if (formData.contact === "" || formData.message?.length > 100) {
    // Rendering spam page with status code 403 (Forbidden)
    res.status(403).redirect("/spam");
  } else {
    // Inserting data and rendering success page
    await appendData(formData);
    res.redirect("/success");
  }
});

app.post("/edit-blog", isAuthenticated, async (req, res) => {
  const data = req.body;

  const metaTitle = data.metaTitle;
  const metaDesc = data.metaDesc;
  const keywords = data.keywords;
  const title = data.title;
  const thumbnail = data.thumbnail;
  const thumbCap = data.thumbCap;
  const lowerCaseName = title.toLowerCase();
  const linkid = lowerCaseName.replace(/ /g, "-");
  const gallery = data.galleryLink;
  const eventName = data.eventName;
  const eventType = data.eventType;

  // Function to determine event type based on link
  function getEventType(link) {
    return link.includes("aws") ? "aws" : "youtube";
  }

  // Create the events array
  const events = eventName.map((name, index) => ({
    name: name,
    links: eventType[index],
    type: eventType[index].map((link) => getEventType(link)),
  }));

  const relatedBlog = data.relatedBlog;
  const relatedArtist = data.relatedArtist;
  const blog = data.blog;

  const blogs = await Blog.updateOne(
    { linkid },
    {
      metaTitle,
      metaDesc,
      keywords,
      title,
      thumbnail,
      thumbCap,
      gallery,
      events,
      blog,
      relatedBlog,
      relatedArtist,
    }
  )
    .then(() => {
      res.redirect("/blog/" + linkid);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
