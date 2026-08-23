
type envKeys = 'API_BASE_URL' | 'NEXT_PUBLIC_API_IMG_URL'|'API_IMG_URL' | 'NODE_ENV' | 'NEXT_PUBLIC_GOOGLE_MAP_API_KEY';
function env(name: envKeys, required?: true): string;

function env(name: envKeys, required: false): string | undefined;

function env(name: envKeys, required = true): string | undefined {
  const value = process.env[name];
    console.log(value,'das2edsa');
  if (required && !value) {
    console.error(`Environment variable ${name} is required but not found.`);
  }

  return value;
}

export default env;
