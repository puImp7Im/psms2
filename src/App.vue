<template>
  <v-app id="app" toolbar>
    <v-navigation-drawer class="pb-0" permanent clipped light>
      <v-toolbar flat>
        <v-list>
          <v-list-tile>Menu</v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list class="pt-2">
        <v-list-group v-for="item in items" :key="item.title">
        <v-list-tile slot="item" @click="" :to="item.action">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action v-if="item.items">
            <v-icon>keyboard_arrow_down</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile v-for="subItem in item.items" :key="item.title" @click="" :to="subItem.action">
          <v-list-tile-content>
            <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="blue" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>PSMS<sup>2.1</sup></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>refresh</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <main>
      <v-container fluid>
        <!--v-router-->
        <router-view @bubbleup="bubbleUp" @dialog="dialogHandler" :confirmed="dialog.yes"></router-view>
      </v-container>
    </main>
    <v-snackbar
        :timeout="snackbar.timeout"
        :success="snackbar.type == 'success'"
        :info="snackbar.type == 'info'"
        :warning="snackbar.type == 'warning'"
        :error="snackbar.type == 'error'"
        :top="true"
        v-model="snackbar.show"
        >
        {{ snackbar.msg }}
        <v-btn outline small icon dark @click.native="snackbar.show = false">
            <v-icon>clear</v-icon>
        </v-btn>
    </v-snackbar>
    <v-dialog v-model="dialog.show" lazy absolute>
          <v-card>
            <v-card-title>
              <div class="headline">{{dialog.title}}</div>
            </v-card-title>
            <v-card-text>{{dialog.msg}}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="green--text darken-1" flat="flat" @click.native="dialog.show = false">OK</v-btn>
              <v-btn class="green--text darken-1" flat="flat" @click.native="dialog.show = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data: function () {
    return {
      drawer: null,
      showSnackbar: false,
      dialog: {
        show: false,
        title: 'Confirm',
        msg: 'yes?no?',
        yes: false
      },
      snackbar: {
        show: false,
        type: 'success',
        msg: false,
        timeout: 3000
      },
      items: [
        { title: '入所登记', icon: 'group_add', action: '/register' },
        { title: '讯/询问', icon: 'group', action: '/suspects/1' },
        { title: '临时出所', icon: 'people_outline', action: '/suspects/3' },
        { title: '出所', icon: 'time_to_leave', action: '/suspects/2' },
        {
          title: '更多',
          icon: 'folder_open',
          action: 'more',
          items: [
            { title: '嫌疑人列表', icon: 'contacts', action: '/suspects/0' },
            { title: '地区管理', icon: 'border_all', action: '/zones' }
          ]
        }
      ]
    }
  },
  methods: {
    bubbleUp: function (event) {
      this.snackbar.timeout = event.timeout
      this.snackbar.msg = event.msg
      if (event.type) {
        this.snackbar.type = event.type
      }
      this.snackbar.show = true
    },
    dialogHandler: function (event) {
      this.dialog.title = 'TTTT'
      this.dialog.msg = event.msg
      this.dialog.show = true
    }
  }
}
</script>

<style>
  @require "./stylus/main"
</style>
