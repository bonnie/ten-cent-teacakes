export const processApiError = (error: unknown) => {
  let status: number;
  let message: string | undefined;

  if (error instanceof Error) {
    message = error.message;
    // TODO: figure out why this doesn't get returned with 500 response
    console.error(message);

    if (error.name === "RecordNotFound") {
      status = 404;
    } else {
      status = 500;
    }
  } else {
    status = 500;
  }
  return { status, message };
};
