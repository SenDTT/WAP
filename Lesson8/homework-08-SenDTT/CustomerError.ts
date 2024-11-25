export default class CustomerError extends Error {
  constructor(message: string, public statusCode: number = 500) {
    super(message);
  }
}
