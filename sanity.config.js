import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './sanity/schema'

export default defineConfig({
  name: 'aquadom',
  title: 'AquaDom',
  projectId: 'u9a9j56i',
  dataset: 'production',
  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
})
