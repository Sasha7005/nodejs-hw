import { Joi, Segments } from 'celebrate';
import { TAGS } from '../constants/tags.js';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number()
      .integer()
      .min(1)
      .messages({
        'number.base': 'Page must be a number',
        'number.min': 'Page should have at least {#limit}',
      })
      .default(1),
    perPage: Joi.number()
      .integer()
      .min(5)
      .max(20)
      .messages({
        'number.base': 'perPage must be a number',
        'number.min': 'perPage must be at most  {#limit}',
        'number.max': 'perPage must be at most {#limit}',
      })
      .default(10),
    tag: Joi.string()
      .valid(...TAGS)
      .messages({
        'any.only': `Tag must be one of: ${TAGS}`,
      }),
    search: Joi.string().trim().allow(''),
  }),
};
export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title should have at least {#limit} characters',
      'any.required': 'Title is required',
    }),
    content: Joi.string().allow('').messages({
      'string.base': 'Content must be a string',
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .messages({
        'any.only': `Tag must be one of: ${TAGS}`,
      }),
  }),
};
export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title should have at least {#limit} characters',
    }),
    content: Joi.string().allow('').messages({
      'string.base': 'Content must be a string',
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .min(1)
      .messages({
        'any.only': `Tag must be one of: ${TAGS}`,
      }),
  }),
};
