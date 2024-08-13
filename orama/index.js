const { create, insert, search } = require("@orama/orama");
//  
let db;
// Function to initialize the Orama database
const initOrama = async () => {
      if (!db) {
            db = await create({
                  schema: {
                        title: 'string',
                        introduction: 'string',
                        author: 'string',
                        body: 'string',
                  },
            });
            console.log('Orama database initialized');
      }
      return db;
};

const initializeOrama = async () => {
      const db = await create({
            schema: {
                  title: 'string',
                  introduction: 'string',
                  author: 'string',
                  body: 'string',
            },
      });
      return db;
};
// 
async function insertBlogInOrama(oramadb, blog) {
      const result = await insert(oramadb, blog);
      return result;
}
// 
async function insertBlogsInOrama(oramadb, blogs) {
      for (const blog of blogs) {
            await insert(oramadb, blog);
      }
}
// 
async function searchBlogInOrama(oramadb, term) {
      const searchResults = await search(oramadb, {
            term: term
      });
      console.log("--- " + JSON.stringify(searchResults));
      return searchResults;
}

module.exports = {
      insertBlogInOrama, insertBlogsInOrama, searchBlogInOrama, initOrama, initializeOrama
}
