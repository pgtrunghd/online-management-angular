export const environment: { production: boolean; apiUrl: string } = {
  production: true,
  apiUrl: import.meta.env['NG_APP_BASE_URL'],
};
