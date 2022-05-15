<template>
  <div class="container">
    <div class="clock-border">
      <div class="clock-inner">
        <div class="hour">{{ hours }}</div>
        <div class="dots">:</div>
        <div class="min">{{ minutes }}</div>
        <div class="dots">:</div>
        <div class="secs">{{ seconds }}</div>
        <div class="mode"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    hours: 0,
    minutes: 0,
    seconds: 0,
  }),
  methods: {
    setTime() {
      setInterval(() => {
        const date = new Date();
        this.hours = date.getHours();
        this.minutes = this.checkSingleDigit(date.getMinutes());
        this.seconds = this.checkSingleDigit(date.getSeconds());
      }, 1000);
    },
    checkSingleDigit(digit) {
      return ("0" + digit).slice(-2);
    },
  },
  mounted: function () {
    this.setTime();
  },
};
</script>
<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  flex-direction: column;
}
.hour,
.min,
.secs {
  font-size: 2em;
}
strong {
  color: blue;
}
p {
  font-family: "Lucida Sans", sans-serif;
  font-size: 20px;
}
.clock-border {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 700px;
  height: 50px;
  background: linear-gradient(to right, grey, rgb(82, 76, 76));
}
.clock-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 47px;
  background: #0d6efd;
  border-radius: 20px;
  color: #ffffff;
}
.dots {
  font-size: 25px;
}
.red {
  color: red;
}
.yellow {
  color: yellow;
}
.green {
  color: green;
}
</style>
