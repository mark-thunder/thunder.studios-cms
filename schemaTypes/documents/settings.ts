import {CogIcon} from '@sanity/icons/Cog'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {imageWithAlt} from '../shared/image-with-alt'

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/

export const settings = defineType({
  name: 'settings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'company', title: 'Company', default: true},
    {name: 'photos', title: 'Photos'},
  ],
  fields: [
    defineField({
      name: 'name',
      group: 'company',
      title: 'Business name',
      type: 'string',
      description: 'Shown after every page title and in the footer, such as Thunder Studios.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'legalName',
      group: 'company',
      title: 'Legal name',
      type: 'string',
      description: 'For the copyright line and the policies.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'address',
      group: 'company',
      type: 'object',
      description: 'The studio. Shown in the footer, on Contact and to search engines.',
      fields: [
        defineField({
          name: 'street',
          type: 'string',
          description: 'Such as 1907 E US Hwy 80.',
          validation: (rule) => rule.required(),
        }),
        defineField({name: 'city', type: 'string', validation: (rule) => rule.required()}),
        defineField({
          name: 'state',
          type: 'string',
          description: 'Two letters, such as TX.',
          validation: (rule) => rule.required().uppercase().length(2),
        }),
        defineField({
          name: 'postalCode',
          title: 'ZIP code',
          type: 'string',
          validation: (rule) => rule.required().regex(/^\d{5}$/, {name: 'five digits'}),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phone',
      group: 'company',
      type: 'string',
      description:
        'As people read it, such as (903) 452-1765. The site makes the tap-to-call link.',
      validation: (rule) =>
        rule.required().regex(/^\(\d{3}\) \d{3}-\d{4}$/, {name: '(xxx) xxx-xxxx'}),
    }),
    defineField({
      name: 'email',
      group: 'company',
      type: 'string',
      description: 'Where enquiries go.',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'hours',
      group: 'company',
      title: 'Studio hours',
      type: 'array',
      description:
        'One row per group of days with the same hours. Leave it empty until the hours are set; the site then says they are coming soon.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'openingHours',
          fields: [
            defineField({
              name: 'days',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
              options: {
                list: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday',
                ],
                layout: 'grid',
              },
              validation: (rule) => rule.required().min(1).unique(),
            }),
            defineField({
              name: 'opens',
              type: 'string',
              description: '24-hour time, such as 07:00.',
              validation: (rule) => rule.required().regex(TIME, {name: 'HH:MM'}),
            }),
            defineField({
              name: 'closes',
              type: 'string',
              description: '24-hour time, such as 19:00.',
              validation: (rule) => rule.required().regex(TIME, {name: 'HH:MM'}),
            }),
          ],
          preview: {
            select: {days: 'days', opens: 'opens', closes: 'closes'},
            prepare: ({days, opens, closes}) => ({
              title: (days ?? []).join(', '),
              subtitle: `${opens ?? ''}–${closes ?? ''}`,
            }),
          },
        }),
      ],
    }),
    imageWithAlt({
      name: 'studioPhoto',
      title: 'Studio photo',
      group: 'photos',
      description:
        'The studio itself. Shown beside the title on the home page. Empty keeps the photo built into the site.',
    }),
    imageWithAlt({
      name: 'sessionPhoto',
      title: 'Session photo',
      group: 'photos',
      description:
        'A recording or shoot in progress. Shown wide on the Services page. Empty keeps the photo built into the site.',
    }),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
})
