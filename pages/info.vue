<template>
  <div>
    <v-list>
      <template v-for="(item, i) in products">
        <v-list-item
          :key="i"
          link
          :href="item.link"
          target="_blank"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.price | numberComma }} {{ item.isFreeDelivery ? '/ 무료배송' : '' }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider
          v-if="i < products.length - 1"
          :key="i"
        />
      </template>
    </v-list>
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

  filters: {
    numberComma (val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },

  mounted () {

  }
}
</script>
