import { useHttpClient } from '@core/plugins/HttpClient'

const MiscService = {
  districts(parentId) {
    return useHttpClient().get('misc/districts', { parentId: parentId }, false)
  },

  districtPath(id) {
    return useHttpClient().get('misc/district-path', { id: id }, false)
  },

  districtSearchTree(keyword) {
    return Vue.http.get(
      'misc/district-search-tree',
      { keyword: keyword },
      false
    )
  },

  adminGroups() {
    return useHttpClient().get('misc/admin-groups', null, false)
  },

  adminGroupPermissions() {
    return useHttpClient().get('misc/admin-group-permissions', null, false)
  },

  shopCategoryTree() {
    return useHttpClient().get('misc/shop-category-tree', null, false)
  },

  shopCategoryPath(id) {
    return useHttpClient().get('misc/shop-category-path', { id: id }, false)
  },
}

export default MiscService
