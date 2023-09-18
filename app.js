const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const nodemailer = require('nodemailer');
const Recaptcha = require('express-recaptcha').RecaptchaV3;
const redirections = require('./redirections');

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({ secret: "your-secret-key", resave: true, saveUninitialized: true })
);

// Configure reCAPTCHA with your secret key
const recaptcha = new Recaptcha('6LcO1TAoAAAAAFgMNRsIWJo_RIcv3qI5trmTiRdH', '6LcO1TAoAAAAABTUFWk1LfuVLHugKDSIELY828nB');

mongoose.connect(
  "mongodb+srv://bookanartist2:NRMVq0Q1CJI4xZNa@book-my-singer.da90nao.mongodb.net/",
  { useNewUrlParser: true }
);

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  role: String
});

const User = new mongoose.model("User", userSchema);

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String
});

const Admin = new mongoose.model("Admin", adminSchema);

const artistSchema = new mongoose.Schema({
  metaTitle: String,
  metaDesc: String,
  keywords: String,
  linkid: String,
  name: String,
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
  gallery: Array,
  events: Array,
  blog: String,
  relatedBlog: Array
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
  relatedBlog: Array
});

const ArtistCategory = new mongoose.model("ArtistCategory", artistCategorySchema);

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
  relatedBlog: Array
});

const EventCategory = new mongoose.model("EventCategory", eventCategorySchema);


function isAuthenticated(req, res, next) {
  if (req.session.user.role === "admin" || req.session.user.role === "user") {
    return next();
  }
  res.redirect("/login"); // Redirect unauthorized users
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
    artists
  })
});

