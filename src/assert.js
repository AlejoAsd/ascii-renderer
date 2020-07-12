import v from '@mapbox/fusspot';

export const isRequired = v.required;
export const isFunc = v.assert(v.func);
export const isString = v.assert(v.string);
export const isNonEmptyString = v.assert(v.nonEmptyString);
export const isArray = v.assert(v.plainArray);
export const isBool = v.assert(v.boolean);
export const isNumber = v.assert(v.number);
export const isInteger = v.assert((value) => {
  if (typeof value !== 'number' || !Number.isInteger(value)) {
    return 'integer';
  }
});

export const isInstanceOf = (type, value) => {
  return v.assert(v.instanceOf(type))(value);
};