<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  data: () => ({}),
};
</script>
<style scoped>
#footer {
  z-index: 2;
  position: relative;
  width: 100%;
  display: block;
  padding: 0;
  background-color: transparent;
}

.v-footer .v-card {
  background-color: transparent;
}

.v-footer .v-card-text {
  color: white;
}
</style>
