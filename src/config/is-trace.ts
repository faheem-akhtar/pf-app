// The code inside configIsTrace condition will be eliminated from the bundle,
// But at the same time allowes developers to leave traces for easier
// debugging of the application
// Start app with TRACE=1 yarn dev to use it
export const configIsTrace = !!process.env.TRACE;
