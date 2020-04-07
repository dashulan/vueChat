<template>
  <q-card-section>
    <q-item class="q-pa-none">
      <q-item-section>
        <div class="text-h6 text-dark text-weight-bold">{{ status }}</div>
      </q-item-section>
      <q-space />
      <q-item-section class="col-2">
        <q-btn
          icon="close"
          color="blue-grey-2"
          flat
          round
          @click="closeDialog"
        />
      </q-item-section>
    </q-item>
  </q-card-section>
</template>

<script>
export default {
  name: "CardHead",
  props: {
    status,
  },
  data() {
    return {};
  },
  methods: {
    closeDialog: function () {
      this.$emit("close");
    },
  },
  components: {},
};
</script>

<style scoped lang="sass"></style>
