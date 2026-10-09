import {UserIcon} from '@sanity/icons/User'
import {defineField, defineType} from 'sanity'
import {imageWithAlt} from '../shared/image-with-alt'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team member',
  type: 'document',
  icon: UserIcon,
  description: 'Someone who runs sessions in the studio.',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role at the studio',
      type: 'string',
      description: 'Such as Owner or Lead.',
      validation: (rule) => rule.required(),
    }),
    imageWithAlt({
      name: 'photo',
      description: 'Optional. A portrait.',
    }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Lower numbers show first.',
      validation: (rule) => rule.required().integer(),
    }),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'role', media: 'photo'}},
})
