// Production replacement for "leva" (see vite.config.js).
// Returns the default values from the schema without loading the GUI library.

const getDefault = (input) =>
  input !== null && typeof input === "object" && "value" in input
    ? input.value
    : input;

export function useControls(nameOrSchema, maybeSchema) {
  const schema = typeof nameOrSchema === "string" ? maybeSchema : nameOrSchema;
  const values = {};
  for (const key in schema) {
    values[key] = getDefault(schema[key]);
  }
  return values;
}

export function Leva() {
  return null;
}
