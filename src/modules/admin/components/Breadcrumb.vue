<template>
  <el-breadcrumb class="ag-breadcrumb">
    <el-breadcrumb-item :to="{ path: '/home' }">
      <i class="el-icon-s-home" />&nbsp;
      <span>管理后台</span>
    </el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="(breadcrumb, index) in breadcrumbs"
      :key="index"
      :to="{ path: breadcrumb.path }"
    >
      <ag-icon v-if="breadcrumb.icon" :type="breadcrumb.icon" />
      <span>{{ breadcrumb.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import AgIcon from '@core/components/Icon'
import { useRoute } from 'vue-router'
import { onMounted, watch } from 'vue'

export default {
  name: 'Breadcrumb',
  components: { AgIcon },
  setup() {
    let breadcrumbs = []
    const documentTitle = '%s - ' + '管理后台'

    const route = useRoute()

    const updateBreadcrumbs = () => {
      const title = route.meta.title

      breadcrumbs = [{ title: title }]

      document.title = documentTitle.replace('%s', title)
    }

    onMounted(updateBreadcrumbs)
    watch(route, updateBreadcrumbs)

    return {
      breadcrumbs,
      documentTitle,
    }
  },
}
</script>

<style lang="less">
.ag-breadcrumb {
  margin-bottom: 15px;

  .is-link {
    font-weight: normal;
  }
}
</style>
