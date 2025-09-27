import type { CollectionConfig } from 'payload'

export const Grams: CollectionConfig = {
  slug: 'grams',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'date',
  },
  fields: [
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
