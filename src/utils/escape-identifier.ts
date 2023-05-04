export const escapeIdentifier = (name: string, escapeCharacter: string) =>
  `${escapeCharacter}${name}${escapeCharacter}`;
