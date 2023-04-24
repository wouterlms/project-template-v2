<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { RouterLink } from 'vue-router'

import type { Color } from '@/theme'
import { colors, getColor } from '@/theme'

export interface Props {
  /**
   * The route to navigate to when the button is clicked.
   * If defined, renders a `<RouterLink>` element instead of an `<a>` element.
   */
  to?: RouteLocationRaw

  /**
   * The URL to navigate to when the button is clicked.
   * If defined, renders an `<a>` element instead of a `<RouterLink>` element.
   */
  href?: string

  /**
   * The type of the native button element. Defaults to 'button'.
   * Possible values include 'button', 'reset', and 'submit'.
   */
  type?: 'button' | 'reset' | 'submit'

  /**
   * Whether the button is disabled or not.
   * If true, the button is disabled and cannot be clicked.
   */
  isDisabled?: boolean

  /**
   * Whether to show a loading indicator and disable the button.
   * If true, the button is disabled and a loading indicator is displayed.
   */
  isLoading?: boolean

  /**
   * The accent color of the button.
   * This can be a theme color or a hex color.
   */
  accentColor?: Color | string

  /**
   * The text color of the button.
   * This can be a theme color or a hex color.
   */
  textColor?: Color | string

  /**
   * The border color of the button.
   * This can be a theme color or a hex color.
   */
  borderColor?: Color | string

  /**
   * The visual style of the button.
   * Possible values are: 'ghost', 'outline', 'solid', or 'unstyled'.
   */
  variant?: 'ghost' | 'outline' | 'solid' | 'unstyled'

  /**
   * The size of the button icons.
   * This should be a string that represents a CSS size value, such as '1rem'.
   */
  iconSize?: string

  /**
   * The space between the button icon and label.
   * This should be a string that represents a CSS size value, such as '0.5rem'.
   */
  iconSpacing?: string

  /**
   * The padding values for the button.
   * This should be a string that represents a CSS padding value, such as '1em 1.2em'.
   * Defaults to '1em 1.2em' or '1em' when no slot content is passed.
   */
  padding?: string

  /**
   * The border radius of the button.
   * Possible values are: 'rounded-2xl', 'rounded-3xl', 'rounded-full',
   * 'rounded-lg', 'rounded-md', 'rounded-none', 'rounded-sm', 'rounded-xl', or 'rounded'.
   * Defaults to 'rounded-md'.
   */
  rounded?: 'rounded-2xl' | 'rounded-3xl' | 'rounded-full' | 'rounded-lg' | 'rounded-md' | 'rounded-none' | 'rounded-sm' | 'rounded-xl' | 'rounded'
}

const {
  accentColor,
  borderColor,
  href,
  iconSize = '0.975em',
  iconSpacing = '0.375em',
  isDisabled = false,
  isLoading = false,
  padding,
  rounded = 'rounded-md',
  textColor,
  to,
  type = 'button',
  variant = 'solid',
} = defineProps<Props>()

const slots = useSlots()
const attrs = useAttrs()

const hasDefaultSlotContent = computed<boolean>(
  () => slots.default != null && slots.default().length > 0,
)
const hasLeftIconSlotContent = computed<boolean>(
  () => slots['icon-left'] != null && slots['icon-left']().length > 0,
)
const hasRightIconSlotContent = computed<boolean>(
  () => slots['icon-right'] != null && slots['icon-right']().length > 0,
)

const componentType = computed<string | typeof RouterLink>(() => {
  if (to != null)
    return RouterLink
  else if (href != null)
    return 'a'

  return 'button'
})

const computedAccentColor = computed<string>(() => {
  if (accentColor == null)
    return colors['accent-primary']

  return getColor(accentColor)
})

const computedTextColor = computed<string>(() => {
  if (textColor != null)
    return getColor(textColor)

  if (variant === 'ghost' || variant === 'outline')
    return computedAccentColor.value

  if (variant === 'unstyled')
    return 'inherit'

  return colors['accent-primary-inverted']
})

const computedBorderColor = computed<string>(() => {
  if (borderColor != null)
    return getColor(borderColor)

  if (variant === 'outline' || variant === 'solid')
    return computedAccentColor.value

  return 'transparent'
})

const computedBackgroundColor = computed<string>(() => {
  if ([
    'outline', 'ghost', 'unstyled',
  ].includes(variant))
    return 'transparent'

  return computedAccentColor.value
})

const computedOutlineColor = computed<string>(() => {
  if (variant === 'unstyled' || variant === 'ghost')
    return computedAccentColor.value

  return computedBorderColor.value
})

const computedPadding = computed<string>(() => {
  if (padding != null)
    return padding

  if (hasDefaultSlotContent.value)
    return '0.8em 1em'

  return '1em'
})

const hasExplicitWidth = computed<boolean>(
  () => attrs.class != null && (attrs.class as string).includes('w-'),
)
</script>

<template>
  <Component
    :is="componentType"
    :class="[
      rounded,
      isDisabled || isLoading ? 'cursor-not-allowed' : 'cursor-pointer',
      {
        'opacity-50': isDisabled,
        'opacity-75': isLoading,
      },
    ]"
    :disabled="isDisabled || isLoading"
    :href="href"
    :style="{
      backgroundColor: computedBackgroundColor,
      borderColor: computedBorderColor,
      color: computedTextColor,
      outlineColor: computedOutlineColor,
      padding: computedPadding,
    }"
    :type="type"
    class="relative border border-solid text-sm outline-offset-[4px] duration-200"
  >
    <div
      v-if="isLoading && !hasExplicitWidth"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <AppLoader
        :accent-color="computedTextColor"
        class="text-[1em]"
      />
    </div>

    <div
      :class="{
        'opacity-0': isLoading && !hasExplicitWidth,
      }"
      class="relative flex items-center justify-center"
    >
      <div class="relative">
        <Transition
          :enter-active-class="hasLeftIconSlotContent ? 'duration-200' : 'duration-200'"
          :enter-from-class="hasLeftIconSlotContent ? 'opacity-0' : 'opacity-0 !w-0 !mr-0'"
          :leave-active-class="hasLeftIconSlotContent ? '!absolute left-0' : 'duration-200'"
          :leave-to-class="hasLeftIconSlotContent ? 'opacity-0' : 'opacity-0 !w-0 !mr-0'"
        >
          <div
            v-if="isLoading && hasExplicitWidth"
            :style="{
              width: iconSize,
              height: iconSize,
              marginRight: hasDefaultSlotContent ? iconSpacing : '',
            }"
            class="relative"
          >
            <AppLoader
              :accent-color="computedTextColor"
              class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[0.9em]"
            />
          </div>

          <div
            v-else-if="hasLeftIconSlotContent"
            :style="{
              width: iconSize,
              height: iconSize,
              marginRight: hasDefaultSlotContent ? iconSpacing : '',
            }"
          >
            <slot name="icon-left" />
          </div>
        </Transition>
      </div>

      <span class="whitespace-nowrap text-[0.9375em]">
        <slot />
      </span>

      <div
        v-if="hasRightIconSlotContent"
        :style="{
          width: iconSize,
          height: iconSize,
        }"
      >
        <slot name="icon-right" />
      </div>
    </div>
  </Component>
</template>
