<template>
<div>
    <template>
        <v-stepper v-model="step">
            <v-stepper-header>
                <template v-for="(step, i) in filteredSteps">
                    <v-stepper-step :step="step.name" :complete="stepIndex > i">
                        <small></small>
                    </v-stepper-step>
                    <v-divider v-if="i < filteredSteps.length - 1"></v-divider>
                </template>
            </v-stepper-header>
            <v-stepper-content v-for="(step, i) in filteredSteps" :step="step.name">
                <v-card flat>
                    <v-card-title primary-title>
                        <div>
                            <div class="mb-3 headline">{{step.title}}</div>
                            <span class="grey--text">{{step.subtitle}}</span>
                        </div>
                    </v-card-title>
                    <v-card-text v-if="step.name == 1">
                        <v-radio-group v-model="suspect.drunk">
                            <v-radio color="red" label="是" :value="1"></v-radio>
                            <v-radio color="red" label="否" :value="0"></v-radio>
                        </v-radio-group>
                    </v-card-text>
                    <v-card-text v-if="step.name == 2">
                        <v-container fluid grid-list-md>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field required name="file.description" label="案由" v-model="file.description" required></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-select v-bind:items="types" v-model="file.type" label="类型" required></v-select>
                                </v-flex>
                                <v-flex xs4>
                                    <v-select v-bind:items="ways" v-model="file.way" label="途径" required></v-select>
                                </v-flex>
                                <v-flex xs4>
                                    <v-menu
                                              lazy
                                              :close-on-content-click="true"
                                              v-model="file.registeredOn"
                                              offset-y
                                              full-width
                                              :nudge-left="40"
                                              max-width="290px"
                                            >
                                              <v-text-field
                                                slot="activator"
                                                label="登记时间"
                                                v-model="file.registeredOn"
                                                readonly
                                              ></v-text-field>
                                              <v-date-picker v-model="file.registeredOn" no-title scrollable>
                                                <template scope="{ save, cancel }">
                                                  <v-card-actions>
                                                    <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                                                    <v-btn flat primary @click.native="save()">Save</v-btn>
                                                  </v-card-actions>
                                                </template>
                                              </v-date-picker>
                                            </v-menu>
                                </v-flex>
                                <v-flex xs4>
                                    <v-select v-bind:items="OFFICERS" v-model="file.registeredBy" label="登记人员" required></v-select>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-text v-if="step.name == 3">
                        <v-container fluid grid-list-md>
                            <v-layout row>
                                <v-flex xs6>
                                    <v-text-field required name="suspect.name" label="姓名" value="" required></v-text-field>
                                </v-flex>
                                <v-flex xs2>
                                    <v-select v-bind:items="suspect.SEXES" v-model="suspect.sex" label="性别" required></v-select>
                                </v-flex>
                                <v-flex xs2>
                                    <v-select v-bind:items="suspect.NATIONALITES" v-model="suspect.nationality" label="民族" required></v-select>
                                </v-flex>
                                <v-flex xs2>
                                    <v-select v-bind:items="suspect.VIOLENCES" v-model="suspect.violence" label="危险程度" required></v-select>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-text v-if="step.name == 4">
                        <v-container fluid grid-list-md>
                            <v-layout row>
                                <v-checkbox label="是否有寄存物品" v-model="hasBelongings"></v-checkbox>
                            </v-layout>
                            <v-layout v-if="hasBelongings" row>
                                <v-flex xs2>
                                    <v-text-field label="储物柜编号" v-model="suspect.belongings.box"></v-text-field>
                                </v-flex>
                                <v-flex xs2>
                                    <v-text-field label="登记单号" v-model="suspect.belongings.formId"></v-text-field>
                                </v-flex>
                                <v-flex xs8>
                                    <v-text-field label="备注" v-model="suspect.belongings.memo"></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-text v-if="step.name == 5">
                        <v-container fluid grid-list-md>
                            <v-layout row>
                                <v-checkbox label="已经完成人身安全检查" v-model="suspect.physicalChecked"></v-checkbox>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-select v-bind:items="OFFICERS" v-model="suspect.physicalCheckedBy" label="检查人员" required></v-select>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-text v-if="step.name == 6">
                        <v-container fluid grid-list-md>
                            <v-layout row>
                                <v-checkbox label="已经完成信息采集" v-model="suspect.infoCollected"></v-checkbox>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-select v-bind:items="OFFICERS" v-model="suspect.infoCollectedBy" label="检查人员" required></v-select>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-text v-if="step.name == 7">
                        <v-container fluid grid-list-md>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-select label="标签" v-bind:items="tags" v-model="suspect.tag" hint="请仔细核对标签标识" persistent-hint required></v-select>
                                </v-flex>
                                <v-flex xs12>
                                    <v-select v-bind:items="uniforms" v-model="suspect.uniform" label="识别服" required></v-select>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-text v-if="step.name == 8">
                        <v-container fluid grid-list-md>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-select v-bind:items="ROOMS" v-model="suspect.room" label="房间" required></v-select>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
                <v-btn v-if="stepIndex < filteredSteps.length - 1" primary @click="next">下一步</v-btn>
                <v-btn v-else primary @click="done">完成</v-btn>
                <v-btn v-if="stepIndex != 0" flat @click="prev">上一步</v-btn>
            </v-stepper-content>
        </v-stepper>
    </template>
