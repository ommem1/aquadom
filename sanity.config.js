import { defineConfig } from 'sanity'
import { schemaTypes } from './sanity/schema'

export default defineConfig({
  name: 'aquadom',
  title: 'AquaDom',
  projectId: 'u9a9j56i',
  dataset: 'production',
  schema: {
    types: schemaTypes,
  },
})
