export enum ErrorName {
  ServerError = 'SERVER_ERROR',
  UserAlreadyExists = 'USER_ALREADY_EXISTS',
  UserHasNotEnoughCredits = 'USER_HAS_NOT_ENOUGH_CREDITS',
}

export class CustomError extends Error {
  constructor(public message: string) {
    super(message);
  }
}

export class UserHasNotEnoughCredits extends CustomError {
  constructor() {
    super(ErrorName.UserHasNotEnoughCredits);
  }
}

export class UserAlreadyExists extends CustomError {
  constructor() {
    super(ErrorName.UserAlreadyExists);
  }
}
