<template>
      <v-data-table
          v-bind:headers="headers"
          :items="filteredItems"
          v-model="selected"
          selected-key="name"
          hide-actions
          class="elevation-1"
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
          <td class="text-xs-center">{{ props.item.registeredOn | dateFormat('yyyy-MM-dd HH:mm:ss') }}</td>
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
      items: [
        {name: '陈小二', sex: 1, status: 1, nationality: 1, registeredOn: new Date(new Date().getTime() - Math.random() * 24 * 3600 * 1000)},
        {name: '李二狗', sex: 0, status: 2, registeredOn: new Date(new Date().getTime() - Math.random() * 24 * 3600 * 1000)}
      ]
    }
  },
  filters: {
    statusName: function (i) {
      return {1: 'a', 2: 'b', 3: 'c'}[i]
    },
    dateFormat: function (i, str) {
      const d = {
        Y: i.getFullYear(),
        y: i.getFullYear(),
        M: i.getMonth() + 1,
        d: i.getDate(),
        H: i.getHours(),
        h: i.getHours() % 12,
        m: i.getMinutes(),
        s: i.getSeconds(),
        S: i.getMilliseconds()
      }
      for (let k in d) {
        var re = new RegExp('(' + k + '+' + ')')
        while ((re.exec(str)) != null) {
          var v = d[k].toString(10)
          while (v.length < RegExp.$1.length) {
            v = '0'.concat(v)
          }
          str = str.replace(RegExp.$1, v)
        }
      }
      return str
    },
    caculate: function (i) {
      let now = new Date()
      let sec = Math.round((now.getTime() - i.getTime()) / 1000)
      let h = 3600
      let m = 60
      let str = Math.round(sec / h) + 'h, ' + Math.round((sec % h) / m) + 'm'
      return str
    }
  },
  methods: {
    change: function (b) {
      console.log('***', b)
      if (b) {
        this.selected.shift()
      }
    }
  },
  computed: {
    filteredItems: function () {
      let search = this.$route.params.status
      return this.items.filter(function (i) {
        return i.status === Number(search)
      })
    }
  },
  watch: {
    selected: function (o, n) {

    }
  }
}
</script>
