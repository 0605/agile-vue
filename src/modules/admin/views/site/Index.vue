<template>
  <div class="box">123</div>
</template>

<script>
export default {
  name: 'Home',
  metaInfo: {
    title: '首页',
  },
  data() {
    return {
      file: '',
      files: [],
      message: '',
    }
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },
  },
}
</script>
