import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schema'

export default defineConfig({
  name: 'aquadom',
  title: 'AquaDom',
  projectId: 'u9a9j56i',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})
