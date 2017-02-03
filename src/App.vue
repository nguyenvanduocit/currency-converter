<template>
  <div id="app">
    <site-header></site-header>
    <div class="container">
      <convert-form v-if="isReady" :rates="rates"></convert-form>
    </div>
  </div>
</template>

<script>
import SiteHeader from './components/SiteHeader'
import ConvertForm from './components/ConvertForm'
import { Indicator, MessageBox } from 'mint-ui'
export default {
  name: 'app',
  components: {
    SiteHeader,
    ConvertForm
  },
  data () {
    return {
      rates: {},
      isReady: false
    }
  },
  mounted () {
    let needCloseIndicator = false
    if ('caches' in window) {
      /* eslint-disable no-undef */
      caches.match('https://openexchangerates.org/api/latest.json?app_id=ce976864465c4ee09f50f3e347c57f44').then((response) => {
        if (response) {
          response.json().then((posts) => {
            this.rates = posts.rates
            this.isReady = true
          })
        } else {
          Indicator.open('Load rates...')
          needCloseIndicator = true
        }
      })
    } else {
      Indicator.open('Load rates...')
      needCloseIndicator = true
    }
    console.log('ahihi')
    this.$http.get('/latest.json').then(response => {
      this.rates = response.data.rates
      this.isReady = true
      if (needCloseIndicator) {
        Indicator.close()
      }
    }).catch(() => {
      if (needCloseIndicator) {
        Indicator.close()
        MessageBox({
          title: 'Error',
          message: 'Can not load rates, please help to contact nguyenvanduocit@gmail.com, I will fix.',
          confirmButtonText: 'Close'
        })
      }
    })
  }
}
</script>

<style lang="scss">
*{
  box-sizing: border-box;
}
html{
  body{
    margin: 0;
    padding: 0;
    font-family: Roboto, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
.mint-msgbox-content{
  .mint-msgbox-message{
    font-size: 16px;
    line-height: 25px;
  }
}
#app {
  color: #2c3e50;
  min-height: 100vh;
  width: 100vw;
  background-image: linear-gradient(-134deg, #59DAB5 0%, #32908E 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  .container{
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding-left: 15px;
    padding-right: 15px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex: 1;
  }
}
</style>
