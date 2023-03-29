<script setup lang="ts">
import type { BaseProps } from './useAppButton'
import useAppButton from './useAppButton'

import { useColor } from '@/composables/ui'
import type { Color } from '@/theme'
import { colors, getColor } from '@/theme'

interface Props extends BaseProps {
  /**
   * The accent color of the button.
   */
  accentColor?: Color | string

  /**
   * The border color of the button.
   */
  borderColor?: Color | string

  /**
   * The visual style of the button.
   */
  variant?: 'solid' | 'outline' | 'ghost' | 'unstyled'

  /**
   * The name of the icon to show on the left side of the button.
   */
  iconLeft?: string

  /**
   * The name of the icon to show on the right side of the button.
   */
  iconRight?: string

  /**
   * The size of the button icons.
   */
  iconSize?: string

  /**
   * The space between the button icon and label.
   */
  iconSpacing?: string

  /**
   * The padding values for the button.
   * Defaults to '1em 1.2em' or '1em' when no slot content is passed.
   */
  padding?: string

  /**
   * The border radius of the button.
   * Defaults to 'rounded-md'.
   */
  rounded?: 'rounded-none' | 'rounded-sm' | 'rounded' | 'rounded-md' | 'rounded-lg' | 'rounded-xl' | 'rounded-2xl' | 'rounded-3xl' | 'rounded-full'
}

const {
  accentColor,
  borderColor,
  variant = 'solid',
  iconLeft,
  iconRight,
  iconSize = '0.975em',
  iconSpacing = '0.em',
  padding = '1em 1.2em',
  rounded = 'rounded-md',
} = defineProps<Props>()

const attrs = useAttrs()
const slots = useSlots()

const { button, state } = useAppButton()
const { isDarkColor } = useColor()

const computedAccentColor = computed<string>(
  () => accentColor == null ? colors['accent-primary'] : getColor(accentColor),
)

const computedBackgroundColor = computed<string>(() => {
  if ([

    'outline',
    'ghost',
    'unstyled',
  ].includes(variant))
    return 'transparent'

  return computedAccentColor.value
})

const computedTextColor = computed<string>(
  () => (
    isDarkColor(computedBackgroundColor.value) && computedBackgroundColor.value !== 'transparent'
      ? 'white'
      : 'black'
  ),
)

const computedColor = computed<string>(() => {
  if ([
    'ghost',
    'outline',
  ].includes(variant))
    return computedAccentColor.value

  if (variant === 'unstyled')
    return colors['text-secondary'] as Color

  return computedTextColor.value
})

const computedBorderColor = computed<string>(() => {
  if (borderColor != null)
    return borderColor

  if ([
    'solid',
    'outline',
  ].includes(variant))
    return computedAccentColor.value

  return 'transparent' as Color
})

const computedOutlineColor = computed<string>(() => {
  if (['unstyled', 'ghost'].includes(variant))
    return computedColor.value

  return computedBorderColor.value
})

const computedPadding = computed<string>(() => {
  if (padding !== undefined)
    return padding

  if (variant === 'unstyled')
    return '0em'

  if (!slots.default)
    return '1em'

  return '0.8em 1em'
})

const hasExplicitWidth = computed<boolean>(
  () => /w-/.test(attrs.class as string),
)
</script>

<template>
  <Component
    :is="button"
    :class="[
      {
        'opacity-50': state.isDisabled,
        'opacity-75': state.isLoading,
      },
      rounded,
    ]"
    :style="{
      backgroundColor: computedBackgroundColor,
      borderColor: computedBorderColor,
      color: computedTextColor,
      outlineColor: computedOutlineColor,
      padding: computedPadding,
    }"
    class="relative border border-solid text-sm outline-offset-[4px] duration-200"
  >
    <div
      v-if="state.isLoading && !hasExplicitWidth"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <AppLoader
        :accent-color="computedColor"
        class="text-[1em]"
      />
    </div>

    <div
      :class="{
        'opacity-0': state.isLoading && !hasExplicitWidth,
      }"
      class="relative flex items-center justify-center"
    >
      <div class="relative">
        <Transition :name="!!iconLeft ? 'loader-with-icon-left' : 'loader'">
          <div
            v-if="state.isLoading && hasExplicitWidth"
            :style="{
              width: iconSize,
              marginRight: !!$slots.default ? iconSpacing : undefined,
            }"
            class="relative"
          >
            <AppLoader
              :accent-color="computedAccentColor"
              class="!absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[0.9em]"
            />
          </div>

          <div v-else-if="iconLeft">
            <AppIcon
              :icon="iconLeft"
              :secondary-color="computedBackgroundColor"
              :style="{
                width: iconSize,
                color: computedAccentColor,
                marginRight: !!$slots.default ? iconSpacing : undefined,
              }"
            />
          </div>
        </Transition>
      </div>

      <span class="pointer-events-none whitespace-nowrap text-[0.9375em]">
        <slot />
      </span>

      <AppIcon
        v-if="iconRight"
        :icon="iconRight"
        :secondary-color="computedBackgroundColor"
        :style="{
          width: iconSize,
          color: computedAccentColor,
          marginLeft: !!$slots.default ? iconSpacing : undefined,
        }"
      />
    </div>
  </Component>
</template>

<style lang="scss">
.loader {
  &-enter-active,
  &-leave-active {
    transition: 0.3s cubic-bezier(0.17, 0.67, 0.16, 0.99);
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    width: 0 !important;
    margin-right: 0 !important;
  }
}

.loader-with-icon-left {
  &-enter-active,
  &-leave-active {
    transition: 0.3s cubic-bezier(0.17, 0.67, 0.16, 0.99);
  }

  &-leave-active {
    position: absolute;
    left: 0;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>

