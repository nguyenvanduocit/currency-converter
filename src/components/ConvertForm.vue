<template>
  <div class="convert-form">
      <div class="form-group">
        <input class="amount" type="number" v-model="leftValue" @keyup="convert" @focus="direction = 'LEFT_RIGHT'">
        <mt-picker :visibleItemCount="5" :rotateEffect="true" :slots="slots" @change="onLeftCurrencyChange"></mt-picker>
      </div>
      <div class="spacing"></div>
      <div class="direction" @click.prevent="reverseDirection">
        <svg v-if="direction == 'LEFT_RIGHT'" xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20">
          <g fill="#ffffff" fill-rule="evenodd" stroke="#ffffff" stroke-width="2" transform="translate(1 1)" stroke-linecap="round" stroke-linejoin="round">
            <path d="M0 9L16 9M16 9L7.93774223.937742233M16 9L7.93774223 17.0622578"/>
          </g>
        </svg>
        <svg v-if="direction == 'RIGHT_LEFT'" xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20">
          <g fill="#ffffff" fill-rule="evenodd" stroke="#ffffff" stroke-width="2" transform="matrix(-1 0 0 1 17 1)" stroke-linecap="round" stroke-linejoin="round">
            <path d="M0 9L16 9M16 9L7.93774223.937742233M16 9L7.93774223 17.0622578"/>
          </g>
        </svg>
      </div>
      <div class="form-group">
        <input class="amount" type="number" v-model="rightValue" @keyup="convert" @focus="direction = 'RIGHT_LEFT'">
        <mt-picker :visibleItemCount="5" :rotateEffect="true" :slots="slots" @change="onRightCurrencyChange"></mt-picker>
      </div>
  </div>
</template>

<script>
import currencies from '../shared/currencies.js'
import fx from 'money'
fx.base = 'USD'
export default {
  props: [
    'rates'
  ],
  mounted () {
    fx.rates = this.rates
    this.convert()
  },
  methods: {
    onLeftCurrencyChange (picker, values) {
      this.leftCurrency = values[0]
      this.convert()
    },
    onRightCurrencyChange (picker, values) {
      this.rightCurrency = values[0]
      this.convert()
    },
    reverseDirection () {
      this.direction = this.direction === 'LEFT_RIGHT' ? 'RIGHT_LEFT' : 'LEFT_RIGHT'
    },
    convert () {
      switch (this.direction) {
        case 'LEFT_RIGHT':
          this.rightValue = fx(this.leftValue).convert({ from: this.leftCurrency, to: this.rightCurrency }).toFixed(2)
          break
        case 'RIGHT_LEFT':
          this.leftValue = fx(this.rightValue).convert({ from: this.rightCurrency, to: this.leftCurrency }).toFixed(2)
          break
      }
    }
  },
  watch: {
    direction () {
      this.convert()
    }
  },
  data () {
    return {
      direction: 'LEFT_RIGHT',
      leftValue: 1.00,
      rightValue: 1.00,
      leftCurrency: 'GBP',
      rightCurrency: 'GBP',
      slots: [
        {
          flex: 1,
          values: currencies,
          className: 'slot1',
          textAlign: 'center',
          defaultIndex: 3
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.convert-form{
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin: 20px 0;
  position: relative;
  .amount{
    background: rgb(255, 255, 255);
    border: none;
    font-size: 20px;
    padding: 15px 10px;
    text-align: center;
    width: 100%;
    color:#32908E;
    transition: all .3s ease-in-out;
    font-weight: bold;
    box-shadow: 5px 5px 20px 0 rgba(0,0,0,0.24);
    border-radius: 4px;
    &:hover, &:active, &:focus{
      outline: none;
    }
  }
  .picker{
    cursor: pointer;
    margin-top: 20px;
    .picker-center-highlight:before, .picker-center-highlight:after{
      background-color: rgba(255, 255, 255, 0.50);
    }
    .picker-item{
      transition: color .3s;
      color: rgba(255, 255, 255, 0.5);
      user-select: none;
      &.picker-selected{
        color: #fff;
      }
    }
  }
  .form-group {
    & + .form-group{
      margin-left: 20px;
    }
  }
  .spacing{
    width: 0;
    height: 0;
    margin-left: 5px;
    margin-right: 5px;
  }
  .direction{
    top:9px;
    background: #4dc2a6;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    box-shadow: 5px 5px 20px 0 rgba(0,0,0,0.24);
    cursor: pointer;
    svg{
      width: 15px;
      height: 15px;
    }
  }
}
</style>
