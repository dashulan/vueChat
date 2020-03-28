<template>
  <div class="container">
    <q-toolbar class="bg-grey-3 text-black">
      <q-btn round flat icon="keyboard_arrow_left" class="q-mr-sm" to="/home" />
      <span class="q-subtitle-1">
        {{ user }}
      </span>
      <q-space />
      <q-btn round flat icon="more_horiz">
        <q-menu auto-close :offset="[100, 0]">
          <q-list style="min-width: 150px">
            <q-item clickable>
              <q-item-section>Contact data</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Block</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Select messages</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Silence</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Clear messages</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Erase messages</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["user"],
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped lang="scss"></style>
