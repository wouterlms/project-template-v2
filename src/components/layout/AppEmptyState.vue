<template>
  <div class="flex h-[20rem] rounded border border-solid border-neutral-200 bg-neutral-50">
    <CenterContent>
      <div class="text-center">
        <AppText
          class="text-primary font-medium"
          variant="body-2"
        >
          <slot name="title" />
        </AppText>

        <AppText
          class="mx-auto mt-1 max-w-sm"
          variant="body-1"
        >
          <slot name="message" />
        </AppText>
      </div>
    </CenterContent>
  </div>
</template>
