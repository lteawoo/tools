<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <nuxt-link to="/" class="taeu-logo">
        <v-app-bar-title>
          taeu.kr
        </v-app-bar-title>
      </nuxt-link>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list nav>
        <template
          v-for="(menu, i) in menus"
          :key="i"
        >
          <v-list-item
            v-if="!menu.children"
            :prepend-icon="menu.icon"
            :to="menu.link"
            :value="menu.label"
            link
          >
            <v-list-item-title>
              {{ menu.label }}
            </v-list-item-title>
          </v-list-item>

          <v-list-group
            v-else
          >
            <template #activator="{ props }">
              <v-list-item
                v-bind="props"
                :prepend-icon="menu.icon"
                :value="menu.label"
              >
                <v-list-item-title>
                  {{ menu.label }}
                </v-list-item-title>
              </v-list-item>
            </template>

            <v-list-item
              v-for="(child, j) in menu.children"
              :key="j"
              :to="child.link"
              :value="child.label"
              link
            >
              <v-list-item-title>
                {{ child.label }}
              </v-list-item-title>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref<boolean>(false)
const menus = ref([
  // { label: 'Home', icon: 'mdi-home', link: '/' },
  // { label: 'About', icon: 'mdi-help', link: '/about' },
  {
    label: '계산기',
    icon: 'mdi-numeric',
    children: [
      { label: '평수 / 면적 계산기', link: '/calc/area' }
    ]
  }
  // {
  //   label: 'Tools',
  //   icon: 'mdi-toolbox-outline',
  //   children: [
  //     { label: 'Error', link: '/test' }
  //   ]
  // }
])
</script>
