<template>
  <header class="site-header">
    <mt-header title="Currency converter"></mt-header>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss">
  .site-header{
    width: 100%;
    margin-bottom: 20px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,0.20);
    .mint-header{
      width: 100%;
      background-image: linear-gradient(-134deg, #32908E 0%, #37a7a5 100%);
      height: 60px;
      .mint-header-title{
        font-size: 19px;
        text-transform: uppercase;
      }
      .mint-header-button{
        display: none;
      }
    }
  }
</style>
