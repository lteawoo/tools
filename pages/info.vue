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
            <v-list-item-subtitle>{{ item.price | numberComma }}원 / 배송비: {{ item.shippingFee ? item.shippingFee + '원' : '무료' | numberComma }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider
          v-if="i < products.length - 1"
          :key="i"
        />
      </template>
    </v-list>

    <v-btn @click="readList">list</v-btn>
    <v-btn @click="readJson">json</v-btn>
  </div>
</template>

<script>
export default {

  filters: {
    numberComma (val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },

  async asyncData ({ $axios }) {
    const products = await $axios.get('/api/coupang')

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

  },

  methods: {
    async readList () {
      const list = await this.$axios.get('/api/read-list')
      console.log(list)
    },

    async readJson () {
      const list = await this.$axios.get('/api/read-list')
      console.log(list)
    }
  }
}
</script>
