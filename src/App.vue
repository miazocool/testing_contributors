<template>
  <div id="app">
    <github-commits repo="wzulfikar/vue-github-commits"/>
  </div>
</template>

<script>
import GithubCommits from './GithubCommits.vue'
export default {
  name: 'app',
  components: {
  	GithubCommits
  },
}
</script>
