const errorHandler = async ({ response } : { response: any }, next: () => void) => {
  try {
    await next();
  } catch (err) {
    response.status = 500;
    response.body = {
      status: 500,
      message: 'Internal server error',
      error: err.message
    };
  }
}

export default errorHandler;
