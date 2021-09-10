<template>
  <Layout>
    <!-- Page Header -->
    <header class="masthead" style="background-image: url('/img/home-bg.jpg')">
      <div class="overlay"></div>
      <div class="container article-head">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="site-heading">
              <h1># {{ $page.tag.title }}</h1>
              <!-- <span class="subheading">A Blog Theme by Start Bootstrap</span> -->
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div class="post-preview" v-for="post in posts" :key="post.node.id">
            <g-link :to="`/post/${post.node.id}`">
              <h2 class="post-title">
                {{ post.node.title }}
              </h2>
              <!-- <h3 class="post-subtitle">
                Problems look mighty small from 150 miles up
              </h3> -->
            </g-link>
            <p class="post-meta">
              Posted by
              <a href="#">{{ post.node.author.username }}</a>
              {{ post.node.created_at }}
            </p>
            <p>
              <span v-for="tag in post.node.tags" :key="tag.id">
                <g-link :to="`/tag/${tag.id}`">{{ tag.title }}</g-link>&nbsp;&nbsp;
              </span>
            </p>
            <hr />
          </div>
          
          <Pager :info="pageInfo"/>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query ($id: ID!, $page: Int) {
  tag: strapiTag(id: $id) {
    id
    title
    created_at
    belongsTo(perPage: 2, page: $page) @paginate {
      totalCount
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          ... on StrapiPost {
            id
            title
            created_at
            author {
              id
              username
            }
            tags {
              id
              title
            }
          }
        }
      }
    }
  }
}
</page-query>

<script>
// 方法二：同时查询 tag 和 posts，暂未解决 id 和 eq 类型不一致问题
// query ($id: ID!, $page: Int) {
//   tag: strapiTag(id: $id) {
//     id
//     title
//     created_at
//   }
//   posts: allStrapiPost(
//     filter: {
//       tags: {
//         id: {
//           eq: 1
//         }
//       }
//     },
//     perPage: 1,
//     page: $page
//   ) @paginate {
//     pageInfo {
//       totalPages
//       currentPage
//     }
//     edges {
//       node {
//         id
//         title
//         created_at
//         author {
//           id
//           username
//         }
//         tags {
//           id
//           title
//         }
//       }
//     }
//   }
// }

import { Pager } from 'gridsome'

export default {
  name: 'TagPage',
  components: {
    Pager
  },
  computed: {
    posts() {
      return this.$page.tag.belongsTo.edges
      // return this.$page.posts.edges
    },
    pageInfo() {
      return this.$page.tag.belongsTo.pageInfo
      // return this.$page.posts.pageInfo
    }
  }
}
</script>

<style>

</style>