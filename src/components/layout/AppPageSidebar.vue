<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { useIsKeyboardMode } from '@/composables/ui'

interface Props {
  links: {
    label: string
    to: RouteLocationRaw
  }[]
}

const { links } = defineProps<Props>()

const isKeyboardMode = useIsKeyboardMode()
</script>

<template>
  <nav class="bg-primary sticky top-20 self-start">
    <ul>
      <li
        v-for="{ label, to } of links"
        :key="label"
      >
        <RouterLink
          v-slot="{ isExactActive }"
          :to="to"
          :underline="false"
          :class="{
            'focus:bg-neutral-100': isKeyboardMode,
          }"
          class="-ml-3
            block
            rounded
            px-3
            py-2
            !outline-black
            duration-200
            hover:bg-neutral-100
            dark:!outline-white/50"
        >
          <AppText
            :class="{
              'text-primary font-medium': isExactActive,
            }"
            variant="body-1"
          >
            {{ label }}
          </AppText>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
