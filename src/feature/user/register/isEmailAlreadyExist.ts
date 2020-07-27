import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

import { UserModel } from '../../../entity/User'

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint
  implements ValidatorConstraintInterface {
  validate(email: string): any {
    return UserModel.findOne({ email }).then((user) => {
      // console.log('Inside IsEmailAlreadyExistConstraint. user=', user)
      if (user) return false
      return true
    })
  }
}

export function IsEmailAlreadyExist(
  validationOptions?: ValidationOptions
): any {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyExistConstraint,
    })
  }
}
