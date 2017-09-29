<template>
    <v-card><!--
    <v-card-title>
        {{title}}
        <v-spacer></v-spacer>
        <v-btn icon class="red--text text--lighten-2">
            <v-icon>add</v-icon>
        </v-btn>
        <v-btn icon class="red--text text--lighten-2">
            <v-icon>clear</v-icon>
        </v-btn>
    </v-card-title>
-->
    <v-card-text>
        <v-data-table
            v-bind:headers="headers"
            :items="items"
            v-model="selected"
            selected-key="name"
            hide-actions
            @input="change"
            >
        <template slot="items" scope="props">
            <td width="5%" class="text-xs-center">
              <v-checkbox
                primary
                hide-details
                v-model="props.selected"
              ></v-checkbox>
            </td>
            <td width="15%" class="text-xs-center">{{ props.item.name }}</td>
            <td width="5%" class="text-xs-center">{{ props.item.layer }}</td>
            <td class="text-xs-center">{{ props.item.points }}</td>
        </template>
    </v-data-table>
    <v-container fluid>
        <v-layout row justify-center>
            <v-btn primary @click="edit">新增</v-btn>
            <v-btn secondary @click="edit">修改</v-btn>
            <v-btn secondary @click="remove">删除</v-btn>
        </v-layout>
    </v-container>
</v-card-text>
</v-card>
</template>

<script>
export default {
  name: 'zones',
  data () {
    return {
      title: 'Zones',
      selected: [],
      search: '',
      headers: [
        {text: '-', align: 'center', sortable: false},
        {text: '名称', align: 'center', sortable: false, value: 'name'},
        {text: '层', align: 'center', sortable: false, value: 'layer'},
        {text: '点集', align: 'center', sortable: false, value: 'points'}
      ],
      items: []
    }
  },
  props: ['confirmed'],
  beforeRouteEnter (to, from, next) {
    next(vm => {
      console.log('loadding data..')
      vm.$http.get('/static/zones.json').then(response => {
        console.log('loaded.')
        vm.items = response.body
      })
    })
  },
  filters: {
    statusName: function (i) {
      return {1: 'a', 2: 'b', 3: 'c'}[i]
    },

    caculate: function (i) {
      let now = new Date()
      let sec = Math.round((now.getTime() - i) / 1000)
      let h = 3600
      let m = 60
      let str = Math.round(sec / h) + 'h, ' + Math.round((sec % h) / m) + 'm'
      return str
    }
  },
  methods: {
    change: function (b) {
      while (this.selected.length > 1) {
        this.selected.shift()
      }
      this.selected.push(b.pop())
    },
    edit: function () {
      console.log('edit')
    },
    remove: function () {
      let item
      for (let i = 0; i < this.items.length; i++) {
        item = this.items[i]
        if (item === this.selected[0]) {
          this.$http.get('/static/zones.json').then(response => {
            this.items.splice(i, 1)
            this.$emit('bubbleup', {msg: `区域${item.name}删除成功!`, type: 'primary', timeout: 2000})
          })
          return
        }
      }
      this.$emit('bubbleup', {msg: `请选择要操作的条目!`, type: 'warning', timeout: 1000})
    }
  },
  computed: {
    filteredItems: function () {
      let search = this.$route.params.status
      return this.items.filter(function (i) {
        return i.status === Number(search)
      })
    }
  }
}
</script>
