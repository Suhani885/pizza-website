import { defineConfig } from '@hey-api/openapi-ts';
import { BASE_URL } from './src/services/base';

export default defineConfig({
  input: `${BASE_URL}`,
  output: 'src/services/api/gen',
  plugins: ['@hey-api/client-axios', '@tanstack/react-query'],
});
