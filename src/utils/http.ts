export const httpRequest = async (url: string, method: string, data?: any) => {
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (method !== 'GET' && data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(url, config);
  return response.json();
};
