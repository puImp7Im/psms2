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
          <td>{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.sex }}</td>
          <td class="text-xs-center">{{ props.item.status | statusName }}</td>
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
        {text: '性别', value: 'sex'},
        {text: '状态', value: 'status'}
      ],
      items: [
        {name: '陈小二', sex: 1, status: 1, nationality: 1},
        {name: '李二狗', sex: 0, status: 2}
      ]
    }
  },
  filters: {
    statusName: function (i) {
      return {1: 'a', 2: 'b', 3: 'c'}[i]
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
