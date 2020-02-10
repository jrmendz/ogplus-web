<template>
  <v-card>
    <v-snackbar
      v-model="$store.state.notifs.show"
      :bottom="$store.state.notifs.y === 'bottom'"
      :left="$store.state.notifs.x === 'left'"
      :multi-line="$store.state.notifs.mode === 'multi-line'"
      :right="$store.state.notifs.x === 'right'"
      :timeout="$store.state.notifs.hideDelay"
      :top="$store.state.notifs.y === 'top'"
      :vertical="$store.state.notifs.mode === 'vertical'"
      :color="$store.state.notifs.active.notifClass"
      auto-height>
      <span>{{ tt($store.state.notifs.active.message) }}</span>
    </v-snackbar>
  </v-card>
</template>

<script>
import Global from '@/library/Global'
export default {
  mixins: [ Global ]
}
</script>

<style scoped>

</style>
