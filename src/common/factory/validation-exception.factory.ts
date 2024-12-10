import { BadRequestException, ValidationError } from '@nestjs/common';
import { iterate } from 'iterare';

export const validationExceptionFactory = (errors) => {
  const errorResponses = flattenValidationErrors(errors);

  throw new BadRequestException(errorResponses[0]);
};

const flattenValidationErrors = (validationErrors: ValidationError[]) =>
  iterate(validationErrors)
    .map((error) => mapChildrenToValidationErrors(error))
    .flatten()
    .filter(
      (item) =>
        item.constraints != null && Object.keys(item.constraints).length !== 0,
    )
    .map((err) => {
      return Object.keys(err.constraints).map((item) => {
        if (err.contexts?.[item] != null) {
          return err.contexts[item];
        }

        if (item === 'isDefined') {
          return `is_required.${err.property}`;
        }

        return `not_valid.${err.property}`;
      });
    })
    .flatten()
    .toArray();

const mapChildrenToValidationErrors = (
  error: ValidationError,
  parentPath?: string,
): ValidationError[] => {
  if (!(error.children && error.children.length)) {
    return [error];
  }
  const validationErrors = [];
  parentPath = parentPath ? `${parentPath}.${error.property}` : error.property;
  for (const item of error.children) {
    if (item.children && item.children.length) {
      validationErrors.push(...mapChildrenToValidationErrors(item, parentPath));
    }
    validationErrors.push(prependConstraintsWithParentProp(parentPath, item));
  }
  return validationErrors;
};

const prependConstraintsWithParentProp = (
  parentPath: string,
  error: ValidationError,
): ValidationError => {
  const constraints = {};
  for (const key in error.constraints) {
    constraints[key] = `${parentPath}.${error.constraints[key]}`;
  }
  return {
    ...error,
    constraints,
  };
};
