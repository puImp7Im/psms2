<template>
      <v-data-table
          v-bind:headers="headers"
          :items="filteredItems"
          v-model="selected"
          selected-key="name"
          hide-actions
          class="elevation-1"
          @input="change"
        >
        <template slot="items" scope="props">
        <td class="text-xs-center">
          <v-checkbox
            primary
            hide-details
            v-model="props.selected"
          ></v-checkbox>
        </td>
          <td class="text-xs-center">{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.sex }}</td>
          <td class="text-xs-center">{{ props.item.status | statusName }}</td>
          <td class="text-xs-center">{{ props.item.registeredOn | formatDate }}</td>
          <td class="text-xs-center">{{ props.item.registeredOn | caculate }}</td>
        </template>
    </v-data-table>
</template>

<script>
/*
const Status = {
  AWAKE: '醒酒中',
  WAITTING: '待候问',
  INQUERYING: '询问中',
  WAITING_FOR_INQUERY: '待讯问',
  OUT: '出所中'
}
*/
export default {
  name: 'register',
  data () {
    return {
      el: 1,
      selected: [],
      headers: [
        {text: '-', align: 'center', sortable: false},
        {text: '姓名', align: 'center', sortable: false, value: 'name'},
        {text: '性别', align: 'center', sortable: false, value: 'sex'},
        {text: '状态', align: 'center', sortable: false, value: 'status'},
        {text: '登记时间', align: 'center', sortable: false, value: 'registeredOn'},
        {text: '入所时间', align: 'center', sortable: false, value: 'duration'}
      ],
      items: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      console.log('loadding data..')
      vm.$http.get('/static/suspects.json').then(response => {
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
