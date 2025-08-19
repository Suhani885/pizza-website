import { createClient } from '@hey-api/client-axios';

export const client = createClient({
  baseURL: 'http://localhost:8000',
});