app.get("/artist-category/:category/:subCategory", async (req, res) => {
  try {
    const { category, subCategory } = req.params;

    // Fetch artist from the database based on artistType and linkid
    const artistCategory = await ArtistCategory.findOne({ category, subCategory });

    if (artistCategory) {
      // Render the "singer" view and pass the artist's information
      res.render('category', { artistCategory });
    } else {
      // Redirect to the login page if artist is not found
      res.redirect('/login');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get("/event-category/:category/:subCategory", async (req, res) => {
  try {
    const { category, subCategory } = req.params;

    // Fetch artist from the database based on artistType and linkid
    const eventCategory = await EventCategory.findOne({ category, subCategory });

    if (eventCategory) {
      // Render the "singer" view and pass the artist's information
      res.render('event', { eventCategory });
    } else {
      // Redirect to the login page if artist is not found
      res.redirect('/login');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get("/all-artists", async (req, res) => {
  const artists = await Artist.find({}).sort({ _id: -1 });

  res.render("allArtists", {
    artists
  })
});

app.get("/all-blogs", async (req, res) => {
  const blogs = await Blog.find({}).sort({ _id: -1 });

  res.render("allBlogs", {
    blogs
  })
});

app.get("/blog", async (req, res) => {
  const blogs = await Blog.find({}).sort({ _id: -1 });

  res.render("blog-list", {
    blogs
  })
});

app.get("/artist/:artistType/:linkid", async (req, res) => {
  try {
    const { artistType, linkid } = req.params;

    // Fetch artist from the database based on artistType and linkid
    const artist = await Artist.findOne({ artistType, linkid });

    if (artist) {
      // Render the "singer" view and pass the artist's information
      res.render('singer', { artist });
    } else {
      // Redirect to the login page if artist is not found
      res.redirect('/login');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get("/blog/:linkid", async (req, res) => {
  try {
    const { linkid } = req.params;

    const blog = await Blog.findOne({ linkid });
    const relatedBlogData = [];

    if (blog.relatedBlog.length > 1) {
      for (const linkId of blog.relatedBlog) {
        const blogDocument = await Blog.findOne({ linkId });
        if (blogDocument) {
          relatedBlogData.push(blogDocument);
        }
      }
    }

    if (blog) {
      res.render('blog', { blog, relatedBlogData });
    } else {
      res.redirect('/');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get("/edit-blog/:linkid", async (req, res) => {
  try {
    const { linkid } = req.params;

    const blog = await Blog.findOne({ linkid });
    const relatedBlogData = [];

    for (const linkId of blog.relatedBlog) {
      const blogDocument = await Blog.findOne({ linkId });
      if (blogDocument) {
        relatedBlogData.push(blogDocument);
      }
    }
    if (blog) {
      res.render('edit-blog', { blog, relatedBlogData });
    } else {
      res.redirect('/');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get("/user-dashboard", isAuthenticated, (req, res) => {
  res.render("user-dashboard");
});

app.get('*', (req, res) => {
  res.redirect('/');
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({ username });
  if (user) {
    if ((await password) === user.password) {
      req.session.user = user;
      res.render("user-dashboard", {
        user
      });
    }
  } else {
    res.send("Wrong Password");
  }
});

app.post("/add-artist", isAuthenticated, (req, res) => {
  const data = req.body;

  const metaTitle = data.metaTitle;
  const metaDesc = data.metaDesc;
  const keywords = data.keywords;
  const name = data.name;
  const lowerCaseName = name.toLowerCase();
  const linkid = lowerCaseName.replace(/ /g, '-');
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
    return link.includes('aws') ? 'aws' : 'youtube';
  }

  // Create the events array
  const events = eventName.map((name, index) => ({
    name: name,
    links: eventType[index],
    type: eventType[index].map(link => getEventType(link))
  }));

  const testLinks = data.testLink;
  const reviews = data.review;
  const blog = data.blog;

  const artist = new Artist({
    metaTitle, metaDesc, keywords, name, linkid, profilePic,
    contact, location, price, artistType, bandMemberName, code, eventsType, genre,
    languages, playback, original, time, instruments, awards,
    gallery, events, testLinks, reviews, blog
  });

  artist.save().then(() => {
    res.redirect("user-dashboard")
  }).catch((error) => {
    res.send(error)
  });
});

app.post("/add-blog", (req, res) => {
  const data = req.body;

  const metaTitle = data.metaTitle;
  const metaDesc = data.metaDesc;
  const keywords = data.keywords;
  const title = data.title;
  const thumbnail = data.thumbnail;
  const lowerCaseName = title.toLowerCase();
  const linkid = lowerCaseName.replace(/ /g, '-');
  const gallery = data.galleryLink;
  const eventName = data.eventName;
  const eventType = data.eventType;
  const relatedBlog = data.relatedBlog;
  // Function to determine event type based on link
  function getEventType(link) {
    return link.includes('aws') ? 'aws' : 'youtube';
  }

  // Create the events array
  const events = eventName.map((name, index) => ({
    name: name,
    links: eventType[index],
    type: eventType[index].map(link => getEventType(link))
  }));
  const blog = data.blog;

  const blogs = new Blog({
    metaTitle, metaDesc, keywords, title, thumbnail, linkid, gallery, events, blog, relatedBlog
  });

  blogs.save().then(() => {
    res.redirect("/all-blogs")
  }).catch((error) => {
    res.send(error)
  });
});

app.post("/add-category", (req, res) => {
  const data = req.body;

  const metaTitle = data.metaTitle;
  const metaDesc = data.metaDesc;
  const keywords = data.keywords;
  let category = data.category.toLowerCase().replace(/ /g, '-');
  let subCategory = data.subCategory.toLowerCase().replace(/ /g, '-');
  const title = data.title;
  const thumbnail = data.thumbnail;
  const gallery = data.galleryLink;
  const eventName = data.eventName;
  const eventType = data.eventType;
  const relatedBlog = data.relatedBlog;
  // Function to determine event type based on link
  function getEventType(link) {
    return link.includes('aws') ? 'aws' : 'youtube';
  }

  // Create the events array
  const events = eventName.map((name, index) => ({
    name: name,
    links: eventType[index],
    type: eventType[index].map(link => getEventType(link))
  }));
  const blog = data.blog;

  const artistCategory = new ArtistCategory({
    metaTitle, metaDesc, keywords, category, subCategory, title, thumbnail, gallery, events, blog, relatedBlog
  });

  artistCategory.save().then(() => {
    res.redirect("/artist-category/" + category + "/" + subCategory)
  }).catch((error) => {
    res.send(error)
  });
});

app.post("/add-event", (req, res) => {
  const data = req.body;

  const metaTitle = data.metaTitle;
  const metaDesc = data.metaDesc;
  const keywords = data.keywords;
  let category = data.category.toLowerCase().replace(/ /g, '-');
  let subCategory = data.subCategory.toLowerCase().replace(/ /g, '-');
  const title = data.title;
  const thumbnail = data.thumbnail;
  const gallery = data.galleryLink;
  const eventName = data.eventName;
  const eventType = data.eventType;
  const relatedBlog = data.relatedBlog;
  // Function to determine event type based on link
  function getEventType(link) {
    return link.includes('aws') ? 'aws' : 'youtube';
  }

  // Create the events array
  const events = eventName.map((name, index) => ({
    name: name,
    links: eventType[index],
    type: eventType[index].map(link => getEventType(link))
  }));
  const blog = data.blog;

  const eventCategory = new EventCategory({
    metaTitle, metaDesc, keywords, category, subCategory, title, thumbnail, gallery, events, blog, relatedBlog
  });

  eventCategory.save().then(() => {
    res.redirect("/event-category/" + category + "/" + subCategory)
  }).catch((error) => {
    res.send(error)
  });
});

app.post('/contact-form', recaptcha.middleware.verify, (req, res) => {
  if (!req.recaptcha.error) {
    const formData = req.body;

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., Gmail
      auth: {
        user: 'bookanartist2@gmail.com',
        pass: 'omxn rmun oufa olvm',
      },
    });

    // Email data
    const mailOptions = {
      from: formData.email, // Sender's email address
      to: 'yogendra12355@gmail.com', // Your email address
      subject: 'Contact Form Submission',
      text: `Name: ${formData.name}\nEmail: ${formData.email}\nContact Number: ${formData.contact}\nEvent City: ${formData.city}\nEvent Type: ${formData.eventType}\nArtist Type: ${formData.artistType}\nEvent Date: ${formData.date}\nBudget: ${formData.budget}\nMessage: ${formData.message}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        res.send('Message sent successfully');
      }
    });
  } else {
    // Verification failed; display an error message
    res.status(400).send('reCAPTCHA verification failed. Please try again.');
  }
});

app.post("/edit-blog", async (req, res) => {
  const data = req.body;

  const metaTitle = data.metaTitle;
  const metaDesc = data.metaDesc;
  const keywords = data.keywords;
  const title = data.title;
  const thumbnail = data.thumbnail;
  const lowerCaseName = title.toLowerCase();
  const linkid = lowerCaseName.replace(/ /g, '-');
  const gallery = data.galleryLink;
  const relatedBlog = data.relatedBlog;
  const blog = data.blog;

  const blogs = await Blog.updateOne(
    { linkid },
    {
      metaTitle, metaDesc, keywords, title, thumbnail, gallery, blog, relatedBlog
    }
  ).then(() => {
    res.redirect("/blog/" + linkid);
  }).catch((error) => {
    res.send(error)
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
