import {TagIcon} from '@sanity/icons/Tag'
import {defineField, defineType} from 'sanity'

export const plan = defineType({
  name: 'plan',
  title: 'Rate',
  type: 'document',
  icon: TagIcon,
  description: 'A way to book studio time, such as by the hour or as a member.',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      description: 'Such as Hourly or Membership.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      type: 'number',
      description: 'In US dollars, without the sign.',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'per',
      title: 'Charged per',
      type: 'string',
      options: {
        list: [
          {title: 'Hour', value: 'hour'},
          {title: 'Session', value: 'session'},
          {title: 'Month', value: 'month'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 2,
      description: 'One sentence on what it includes and who it suits.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Lower numbers show first.',
      validation: (rule) => rule.required().integer(),
    }),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'name', price: 'price', per: 'per'},
    prepare: ({title, price, per}) => ({title, subtitle: `$${price ?? ''} per ${per ?? ''}`}),
  },
})