</div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      stepIndex: 0,
      step: '1',
      steps: [
        {name: 1, title: '醉酒状态确认', subtitle: '请仔细确认犯罪嫌疑人是否醉酒', rules: []},
        {name: 2, title: '案件信息登记', subtitle: '请仔细填写案件信息', rules: [() => { return this.file.description !== '' }]},
        {name: 3, title: '犯罪嫌疑人信息登记', subtitle: '请仔细填写犯罪嫌疑人信息'},
        {name: 4, title: '个人物品寄存', subtitle: '...'},
        {name: 5, title: '人身安全检查', subtitle: '...'},
        {name: 6, title: '嫌疑人信息采集', subtitle: '...'},
        {name: 7, title: '标签绑定及穿戴识别服', subtitle: '请仔细核对标签并给犯罪嫌疑人穿上警示识别服...'},
        {name: 8, title: '待候问', subtitle: '请负责民警或工作人员将犯罪嫌疑人带入指定房间候问...'}
      ],
      file: {
        type: 0,
        reason: 0,
        description: '',
        registeredOn: '2017-09-23 12:00:00',
        registeredBy: 1
      },
      suspect: {
        drunk: 0,
        name: '',
        sex: 1,
        nationality: 1,
        violence: 1,
        tag: 0,
        uniform: 0,
        belongings: false,
        physicalChecked: false,
        physicalCheckedBy: 1,
        infoCollected: false,
        infoCollectedBy: 2,
        SEXES: [
          {value: 1, text: '男'},
          {value: 0, text: '女'}
        ],
        NATIONALITES: [
          {value: 1, text: '汉族'},
          {value: 2, text: '回族'}
        ],
        VIOLENCES: [
          {value: 3, text: '高'},
          {value: 1, text: '低'}
        ]
      },
      ways: [
        {value: 1, text: '投案自首'},
        {value: 2, text: '110'}
      ],
      types: [
        {value: 1, text: '打架斗殴'},
        {value: 2, text: '卖淫嫖娼'}
      ],
      tags: [
        {value: 1, text: '1001'},
        {value: 2, text: '1002'}
      ],
      uniforms: [
        {value: 1, text: '2001'},
        {value: 2, text: '2002'}
      ],
      OFFICERS: [
        {value: 1, text: '杨珺岳'},
        {value: 2, text: '张鑫钰'}
      ],
      ROOMS: [
        {value: 1, text: '讯询问室'},
        {value: 2, text: '等候室'}
      ]
    }
  },
  computed: {
    filteredSteps: function () {
      console.log('***', this.suspect.drunk)
      if (Number(this.suspect.drunk) === 0) {
        return this.steps
      } else {
        return [this.steps[0], this.steps[7]]
      }
    },
    hasBelongings: {
      get: function () {
        return this.suspect.belongings
      },
      set: function (v) {
        if (v) {
          this.suspect.belongings = {memo: '', box: '1111', formId: '2222'}
        } else {
          this.suspect.belongings = false
        }
      }
    }
  },
  methods: {
    prev: function () {
      let min = 0
      if (--this.stepIndex < min) {
        this.stepIndex = min
      }
      this.step = this.filteredSteps[this.stepIndex].name
      console.log('prev:', this.stepIndex, this.step)
    },
    next: function () {
      let max = this.filteredSteps.length - 1
      if (++this.stepIndex > max) {
        this.stepIndex = max
      }
      this.step = this.filteredSteps[this.stepIndex].name
      console.log('next:', this.stepIndex, this.step)
    },
    done: function () {
      this.$router.push({path: '/suspects'})
    }
  }
}
</script>
