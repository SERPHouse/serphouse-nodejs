import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

if (!process.env.API_KEY) {
  console.warn(
    'API_KEY not found in .env — integration tests will be skipped. Copy .env.example to .env and set your key.',
  );
}
