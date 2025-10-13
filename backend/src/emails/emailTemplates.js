export const createWelcomeEmailTemplate = (name, clientUrl) => `
    <h1>Hello ${name}</h1>
    <h3>Welcome to FastChat</h3>
    <a href=${clientUrl}>Open FastChat</a>
`;
