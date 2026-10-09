import {defineArrayMember, defineType} from 'sanity'

type Block = {children?: {text?: string}[]}

/** The words of a heading, without its marks. */
export const headingText = (blocks?: Block[]) =>
  (blocks ?? [])
    .flatMap((block) => block.children ?? [])
    .map((span) => span.text ?? '')
    .join('')

export const heading = defineType({
  name: 'heading',
  title: 'Heading',
  type: 'array',
  description: 'Select words and press I or B to set them in italic or bold.',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{title: 'Normal', value: 'normal'}],
      lists: [],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [],
      },
    }),
  ],
  validation: (rule) => rule.required().max(1).error('Keep the heading to one line.'),
})
