<template>
  <div class="flex h-[20rem] rounded border border-solid border-neutral-200 bg-neutral-50">
    <CenterContent>
      <div class="text-center">
        <AppText
          variant="body-2"
          class="text-primary font-medium"
        >
          <slot name="title" />
        </AppText>

        <AppText
          variant="body-1"
          class="mx-auto mt-1 max-w-sm"
        >
          <slot name="message" />
        </AppText>
      </div>
    </CenterContent>
  </div>
</template>
