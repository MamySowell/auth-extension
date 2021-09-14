export interface AuthStateInterface {
  token: string|null;
}

function state(): AuthStateInterface {
  return {
    token: ''
  }
};

export default state;
