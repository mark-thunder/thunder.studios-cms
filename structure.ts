import {CogIcon} from '@sanity/icons/Cog'
import type {StructureResolver} from 'sanity/structure'

/** Types that exist once, opened by a fixed id and kept out of the lists below. */
export const SINGLETONS = ['settings']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site settings')
        .icon(CogIcon)
        .child(S.document().schemaType('settings').documentId('settings').title('Site settings')),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !SINGLETONS.includes(item.getId() as string)),
    ])
