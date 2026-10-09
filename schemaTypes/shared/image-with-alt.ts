import {defineField} from 'sanity'

/** A photo with its focal point and the alt text the site needs, for any field that holds one. */
export const imageWithAlt = (field: {
  name: string
  title?: string
  description: string
  group?: string
}) =>
  defineField({
    ...field,
    type: 'image',
    options: {hotspot: true},
    fields: [
      defineField({
        name: 'alt',
        title: 'Alt text',
        type: 'string',
        description: 'What the image shows, for anyone who cannot see it.',
        validation: (rule) => rule.required(),
      }),
    ],
  })
