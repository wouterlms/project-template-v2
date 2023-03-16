<script setup lang="ts">
import { PRIVACY_AND_SECURITY_EXCLAMATIONMARK_TRIANGLE_FILL } from '@wouterlms/icons'
import { colors } from '@/theme'

interface Props {
  label?: string
  description?: string
  errors?: { _errors: string[] }
  isTouched?: boolean
  textColor?: string
}

const {
  label,
  description,
  errors,
  textColor,
  isTouched = false,
} = defineProps<Props>()

const labelColor = computed<string>(() => {
  if (errors != null && errors._errors.length > 0 && isTouched)
    return colors.value.accent.danger[500]

  return textColor ?? colors.value.text.secondary
})

const showErrorMessage = computed(() => errors != null && errors._errors.length > 0 && isTouched)
</script>

<template>
  <label>
    <span
      v-if="label != null"
      :style="{
        color: labelColor,
      }"
      class="text-sm duration-200"
    >
      {{ label }}
    </span>

    <slot />

    <AppHeightTransition :duration="200">
      <div v-if="showErrorMessage">
        <div class="mt-0.5 flex items-center gap-x-2">
          <AppIcon
            :icon="PRIVACY_AND_SECURITY_EXCLAMATIONMARK_TRIANGLE_FILL"
            :secondary-color="colors.background.primary"
            :style="{
              color: colors.accent.danger[500],
            }"
            class="w-3.5"
          />

          <span
            v-if="errors != null"
            :style="{
              color: colors.accent.danger[500],
            }"
            class="text-sm"
          >
            {{ errors._errors[0] }}
          </span>
        </div>
      </div>
    </AppHeightTransition>

    <AppText
      variant="caption"
      class="text-tertiary mt-1"
    >
      {{ description }}
    </AppText>
  </label>
</template>
