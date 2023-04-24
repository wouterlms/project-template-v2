<script setup lang="ts">
interface Props {
  grid: string
  columns: { label: string }[]
}

const { columns, grid } = defineProps<Props>()
</script>

<template>
  <AppTable :grid="grid">
    <div class="bg-primary sticky top-[3.2rem] border-b border-solid border-neutral-100">
      <AppContainer>
        <AppTableTh>
          <AppTableTd
            v-for="{ label } of columns"
            :key="label"
            class="py-4 font-medium"
          >
            {{ label }}
          </AppTableTd>
        </AppTableTh>
      </AppContainer>
    </div>

    <slot />
  </AppTable>
</template>
