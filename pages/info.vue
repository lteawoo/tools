<template>
  <div>
    <p
      v-for="(item, i) in products"
      :key="i"
    >
      {{ item.title }} {{ item.price }}
    </p>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    const products = await $axios.get('/api')

    return {
      products: products.data
    }
  },

  data () {
    return {
      products: []
    }
  },

  mounted () {

  }
}
</script>
