<template>
  <div>

    <!-- include in a container a heading, paragraph and svg for the keyhole -->
    <div class="container">
      <h1>404</h1>
      <p>not found</p>
    </div>
  </div>
</template>

<script>
  import $cookie from 'vue-cookie'

  export default {
    mounted () {
      let userSession = $cookie.get('userSession');

      if (!userSession) {
        location.href = "/#/login"
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Open+Sans|Nova+Mono');
  :root {
    --font-header: 'Nova Mono', monospace;
    --font-text: 'Open Sans', sans-serif;
    --color-theme: #F1EEDB;
    --color-bg: #282B24;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    width: 100%;
    font-family: var(--font-text);
    color: var(--color-theme);
    background: var(--color-bg);
    overflow: hidden;
  }
  .container {
    text-align: center;
    color: white;
    margin: 1rem 0.5rem 0;
  }
  .container h1 {
    font-family: var(--font-header);
    font-size: calc(4rem + 2vw);
    text-transform: uppercase;
  }
  .container p {
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    font-size: 2rem;
    margin: 1.5rem 0 3rem;
  }
</style>
