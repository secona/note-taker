import { customAlphabet } from 'nanoid';

const generateId = customAlphabet(
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  15
);

export default generateId;
