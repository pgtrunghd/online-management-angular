export const environment: { production: boolean; apiUrl: string } = {
  production: true,
  apiUrl: (window as any)['env']['API_URL'],
};
