const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const nodemailer = require("nodemailer");
const cors = require("cors");
const Recaptcha = require("express-recaptcha").RecaptchaV3;
const redirections = require("./redirections");
const fs = require("fs");
const socketIo = require("socket.io");

const { google } = require("googleapis");
const keys = require("./secrets.json");

const spreadsheetId = "1e0LVQGWxSNtwtIaGRIqnBXFttMY5sNbo_Dd8H9A5rtY";

const app = express();
const io = socketIo(server, {
  cors: {
    origin: [
      "http://localhost:3001",
      "http://localhost:3002",
      "https://5lq8djtf-3001.inc1.devtunnels.ms",
      "https://gigsar.vercel.app",
      "https://www.gigsar.com",
      "https://gigsar-admin.vercel.app",
      "https://admin.gigsar.com",
      "https://artist.gigsar.com",
    ],
    methods: ["GET", "POST"],
  },
});
const corsOptions = {
  origin: [
    "http://localhost:3001",
    "http://localhost:3002",
    "https://5lq8djtf-3001.inc1.devtunnels.ms",
    "https://gigsar.vercel.app",
    "https://www.gigsar.com",
    "https://gigsar-admin.vercel.app",
    "https://admin.gigsar.com",
    "https://artist.gigsar.com",
  ], // Add your additional domain here
  methods: ["GET", "POST"],
  credentials: true, //access-control-allow-credentials:true
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
  email: String,
  location: String,
  price: String,
  corporateBudget: String,
  collegeBudget: String,
  singerCumGuitaristBudget: String,
  singerPlusGuitaristBudget: String,
  ticketingConcertBudget: String,
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
  instagram: String,
  facebook: String,
  youtube: String,
  spotify: String,
  training: String,
  gallery: Array,
  events: Array,
  testLinks: Array,
  reviews: Array,
  blog: String,
  showBookMySinger: Boolean,
  showGigsar: Boolean,
  isPending: Boolean,
  clerkId: String,
  busyDates: Array,
});

const Artist = new mongoose.model("Artist", artistSchema);

const clientSchema = new mongoose.Schema({
  name: String,
  contact: String,
  email: String,
  type: String,
  messages: [
    {
      artistId: String,
      message: [
        {
          content: String,
          time: Date,
          isSenderMe: Boolean,
          isUnread: Boolean,
        },
      ],
    },
  ],
});

const Client = new mongoose.model("Client", clientSchema);

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

app.get("/landing-page-1", (req, res) => {
  res.render("landing-page-1");
});

app.get("/landing-page-2", (req, res) => {
  res.render("landing-page-2");
});

app.get("/landing-page-3", (req, res) => {
  res.render("landing-page-3");
});

app.get("/landing-page-4", (req, res) => {
  res.render("landing-page-4");
});

app.get("/landing-page-5", (req, res) => {
  res.render("landing-page-5");
});

app.get("/contact", (req, res) => {
  res.render("contact-us.ejs");
});

app.get("/sitemap.xml", (req, res) => {
  fs.readFile("./sitemap.xml", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading sitemap.xml:", err);
      return res.status(500).send("Internal Server Error");
    }
    // Render the XML using EJS
    const renderedXML = ejs.render(data, {
      /* optional: pass data if needed */
    });

    // Set response headers
    res.header("Content-Type", "application/xml");

    // Send the rendered XML as response
    res.send(renderedXML);
  });
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
  const artists = await Artist.find({ showBookMySinger: true }).sort({
    _id: -1,
  });

  res.render("artist", {
    artists,
  });
});

