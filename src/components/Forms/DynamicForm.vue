<template>
  <div id="wrapper"></div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from '@vue/composition-api'
  import { FormFields } from '../../types/Forms.interface'

  export default defineComponent({
    props: {
      fields: {
        type: Array as PropType<FormFields>,
        required: true,
      },
    },
  })
</script>
