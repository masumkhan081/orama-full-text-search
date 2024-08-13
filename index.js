const express = require("express");
const app = express();
const { create, insert, search } = require("@orama/orama");
const Blog = require("./model/blog.model");
const { PORT, innitDB } = require("./config");
const { faker } = require("@faker-js/faker");
const {
      initializeOrama,
      insertBlogInOrama,
      insertBlogsInOrama,
      searchBlogInOrama,
      initOrama,
} = require("./orama/index");
//
app.use(express.json());
//
app.listen(PORT, () => {
      console.log("listening at port: " + PORT);
});
//
innitDB();
// const oramadb = initOramaDB();
//
app.get("/", (req, res) => {
      res.send("hi-hello !");
});
//
app.post("/blog", async (req, res) => {
      const savedBlog = await new Blog(req.body).save();
      const db = await initOrama();
      try {
            const results = await search(db, {
                  term: "Closures",
            });
            res.json(results);
      } catch (error) {
            res
                  .status(500)
                  .json({ error: "Failed to search documents", details: error.message });
      }
      //
      // initializeOrama().then((db) => {
      //       insertBlogInOrama(db, req.body).then((data) => {
      //             console.log('Data inserted successfully: ' + data);
      //       });
      //       searchBlogInOrama(db, "Closures").then((data) => {
      //             console.log('Data searched successfully: ' + JSON.stringify(data));
      //       });
      // });
});
//
app.post("/blogs", async (req, res) => {
      try {
            let len = 10;
            const blogs = Array.from({ length: len }, () => ({
                  title: faker.lorem.sentence(),
                  introduction: faker.lorem.paragraph(),
                  author: faker.person.fullName(),
                  body: faker.lorem.paragraphs(3),
            }));
            console.log(blogs.length);
            const result = await Blog.insertMany(blogs);

            initializeOrama().then((db) => {
                  insertBlogsInOrama(db, blogs).then(() => {
                        console.log("Data inserted successfully");
                  });
            });
            res.send("10 more blogs added");
      } catch (err) {
            console.error("Error inserting blogs:", err);
      }
});
//
app.get("/blogs/search", async (req, res) => {
      //

      try {
            let len = 10;
            const blogs = Array.from({ length: len }, () => ({
                  title: faker.lorem.sentence(),
                  introduction: faker.lorem.paragraph(),
                  author: faker.person.fullName(),
                  body: faker.lorem.paragraphs(3),
            }));
            console.log(blogs.length);
            const result = await Blog.insertMany(blogs);
            // 
            initializeOrama().then((db) => {
                  insertBlogsInOrama(db, blogs).then(() => {
                        console.log("Data inserted successfully");
                  });
            });
            res.send("10 more blogs added");
            //
            console.log("query:: " + req.query.term);
            initializeOrama().then((db) => {
                  searchBlogInOrama(db, req.query.term).then(() => {
                        console.log("Data searched successfully");
                  });
            });
            //
            const db = await initOrama();
            //
            const results = await search(db, {
                  term: "Closures",
            });
            res.json(results);
      } catch (err) {
            console.log(JSON.stringify(err));
      }
});
