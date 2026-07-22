import { defineConfig } from 'vitest/config'
import path from 'path'

const targetDir = process.env.TEST_TARGET || 'sessions/session1'

export default defineConfig({
  resolve: {
    alias: [{
      find: '@code',
      replacement: path.resolve(__dirname, targetDir),
    }],
  },
  test: {
    include: ['src/__tests__/**/*.ts'],
    globals: true,
    reporter: 'minimal',
  },
})
