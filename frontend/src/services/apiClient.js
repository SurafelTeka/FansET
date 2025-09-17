const normalizeEndpoint = (endpoint) => {
  if (!endpoint) {
    return '';
  }

  return endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
};

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace(/\/$/, '');

export const apiClient = async (endpoint, { method = 'GET', data, token, headers, ...customConfig } = {}) => {
  const config = {
    method,
    headers: {
      ...(headers || {})
    },
    ...customConfig
  };

  if (data !== undefined) {
    config.headers['Content-Type'] = 'application/json';
    config.body = JSON.stringify(data);
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${normalizeEndpoint(endpoint)}`, config);
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    const error = new Error(payload?.error || 'Request failed');
    error.status = response.status;
    error.details = payload;
    throw error;
  }

  return payload;
};
