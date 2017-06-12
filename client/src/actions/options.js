export const KEY_FIELD_SELECT = 'KEY_FIELD_SELECT';
export const IGNORE_FIELD_SELECT = 'IGNORE_FIELD_SELECT';

export function selectKeyField(id, value, fields) {
  return { type: KEY_FIELD_SELECT, id, value, fields };
}

export function selectIgnoreField(id, value, fields) {
  return { type: IGNORE_FIELD_SELECT, id, value, fields };
}
