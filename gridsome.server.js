// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require('axios')

module.exports = function (api) {
  api.loadSource(async (actions) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/

    // 使用 belongsTo 方法
    // const { addCollection, getCollection } = actions
    // const posts = addCollection('StrapiPost')
    // const tags = addCollection('StrapiTag')
    // posts.addReference('tags', 'StrapiTag')

    // const postsPro = axios.get('http://localhost:1337/posts')
    // const tagsPro = axios.get('http://localhost:1337/tags')

    // const [postsRes, tagsRes] = await Promise.all([postsPro, tagsPro])

    // for (const item of postsRes.data) {
    //   posts.addNode({
    //     ...item,
    //     tags: item.tags.map(({ id }) => id)
    //   })
    // }

    // for (const item of tagsRes.data) {
    //   tags.addNode({
    //     ...item,
    //     posts: item.posts.map(({ id }) => id)
    //   })
    // }

    /**
     * 修改 collection，在 post 中添加 tag 的引用，便于使用 belongsTo 查询
     */
    const posts = actions.getCollection('StrapiPost')
    const tags = actions.getCollection('StrapiTag')
    posts.addReference('tags', 'StrapiTag')
    console.dir(posts)
    posts.data().forEach(item => {
      posts.updateNode({
        ...item,
        tags: item.tags.map(({ id }) => id)
      })
    })
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
