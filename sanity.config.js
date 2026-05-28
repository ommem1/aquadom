import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schema'
import { GenerateSeoAction } from './sanity/actions/generateSeo'

export default defineConfig({
  name: 'default',
  title: 'AquaDom',
  projectId: 'u9a9j56i',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, context) => {
      if (context.schemaType === 'product') {
        return [GenerateSeoAction, ...prev]
      }
      return prev
    },
  },
})
