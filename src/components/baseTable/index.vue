<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        v-for="(item, idx) in filterColums"
        :key="idx"
        :type="item.type"
        :index="item.index"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        :min-width="item.minWidth"
        :fixed="item.fixed"
        :show-overflow-tooltip="item.showOverflowTooltip===undefined ? true : item.showOverflowTooltip "
        :align="item.align || 'center'"
      >
        <!-- 将  scope解构成{ row, column, $index }需要处理的数据-->
        <template slot-scope="{row, column, $index}">
          <slot name="tableBody" :scopeData="{ row, column, $index }">{{ row[item.prop] }}</slot>
        </template>
      </el-table-column>
      <!-- 默认下 -->
      <slot></slot>
      <!-- 需要特殊处理的列表放后 -->
      <slot name="afterCol"></slot>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "baseTable",
  props: {
    tableData: {
      type: Array,
      required: false,
    },
    filterColums: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style>
</style>