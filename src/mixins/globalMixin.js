import { mapState } from "vuex"
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState("dict", ["allDictData"]),
  },
  methods: {
    // 根据code获取字典的name
    filterData(val, mark) {
      if (val && this.allDictData) {
        let res = this.allDictData[mark].find((item) => {
          if (item.dict_item_code === val) {
            return item
          }
        })
        return res["dict_name"]
      } else {
        return val
      }
    },
  },
}
