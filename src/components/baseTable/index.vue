<template>
  <div>
    <el-table :data="tableData" border :row-key="rowkey" :default-expand-all="defaultExpandAll" :tree-props="treeProps" :height="height" style="width: 100%">
      <!-- 需要特殊处理的列表放前 -->
      <slot name="beforeCol"></slot>
      <el-table-column v-for="(item, idx) in filterColums" :key="item.prop || idx" :type="item.type" :index="item.index" :label="item.label" :prop="item.prop" :width="item.width" :min-width="item.minWidth" :fixed="item.fixed" :show-overflow-tooltip="item.showOverflowTooltip === undefined ? true : item.showOverflowTooltip" :align="item.align || 'center'" max-height="500">
        <!-- 将  scope解构成{ row, column, $index }需要处理的数据-->
        <template slot-scope="{ row, column, $index }">
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
    treeProps: {
      type: Object,
    },
    defaultExpandAll: {
      type: Boolean,
    },
    rowkey: {
      type: String,
      default: "id",
    },
    tableData: {
      type: Array,
      required: false,
    },
    filterColums: {
      type: Array,
      required: false,
    },
    // 设置高度能固定表头产生纵向滚动条
    height: {
      type: Number,
      default: 550,
      required: false,
    },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped></style>
