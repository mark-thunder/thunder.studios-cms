import {CaseIcon} from '@sanity/icons/Case'
import {defineField, defineType} from 'sanity'
import {headingText} from '../objects/heading'
import {imageWithAlt} from '../shared/image-with-alt'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({name: 'title', title: 'Heading', type: 'heading'}),
    defineField({
      name: 'text',
      title: 'Explanation',
      type: 'text',
      description: 'One or two sentences under the heading.',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Page address',
      type: 'slug',
      description:
        'Optional. Set it to give the service its own page at /services/<address>, such as podcast-production. Empty lists the service on the Services page only.',
      options: {source: (doc) => headingText(doc.title as {children?: {text?: string}[]}[])},
    }),
    imageWithAlt({
      name: 'image',
      title: 'Page photo',
      description:
        "The wide photo on the service's own page. Empty keeps a stand-in until one is uploaded.",
    }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Lower numbers show first. The row number follows this order.',
      validation: (rule) => rule.required().integer(),
    }),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'title', subtitle: 'slug.current', media: 'image'},
    prepare: ({title, subtitle, media}) => ({title: headingText(title), subtitle, media}),
  },
})
