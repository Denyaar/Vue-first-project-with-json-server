<template>
<button @click="OnClick()"   :style="{background:color}" class="btn">{{text}}</button>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Button',
  props:{
    text : String,
    color: String
  },
  methods:{
  OnClick(){
    this.$emit('btn-click')
  }
  }
}

</script>

<style>
</style>