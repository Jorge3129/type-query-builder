export const escapeIdentifierUsingChar = (
  name: string,
  escapeCharacter: string
) => `${escapeCharacter}${name}${escapeCharacter}`;
