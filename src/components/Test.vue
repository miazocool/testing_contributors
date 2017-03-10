<template>
  <div class="test">
    <h1>Hello vue-github-commits!</h1>
    <input v-model="name" placeholder="Name" />
  </div>
</template>

<script>
export default {
  name: 'test',

  data () {
    return {
      name: 'world',
    }
  },
}
</script>
