<template>
  <Layout>
    <!-- Page Header -->
    <header
      class="masthead"
      :style="{
        backgroundImage: `url(${GRIDSOME_API_URL + $page.post.cover.url})`
      }"
    >
      <div class="overlay"></div>
      <div class="container article-head">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="post-heading">
              <h1>{{ $page.post.title }}</h1>
              <!-- <h2 class="subheading">Problems look mighty small from 150 miles up</h2> -->
              <span class="meta"
                >Posted by
                <a href="#">{{ $page.post.author.username }}</a>
                {{ $page.post.created_at }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Post Content -->
    <article>
      <div class="container">
        <div class="row">
          <div class="article-body col-lg-8 col-md-10 mx-auto" v-html="mdToHtml($page.post.content)"></div>
        </div>
      </div>
    </article>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
	post: strapiPost (id: $id) {
    id
    title
    content
    cover {
      url
    }
    author {
      id
      username
    }
    tags {
      id
      title
    }
    created_at
  }
}
</page-query>

<script>
import MarkdownIt from 'markdown-it'
import MarkdownItRplLink from 'markdown-it-replace-link'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

const md = new MarkdownIt({
  // highlight: function (str, lang) {
  //   if (lang && hljs.getLanguage(lang)) {
  //     try {
  //       return hljs.highlight(str, { language: lang }).value;
  //     } catch (__) {}
  //   }

  //   return ''; // use external default escaping
  // }
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' + hljs.highlight(lang, str, true).value + '</code></pre>'
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
  },
  replaceLink: function (link, env) {
    return process.env.GRIDSOME_API_URL + link
  }
}).use(MarkdownItRplLink)

export default {
  name: 'PostPage',
  methods: {
    mdToHtml(content) {
      return md.render(content)
    }
  }
}
</script>

<style></style>
