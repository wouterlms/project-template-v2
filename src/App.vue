<script setup lang="ts">
import { useForm } from '@appwise/forms'

import { z } from 'zod'

// External input validaten
// Bv. api calls, user input, ...

const user = z.object({
  name: z.string(),
  age: z.number(),
  email: z.string().email(),
}).and(z.object({
  isRegistered: z.literal(true),
  registeredEmail: z.string().email(),
}).or(z.object({
  isRegistered: z.literal(false),
  registeredEmail: z.null(),
})))

user.parse({
  name: 'John',
  age: 2,
  email: 'email@gmail.com',
  isRegistered: true,
  registeredEmail: 'ksdfkdkj@gmail.com',
})

// ////////////////////////////////////////////////////////////////////////////////////////////////

const formSchema = z.object({
  firstName: z.string().min(1),
  address: z.object({
    street: z.string().min(1),
  }),
  tags: z.array(
    z.string().startsWith('#'),
  ).min(1),
})

const form = useForm(formSchema, {
  onSubmit: (values) => {
    console.log(values)
  },
})

const address = form.register('address')
const street = form.register('address.street', 'Waterstraat')
const tags = form.registerArray('tags')

const addTag = (): void => {
  tags.insert(tags.fields.length)
}

const removeTag = (index: number): void => {
  tags.remove(index)
  form.unregister(`tags.${index}`)
}
</script>

<template>
  <div class="p-24">
    <FormElement :form="form">
      <FormSpacer>
        <FormInput
          v-bind="form.register('firstName')"
          label="First name"
        />

        <div>
          Address group errors? {{ address.errors }}
        </div>

        <FormInput
          v-bind="street"
          label="Street"
        />

        <div
          v-for="(tag, i) of tags.fields"
          :key="tag"
        >
          <FormInput v-bind="form.register(`tags.${i}`)" />

          <AppButton @click="removeTag(i)">
            Remove
          </AppButton>
        </div>

        <AppButton @click="addTag">
          Add tag
        </AppButton>
      </FormSpacer>

      <div class="mt-8 flex flex-col gap-y-8 text-xs">
        <p class="whitespace-pre">
          Form errors {{ form.errors }}
        </p>

        <p>
          Form is valid {{ form.isValid }}
        </p>

        <p>
          Form is dirty {{ form.isDirty }}
        </p>

        <p class="whitespace-pre">
          Form state {{ form._state }}
        </p>
      </div>

      <FormButton :form="form">
        Submit
      </FormButton>
    </FormElement>
  </div>
</template>
