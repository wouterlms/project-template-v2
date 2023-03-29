<script setup lang="ts">
import { ComboboxOption, ListboxOption } from '@headlessui/vue'
import { PRIVACY_AND_SECURITY_CHECKMARK } from '@wouterlms/icons'

interface Props {
  isDisabled?: boolean
}

const { isDisabled } = defineProps<Props>()

const isMultiple = inject('isMultiple', false)
const isFilterable = inject('isFilterable', false)
</script>

<template>
  <Component
    :is="isFilterable ? ComboboxOption : ListboxOption"
    v-slot="{ selected, active, disabled }"
    :disabled="isDisabled"
    as="template"
    @click.prevent
  >
    <li
      :class="[
        {
          'text-accent-primary': selected,
          'bg-accent-primary/10': selected && !active,
          'bg-accent-primary/20': selected && active,
          'bg-neutral-100 dark:bg-neutral-200': active && !selected,
        },
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
      ]"
      class="flex items-center gap-x-2 py-3 px-5 text-sm outline-none"
    >
      <div
        v-if="isMultiple"
        :class="[
          selected ? 'border-accent-primary bg-accent-primary' : 'bg-input border-neutral-200',
        ]"
        class="flex h-5 w-5 items-center justify-center rounded-md border border-solid duration-200"
      >
        <AppIcon
          v-if="selected"
          :icon="PRIVACY_AND_SECURITY_CHECKMARK"
          class="h-3 w-3 text-white"
        />
      </div>

      <slot />
    </li>
  </Component>
</template>
