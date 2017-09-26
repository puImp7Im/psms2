<template>
  <v-app id="app" toolbar>
    <v-navigation-drawer permanent clipped light>
      <v-toolbar flat>
        <v-list>
          <v-list-tile>Menu</v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list class="pt-2">
        <v-list-tile v-for="item in items" :key="item.title" @click="" :to="item.action">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="light-blue" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>PSMS<sup>2.1</sup></v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <!--v-router-->
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data: function () {
    return {
      drawer: null,
      items: [
        { title: '入所登记', icon: 'dashboard', action: 'register' },
        { title: '讯询问', icon: 'dashboard', action: 'hello' }
      ]
    }
  }
}
</script>

<style>
  @require './stylus/main'
</style>
