<template>
  <div class="max-h-[60vh] overflow-y-auto md:max-h-[80vh]">
    <div class="w-full">
      <slot />
    </div>

    <div class="bg-primary sticky bottom-0 mt-8 flex w-full flex-col gap-y-2">
      <slot name="actions" />
    </div>
  </div>
</template>
