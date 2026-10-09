import {HomeIcon} from '@sanity/icons/Home'
import {defineField, defineType} from 'sanity'
import {headingText} from '../objects/heading'
import {imageWithAlt} from '../shared/image-with-alt'

export const space = defineType({
  name: 'space',
  title: 'Studio space',
  type: 'document',
  icon: HomeIcon,
  description:
    'A room people book, such as the video podcast studio. Each one is a band on the home page.',
  fields: [
    defineField({name: 'title', title: 'Heading', type: 'heading'}),
    defineField({
      name: 'text',
      title: 'Explanation',
      type: 'text',
      description: 'One or two sentences on what the room is for and what we do in it.',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    imageWithAlt({
      name: 'photo',
      description: 'The room itself. Wide works best; the site crops it to 5:4.',
    }),
    defineField({
      name: 'service',
      type: 'reference',
      to: [{type: 'service'}],
      description:
        "Optional. The service booked in this room. The band's button leads to its page.",
    }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Lower numbers show first. The studio number follows this order.',
      validation: (rule) => rule.required().integer(),
    }),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'title', media: 'photo'},
    prepare: ({title, media}) => ({title: headingText(title), media}),
  },
})
