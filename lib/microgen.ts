import { MicrogenClient } from 'microgen-v3-sdk';

const microgen = new MicrogenClient({
  apiKey: String(process.env.NEXT_PUBLIC_API_KEY_MICROGEN),
});

export default microgen;