app.get("/api/admin-get-message", async (req, res) => {
  try {
    // Fetch all clients with their messages
    const clients = await Client.find({}, "name contact email messages");

    // If no clients are found, return an empty array
    if (!clients) {
      console.log("No clients found");
      return res.status(404).json({ messages: [] });
    }

    // Prepare the data in a format suitable for the chat interface
    const allMessages = clients.map((client) => {
      return {
        clientId: client._id,
        clientName: client.name,
        clientContact: client.contact,
        clientEmail: client.email,
        messages: client.messages,
      };
    });

    // Send the fetched messages as a response
    res.status(200).json({ allMessages: allMessages });
  } catch (error) {
    console.error("Error fetching all messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// When a client connects to Socket.io
io.on("connection", (socket) => {
  console.log("New client connected");

  // Listen for a new message event
  socket.on("sendMessage", async (data) => {
    const { contact, artistId, message } = data;

    try {
      // Find the client and update their messages
      const client = await Client.findOne({ contact: contact });

      if (client) {
        const artistMessage = client.messages.find(
          (msg) => msg.artistId === artistId
        );

        if (artistMessage) {
          artistMessage.message.push(message);
        } else {
          client.messages.push({
            artistId: artistId,
            message: [message],
          });
        }

        await client.save();

        // Emit the new message event to all connected clients
        io.emit("newMessage", { contact, artistId, message });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  // Handle client disconnect
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.get("/artist-registration", (req, res) => {
  res.render("artist-registration");
});

app.get("/api/artist-count", async (req, res) => {
  try {
    const artistCount = await Artist.countDocuments();
    res.status(200).json({ count: artistCount });
  } catch (error) {
    console.error("Error fetching artist count:", error);
    res.status(500).send("Error fetching artist count");
  }
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

app.get("/api/artist/contact/:contact", async (req, res) => {
  const { contact } = req.params;
  const artist = await Artist.findOne({ contact });
  res.status(200).json(artist);
});

app.get("/api/client/contact/:contact", async (req, res) => {
  const { contact } = req.params;
  const client = await Client.findOne({ contact });
  res.status(200).json(client);
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
    artists: artists,
  });
});

app.post("/edit-artist-status/:artistId", async (req, res) => {
  const artistId = req.params.artistId;
  try {
    // Find the artist by ID
    const artist = await Artist.findById(artistId);

    // Toggle the value of showBookMySinger
    artist.showBookMySinger = !artist.showBookMySinger;

    // Save the updated artist
    await artist.save();

    // Respond with a success message
    res.json({ success: true });
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred while updating artist status",
    });
  }
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
    const artist = await Artist.findOne({
      artistType,
      linkid,
      showBookMySinger: true,
    });

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

app.get("/success-1", (req, res) => {
  res.render("success");
});

app.get("/success-2", (req, res) => {
  res.render("success");
});

app.get("/success-3", (req, res) => {
  res.render("success");
});

app.get("/success-4", (req, res) => {
  res.render("success");
});

app.get("/success-5", (req, res) => {
  res.render("success");
});

app.get("/spam", (req, res) => {
  res.render("spam");
});

app.get("/enquiry", (req, res) => {
  res.render("enquire");
});

app.get("/enquiry-form-1", (req, res) => {
  res.render("enquire-1");
});

app.get("/enquiry-form-2", (req, res) => {
  res.render("enquire-2");
});

app.get("/enquiry-form-3", (req, res) => {
  res.render("enquire-3");
});

app.get("/enquiry-form-4", (req, res) => {
  res.render("enquire-4");
});

app.get("/enquiry-form-5", (req, res) => {
  res.render("enquire-5");
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

function arrayToString(arr) {
  // Join array elements with ", " separator
  return arr?.join(", ");
}

app.post("/api/busyDates/:_id", async (req, res) => {
  const { _id } = req.params;
  const busyDates = req.body.busyDates;
  console.log(busyDates);

  try {
    const artistData = {
      busyDates,
    };

    const result = await Artist.updateOne(
      { _id },
      { $set: artistData } // Use $set to update only the provided fields
    );

    if (result.nModified === 0) {
      throw new Error("No documents were updated");
    }

    console.log("Artist edited successfully");
    res.status(200).send("Artist edited successfully");
  } catch (error) {
    console.error("Error editing artist:", error);
    res
      .status(500)
      .send(error.message || "An error occurred while updating the artist");
  }
});

app.post("/api/artist-direct-registration", async (req, res) => {
  const data = req.body;
  const clerkId = data.clerkId || "";
  const name = data.artistName;
  const metaTitle = `Hire ${name} from Book My Singer`;
  const metaDesc = `Hire ${name} for ${arrayToString(
    data.eventTypes
  )} from Book My Singer`;
  const lowerCaseName = name.toLowerCase();
  const linkid = lowerCaseName.replace(/ /g, "-");
  const profilePic = data.profilePic;
  const gender = data.gender;
  const contact = data.contactNumber;
  const email = data.email;
  const location = data.location;
  const artistType = data.artistType;
  const showBookMySinger = data.showBookMySinger;
  const showGigsar = data.showGigsar;

  try {
    // Find the last added artist and get its code
    let code;
    Artist.find({}).then(async (data) => {
      const dataArray = data.map((item) => item.toObject()); // convert Mongoose object to plain object
      const lastValue = dataArray[dataArray.length - 1];
      const previousCode = lastValue.code;
      console.log(`Previous Artist Code = ${previousCode}`);
      code = (parseInt(previousCode) + 1).toString();
      console.log(`New Artist Code = ${code}`);

      const artist = new Artist({
        metaTitle,
        metaDesc,
        clerkId,
        name,
        gender,
        linkid,
        profilePic,
        contact,
        email,
        location,
        artistType,
        code,
        showBookMySinger,
        showGigsar,
        isPending: true,
      });

      await artist.save();
      console.log("Profile Created Successfully");
      res.status(200).send("Profile Created Successfully");
    });
  } catch (error) {
    console.error("Error saving artist:", error);
    res.status(500).send("Error creating profile");
  }
});

app.post("/api/client-registration", async (req, res) => {
  const data = req.body;
  const name = data.name;
  const contact = data.contact;
  const email = data.email;
  const type = data.type;

  try {
    const client = new Client({
      name,
      contact,
      email,
      type,
    });

    await client.save();
    console.log("Client Profile Created Successfully");
    res.status(200).send("Client Profile Created Successfully");
  } catch (error) {
    console.error("Error creating Client:", error);
    res.status(500).send("Error creating client");
  }
});

app.post("/api/client-message", async (req, res) => {
  const {
    linkid,
    contact,
    selectedCategory,
    selectedGenre,
    selectedLocation,
    selectedEventType,
    selectedDate,
    selectedLanguage,
    selectedInstrument,
    selectedGender,
    selectedMinBudget,
    selectedMaxBudget,
  } = req.body;

  let messageContent = "";

  if (selectedCategory.length > 1)
    messageContent += `Category: ${selectedCategory}\n`;
  if (selectedGenre.length > 1) messageContent += `Genre: ${selectedGenre}\n`;
  if (selectedLocation.length > 1)
    messageContent += `Location: ${selectedLocation}\n`;
  if (selectedEventType.length > 1)
    messageContent += `Event Type: ${selectedEventType}\n`;
  if (selectedDate.length > 1) messageContent += `Date: ${selectedDate}\n`;
  if (selectedLanguage.length > 1)
    messageContent += `Language: ${selectedLanguage}\n`;
  if (selectedInstrument.length > 1)
    messageContent += `Instrument: ${selectedInstrument}\n`;
  if (selectedGender.length > 1)
    messageContent += `Gender: ${selectedGender}\n`;
  if (selectedMinBudget.length > 1)
    messageContent += `Min Budget: ${selectedMinBudget}\n`;
  if (selectedMaxBudget.length > 1)
    messageContent += `Max Budget: ${selectedMaxBudget}\n`;

  try {
    const client = await Client.findOne({ contact });

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    const newMessage = {
      artistId: linkid,
      message: [
        {
          content: messageContent,
          time: new Date(),
          isSenderMe: true,
          isUnread: false,
        },
      ],
    };

    // Check if there's already a message with the same artistId
    const existingMessage = client.messages.find(
      (msg) => msg.artistId === linkid
    );

    if (existingMessage) {
      existingMessage.message.push(newMessage.message[0]);
    } else {
      client.messages.push(newMessage);
    }

    await client.save();
    console.log("Client Message send successfully");
    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/client-custom-message", async (req, res) => {
  const { contact, artistId, message } = req.body;

  try {
    // Find the client by contact
    const client = await Client.findOne({ contact });

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Find the artist's messages array within the client's messages
    const artistMessages = client.messages.find(
      (msg) => msg.artistId === artistId
    );

    if (artistMessages) {
      // If messages exist for this artist, append the new message
      artistMessages.message.push(message);
    } else {
      // If no messages exist for this artist, create a new message array
      client.messages.push({
        artistId,
        message: [message],
      });
    }

    // Save the updated client document
    await client.save();

    res.status(200).json({ message: "Message added successfully" });
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/admin-custom-message", async (req, res) => {
  const { contact, artistId, message } = req.body;

  try {
    // Find the client by contact
    const client = await Client.findOne({ contact });

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Find the artist's messages array within the client's messages
    const artistMessages = client.messages.find(
      (msg) => msg.artistId === artistId
    );

    if (artistMessages) {
      // If messages exist for this artist, append the new message
      artistMessages.message.push(message);
    } else {
      // If no messages exist for this artist, create a new message array
      client.messages.push({
        artistId,
        message: [message],
      });
    }

    // Save the updated client document
    await client.save();

    res.status(200).json({ message: "Message added successfully" });
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/artist-registration", async (req, res) => {
  const data = req.body;
  const clerkId = data.clerkId || "";
  const name = data.artistName;
  const metaTitle = `Hire ${name} from Book My Singer`;
  const metaDesc = `Hire ${name} for ${arrayToString(
    data.eventTypes
  )} from Book My Singer`;
  const lowerCaseName = name.toLowerCase();
  const linkid = lowerCaseName.replace(/ /g, "-");
  const profilePic = data.profilePic;
  const gender = data.gender;
  const contact = data.contactNumber;
  const email = data.email;
  const location = data.location;
  const artistType = data.artistType;
  const eventsType = arrayToString(data.eventTypes);
  const genre = arrayToString(data.genres);
  const languages = arrayToString(data.languages);
  const original = data.originalSongName;
  const time = data.performanceTime;
  const instruments = arrayToString(data.instruments);
  const awards = data.awards;
  const instagram = data.instagramLink;
  const facebook = data.facebookLink;
  const weddingLink = data.weddingLink;
  const corporateLink = data.corporateLink;
  const collegeLink = data.collegeLink;
  const concertLink = data.concertLink;
  const originalLink = data.originalLink;
  const bollywoodLink = data.bollywoodLink;
  const coverLink = data.coverLink;
  const spotify = data.spotifyLink;
  const training = data.musicTraining;
  const gallery = data.galleryLink;
  const blog = data.aboutArtist;
  const youtube = data.youtubeLink;
  const price = data.weddingBudget;
  const corporateBudget = data.corporateBudget;
  const collegeBudget = data.collegeBudget;
  const singerCumGuitaristBudget = data.singerCumGuitaristBudget;
  const singerPlusGuitaristBudget = data.singerPlusGuitaristBudget;
  const ticketingConcertBudget = data.ticketingConcertBudget;
  const showBookMySinger = data.showBookMySinger;
  const showGigsar = data.showGigsar;

  try {
    // Find the last added artist and get its code
    let code;
    Artist.find({}).then(async (data) => {
      const dataArray = data.map((item) => item.toObject()); // convert Mongoose object to plain object
      const lastValue = dataArray[dataArray.length - 1];
      const previousCode = lastValue.code;
      console.log(`Previous Artist Code = ${previousCode}`);
      code = (parseInt(previousCode) + 1).toString();
      console.log(`New Artist Code = ${code}`);

      let galleryObjects = gallery.map((link) => {
        return { link: link };
      });

      function getEventType(link) {
        return link.includes("aws") ? "aws" : "youtube";
      }

      let events = [
        {
          name: "Wedding Videos",
          links: weddingLink,
          type: weddingLink.map((link) => getEventType(link)),
        },
        {
          name: "Corporate Videos",
          links: corporateLink,
          type: corporateLink.map((link) => getEventType(link)),
        },
        {
          name: "College Videos",
          links: collegeLink,
          type: collegeLink.map((link) => getEventType(link)),
        },
        {
          name: "Ticketing Concert Videos",
          links: concertLink,
          type: concertLink.map((link) => getEventType(link)),
        },
        {
          name: "Original Videos",
          links: originalLink,
          type: originalLink.map((link) => getEventType(link)),
        },
        {
          name: "Bollywood Playback Videos",
          links: bollywoodLink,
          type: bollywoodLink.map((link) => getEventType(link)),
        },
        {
          name: "Cover Videos",
          links: coverLink,
          type: coverLink.map((link) => getEventType(link)),
        },
        {
          name: "Cafe/Clubs Videos",
          links: data.cafeLink,
          type: data.cafeLink.map((link) => getEventType(link)),
        },
        {
          name: "House Party Videos",
          links: data.houseLink,
          type: data.houseLink.map((link) => getEventType(link)),
        },
      ];

      const artist = new Artist({
        metaTitle,
        metaDesc,
        clerkId,
        name,
        gender,
        linkid,
        profilePic,
        bandMemberName: "",
        contact,
        email,
        location,
        price,
        corporateBudget,
        collegeBudget,
        singerCumGuitaristBudget,
        singerPlusGuitaristBudget,
        ticketingConcertBudget,
        artistType,
        code,
        eventsType,
        genre,
        languages,
        original,
        time,
        instruments,
        awards,
        instagram,
        facebook,
        youtube,
        spotify,
        training,
        gallery: galleryObjects,
        events,
        blog,
        showBookMySinger,
        showGigsar,
      });

      await artist.save();
      console.log("Profile Created Successfully");
      res.status(200).send("Profile Created Successfully");
    });
  } catch (error) {
    console.error("Error saving artist:", error);
    res.status(500).send("Error creating profile");
  }
});

app.post("/api/edit-basic-details/:_id", async (req, res) => {
  const { _id } = req.params;
  const data = req.body;

  const name = data.artistName;
  const lowerCaseName = name.toLowerCase();
  const linkid = lowerCaseName.replace(/ /g, "-");

  try {
    const artistData = {
      name,
      linkid,
      profilePic: data.profilePic,
      gender: data.gender,
      contact: data.contactNumber,
      email: data.email,
      location: data.location,
      artistType: data.artistType,
    };

    const result = await Artist.updateOne(
      { _id },
      { $set: artistData } // Use $set to update only the provided fields
    );

    if (result.nModified === 0) {
      throw new Error("No documents were updated");
    }

    console.log("Artist edited successfully");
    res.status(200).send("Artist edited successfully");
  } catch (error) {
    console.error("Error editing artist:", error);
    res
      .status(500)
      .send(error.message || "An error occurred while updating the artist");
  }
});

app.post("/api/edit-gallery/:_id", async (req, res) => {
  const { _id } = req.params;
  const data = req.body;

  try {
    const galleryObjects = data.galleryLink.map((link) => ({ link }));

    const artistData = {
      gallery: galleryObjects,
    };

    const result = await Artist.updateOne(
      { _id },
      { $set: artistData } // Use $set to update only the provided fields
    );

    if (result.nModified === 0) {
      throw new Error("No documents were updated");
    }

    console.log("Artist edited successfully");
    res.status(200).send("Artist edited successfully");
  } catch (error) {
    console.error("Error editing artist:", error);
    res
      .status(500)
      .send(error.message || "An error occurred while updating the artist");
  }
});

function getEventType(link) {
  return link.includes("aws") ? "aws" : "youtube";
}

app.post("/api/edit-event-videos/:_id", async (req, res) => {
  const { _id } = req.params;
  const data = req.body;

  try {
    const events = [
      {
        name: "Wedding Videos",
        links: data.weddingLink,
        type: data.weddingLink.map((link) => getEventType(link)),
      },
      {
        name: "Corporate Videos",
        links: data.corporateLink,
        type: data.corporateLink.map((link) => getEventType(link)),
      },
      {
        name: "College Videos",
        links: data.collegeLink,
        type: data.collegeLink.map((link) => getEventType(link)),
      },
      {
        name: "Ticketing Concert Videos",
        links: data.concertLink,
        type: data.concertLink.map((link) => getEventType(link)),
      },
      {
        name: "Original Videos",
        links: data.originalLink,
        type: data.originalLink.map((link) => getEventType(link)),
      },
      {
        name: "Bollywood Playback Videos",
        links: data.bollywoodLink,
        type: data.bollywoodLink.map((link) => getEventType(link)),
      },
      {
        name: "Cover Videos",
        links: data.coverLink,
        type: data.coverLink.map((link) => getEventType(link)),
      },
      {
        name: "Cafe/Clubs Videos",
        links: data.cafeLink,
        type: data.cafeLink.map((link) => getEventType(link)),
      },
      {
        name: "House Party Videos",
        links: data.houseLink,
        type: data.houseLink.map((link) => getEventType(link)),
      },
    ];

    const artistData = {
      events,
    };

    const result = await Artist.updateOne(
      { _id },
      { $set: artistData } // Use $set to update only the provided fields
    );

    if (result.nModified === 0) {
      throw new Error("No documents were updated");
    }

    console.log("Artist edited successfully");
    res.status(200).send("Artist edited successfully");
  } catch (error) {
    console.error("Error editing artist:", error);
    res
      .status(500)
      .send(error.message || "An error occurred while updating the artist");
  }
});

app.post("/api/edit-event-type/:_id", async (req, res) => {
  const { _id } = req.params;
  const data = req.body;

  // Helper function to convert arrays to strings
  const arrayToString = (array) => array?.join(", ");

  try {
    const artistData = {
      price: data.weddingBudget,
      corporateBudget: data.corporateBudget,
      collegeBudget: data.collegeBudget,
      singerCumGuitaristBudget: data.singerCumGuitaristBudget,
      singerPlusGuitaristBudget: data.singerPlusGuitaristBudget,
      ticketingConcertBudget: data.ticketingConcertBudget,
      eventsType: arrayToString(data.eventTypes),
    };

    const result = await Artist.updateOne(
      { _id },
      { $set: artistData } // Use $set to update only the provided fields
    );

    if (result.nModified === 0) {
      throw new Error("No documents were updated");
    }

    console.log("Artist edited successfully");
    res.status(200).send("Artist edited successfully");
  } catch (error) {
    console.error("Error editing artist:", error);
    res
      .status(500)
      .send(error.message || "An error occurred while updating the artist");
  }
});

app.post("/api/edit-genre/:_id", async (req, res) => {
  const { _id } = req.params;
  const data = req.body;

  // Helper function to convert arrays to strings
  const arrayToString = (array) => array?.join(", ");

  try {
    const artistData = {
      genre: arrayToString(data.genres),
    };

    const result = await Artist.updateOne(
      { _id },
      { $set: artistData } // Use $set to update only the provided fields
    );

    if (result.nModified === 0) {
      throw new Error("No documents were updated");
    }

    console.log("Artist edited successfully");
    res.status(200).send("Artist edited successfully");
  } catch (error) {
    console.error("Error editing artist:", error);
    res
      .status(500)
      .send(error.message || "An error occurred while updating the artist");
  }
});

app.post("/api/edit-instruments/:_id", async (req, res) => {
  const { _id } = req.params;
  const data = req.body;

  // Helper function to convert arrays to strings
  const arrayToString = (array) => array?.join(", ");

  try {
    const artistData = {
      instruments: arrayToString(data.instruments),
    };

    const result = await Artist.updateOne(
      { _id },
      { $set: artistData } // Use $set to update only the provided fields
    );

    if (result.nModified === 0) {
      throw new Error("No documents were updated");
    }

    console.log("Artist edited successfully");
    res.status(200).send("Artist edited successfully");
  } catch (error) {
    console.error("Error editing artist:", error);
    res
      .status(500)
      .send(error.message || "An error occurred while updating the artist");
  }
});

app.post("/api/edit-other-details/:_id", async (req, res) => {
  const { _id } = req.params;
  const data = req.body;

  try {
    const artistData = {
      original: data.originalSongName,
      time: data.performanceTime,
      awards: data.awards,
      instagram: data.instagramLink,
      facebook: data.facebookLink,
      youtube: data.youtubeLink,
      spotify: data.spotifyLink,
      training: data.musicTraining,
      blog: data.aboutArtist,
    };

    const result = await Artist.updateOne(
      { _id },
      { $set: artistData } // Use $set to update only the provided fields
    );

    if (result.nModified === 0) {
      throw new Error("No documents were updated");
    }

    console.log("Artist edited successfully");
    res.status(200).send("Artist edited successfully");
  } catch (error) {
    console.error("Error editing artist:", error);
    res
      .status(500)
      .send(error.message || "An error occurred while updating the artist");
  }
});

app.post("/api/edit-artist/:_id", async (req, res) => {
  const { _id } = req.params;
  const data = req.body;

  // Helper function to convert arrays to strings
  const arrayToString = (array) => array?.join(", ");

  try {
    const name = data.artistName;
    const metaTitle = `Hire ${name} from Book My Singer`;
    const metaDesc = `Hire ${name} for ${arrayToString(
      data.eventTypes
    )} from Book My Singer`;
    const lowerCaseName = name.toLowerCase();
    const linkid = lowerCaseName.replace(/ /g, "-");

    const galleryObjects = data.galleryLink.map((link) => ({ link }));

    function getEventType(link) {
      return link.includes("aws") ? "aws" : "youtube";
    }

    const events = [
      {
        name: "Wedding Videos",
        links: data.weddingLink,
        type: data.weddingLink.map((link) => getEventType(link)),
      },
      {
        name: "Corporate Videos",
        links: data.corporateLink,
        type: data.corporateLink.map((link) => getEventType(link)),
      },
      {
        name: "Ticketing Concert Videos",
        links: data.concertLink,
        type: data.concertLink.map((link) => getEventType(link)),
      },
      {
        name: "Original Videos",
        links: data.originalLink,
        type: data.originalLink.map((link) => getEventType(link)),
      },
      {
        name: "Bollywood Playback Videos",
        links: data.bollywoodLink,
        type: data.bollywoodLink.map((link) => getEventType(link)),
      },
      {
        name: "Cover Videos",
        links: data.coverLink,
        type: data.coverLink.map((link) => getEventType(link)),
      },
      {
        name: "Cafe/Clubs Videos",
        links: data.cafeLink,
        type: data.cafeLink.map((link) => getEventType(link)),
      },
      {
        name: "House Party Videos",
        links: data.houseLink,
        type: data.houseLink.map((link) => getEventType(link)),
      },
    ];

    const artistData = {
      metaTitle,
      metaDesc,
      name,
      gender: data.gender,
      linkid,
      profilePic: data.profilePic,
      bandMemberName: "",
      contact: data.contactNumber,
      email: data.email,
      location: data.location,
      price: data.weddingBudget,
      corporateBudget: data.corporateBudget,
      collegeBudget: data.collegeBudget,
      singerCumGuitaristBudget: data.singerCumGuitaristBudget,
      singerPlusGuitaristBudget: data.singerPlusGuitaristBudget,
      ticketingConcertBudget: data.ticketingConcertBudget,
      artistType: data.artistType,
      eventsType: arrayToString(data.eventTypes),
      genre: arrayToString(data.genres),
      languages: arrayToString(data.languages),
      original: data.originalSongName,
      time: data.performanceTime,
      instruments: arrayToString(data.instruments),
      awards: data.awards,
      instagram: data.instagramLink,
      facebook: data.facebookLink,
      youtube: data.youtubeLink,
      spotify: data.spotifyLink,
      training: data.musicTraining,
      gallery: galleryObjects,
      events,
      blog: data.aboutArtist,
    };

    const result = await Artist.updateOne(
      { _id },
      { $set: artistData } // Use $set to update only the provided fields
    );

    if (result.nModified === 0) {
      throw new Error("No documents were updated");
    }

    console.log("Artist edited successfully");
    res.redirect(`/artist/${data.artistType}/${linkid}`);
  } catch (error) {
    console.error("Error editing artist:", error);
    res
      .status(500)
      .send(error.message || "An error occurred while updating the artist");
  }
});

app.post("/api/change-status", async (req, res) => {
  const { _id } = req.body;

  try {
    // Find the artist by _id
    const artist = await Artist.findById(_id);

    if (!artist) {
      return res.status(404).json({ error: "Artist not found" });
    }

    // Toggle the value of showGigsar
    artist.showGigsar = !artist.showGigsar;

    // Save the updated artist
    await artist.save();
    console.log("Artist Status Changed Successfully");

    // Send back the updated artist
    res.status(200).json({ artist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
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

  // Checking if contact number is empty or message length is greater than 100
  if (formData.contact === "" || formData.message?.length > 100) {
    // Rendering spam page with status code 403 (Forbidden)
    res.status(403).redirect("/spam");
  } else {
    // Inserting data
    await appendData(formData);

    // Check if message contains "/enquiry-form-1" and redirect accordingly
    if (formData.message.includes("/enquiry-form-1")) {
      res.redirect("/success-1");
    } else if (formData.message.includes("/enquiry-form-2")) {
      res.redirect("/success-2");
    } else if (formData.message.includes("/enquiry-form-3")) {
      res.redirect("/success-3");
    } else if (formData.message.includes("/enquiry-form-4")) {
      res.redirect("/success-4");
    } else if (formData.message.includes("/enquiry-form-5")) {
      res.redirect("/success-5");
    } else {
      res.redirect("success");
    }
  }
});

app.post("/api/enquiry-form", async (req, res) => {
  const formData = req.body;
  console.log(formData);

  // Inserting data and rendering success page
  await appendData(formData);
  res.status(200);
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
