<script setup lang="ts">
import type { Color } from '@/theme'
import { colors, getColor } from '@/theme'

interface Props {
  /**
   * The label text to be displayed.
   */
  label?: string

  /**
   * An optional description or helper text to be displayed below the content.
   */
  description?: string

  /**
   * An object containing error messages associated with the input.
   * Should be an object with an "_errors" property containing an array of error strings.
   */
  errors?: { _errors: string[] }

  /**
   * A boolean value indicating whether the input has been touched/interacted with.
   */
  isTouched?: boolean

  /**
   * An optional text color to be applied to the label and description.
   * This can be a theme color or a hex color.
   */
  textColor?: Color | string
}

const {
  description,
  errors,
  isTouched = false,
  label,
  textColor,
} = defineProps<Props>()

const labelColor = computed<string>(() => {
  if (errors != null && errors._errors.length > 0 && isTouched)
    return colors['accent-danger']

  if (textColor != null)
    return getColor(textColor)

  return colors['text-secondary']
})

const showErrorMessage = computed<boolean>(
  () => errors != null && errors._errors.length > 0 && isTouched,
)
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
          <WarningIcon class="text-accent-danger w-3 fill-white" />

          <span
            v-if="errors != null"
            :style="{
              color: colors['accent-danger'],
            }"
            class="text-sm"
          >
            {{ errors._errors[0] }}
          </span>
        </div>
      </div>
    </AppHeightTransition>

    <AppText
      class="text-tertiary mt-1"
      variant="caption"
    >
      {{ description }}
    </AppText>
  </label>
</template>
