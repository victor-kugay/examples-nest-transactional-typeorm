export enum ErrorName {
  ServerError = 'SERVER_ERROR',
  UserDoesntExist = 'USER_DOESNT_EXIST',
  UserAlreadyExists = 'USER_ALREADY_EXISTS',
  CatDoesntExist = 'CAT_DOESNT_EXIST',
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

export class UserDoesntExist extends CustomError {
  constructor() {
    super(ErrorName.UserDoesntExist);
  }
}

export class CatDoesntExist extends CustomError {
  constructor() {
    super(ErrorName.CatDoesntExist);
  }
}
