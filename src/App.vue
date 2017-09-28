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
        { title: '入所登记', icon: 'group_add', action: '/register' },
        { title: '讯/询问', icon: 'group', action: '/suspects/1' },
        { title: '临时出所', icon: 'people_outline', action: '/suspects/3' },
        { title: '出所', icon: 'time_to_leave', action: '/suspects/2' },
        { title: '嫌疑人列表', icon: 'contacts', action: '/suspects/0' }
      ]
    }
  }
}
</script>

<style>
  @require "./stylus/main"
</style>
