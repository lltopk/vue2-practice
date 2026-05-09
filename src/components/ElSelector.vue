<!--
下拉框核心就是两个回调函数
1. :remote-method
2.
-->
<template>
  <div v-if="visibleProp">
    <el-select
      v-model="pickObj"
      filterable
      remote
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="remoteMethod"
      @change="pickItem"
      :loading="loading"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    visibleProp: Boolean,
  },
  data() {
    return {
      options: [],
      pickObj: [],
      list: [],
      loading: false,
      states: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
      ],
    };
  },
  mounted() {
    this.list = this.states.map((item) => {
      return { value: `value:${item}`, label: `label:${item}` };
    });
  },
  methods: {
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter((item) => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    pickItem(obj) {
      console.log("pickObj of option", obj);
      let value = obj.value;
      let label = obj.label;
      console.log("value", value);
      console.log("label", label);
    },
  },
};
</script>
