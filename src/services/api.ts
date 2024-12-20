import axios from 'axios';
import { SubscriptionType } from '../types';
import { LoginResponse, LoginRequest } from '../components/Auth/Auth';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export interface Resource {
  _id: string;
  name: string;
  type: 'PDF' | 'VIDEO';
  videoUrl?: string;
  fileUrl?: string;
  isPremium: boolean;
  isLocked: boolean;
  size: number;
  duration: number | string;
  subjectId: string;
  description?: string;
  thumbnailUrl?: string;
  subjectPrice?: number;
  standardPrice?: number;
  url?: string;
}

export interface Board {
  _id: string;
  name: string;
  image?: string;
  imageUrl?: string;
  standardsCount: number;
}

export interface Standard {
  _id: string;
  name: string;
  boardId: string;
  grade: number;
  imageUrl?: string;
  description?: string;
}

interface Subject {
  _id: string;
  name: string;
  price: number;
  imageUrl?: string;
  standard: {
    _id: string;
    grade: string;
  };
}

interface ResourceWithPricing {
  _id: string;
  name: string;
  description: string;
  type: string;
  // ... other resource fields ...
  pricing: {
    subjectPrice: number;
    standardPrice: number;
    totalPrice: number;
  };
}


export interface CheckoutSession {
  url: string;
  sessionId: string;
}

export interface SubscriptionConfirmation {
  success: boolean;
  subscription?: {
    id: string;
    type: string;
    status: string;
  };
}

export interface User {
  _id: string;
  email: string;
  name: string;
  // add other user properties as needed
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

interface Api {
  // ... other methods ...
  verifyPayment: (sessionId: string) => Promise<any>;
}

interface CheckoutSessionParams {
  subjectId: string;
  standardId?: string;
  resourceId?: string;
  type: 'subject' | 'standard';
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

// Add request interceptor to include token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json'
  };
};

export const api = {
  // Get all resources with optional filters
  getResources: async (params?: {
    boardId?: string;
    standardId?: string;
    subjectId?: string;
    type?: 'PDF' | 'VIDEO';
  }): Promise<ApiResponse<Resource[]>> => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/resources`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching resources:', error);
      throw error;
    }
  },

login: async (credentials: { email: string; password: string }) => {
  try {
    console.log('Making login request to:', `${BASE_URL}/login`);
    
    const response = await axios.post(
      `${BASE_URL}/login`, 
      credentials,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('API Response:', response.data);
    
    // Check if we have both user and token
    if (response.data.user) {
      // Create a properly formatted response
      return {
        success: true,
        data: {
          user: response.data.user,
          token: response.data.token // Make sure your backend sends this
        }
      };
    }

    throw new Error('Invalid response format');
  } catch (error: any) {
    console.error('Login API error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Invalid credentials');
  }
},
  // Get a single resource by ID
  getResourceById: async (id: string): Promise<ApiResponse<Resource>> => {
    try {
      const response = await axios.get(`${BASE_URL}/resources/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching resource:', error);
      throw error;
    }
  },

  // Get resources by subject ID
  getResourcesBySubject: async (subjectId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/subjects/${subjectId}/resources`);
      console.log('API Response:', response.data); // Debug log
      return response.data;
    } catch (error) {
      console.error('Error in getResourcesBySubject:', error);
      throw error;
    }
  },

  // Search resources
  searchResources: async (params: {
    query?: string;
    board?: string;
    standard?: string;
    subject?: string;
    type?: 'PDF' | 'VIDEO';
  }): Promise<ApiResponse<Resource[]>> => {
    try {
      const response = await axios.get(`${BASE_URL}/search/resources`, { params });
      return response.data;
    } catch (error) {
      console.error('Error searching resources:', error);
      throw error;
    }
  },

  // Get subject details
 

   getBoards: async (): Promise<ApiResponse<Board[]>> => {
    const response = await axios.get(`${BASE_URL}/boards`);
    return response.data;
  },

  getStandards: async (boardId: string): Promise<ApiResponse<Standard[]>> => {
    const response = await axios.get(`${BASE_URL}/boards/${boardId}/standards`);
    return response.data;
  },
  
  getBoardDetails: async (boardId: string): Promise<ApiResponse<Board>> => {
    const response = await axios.get(`${BASE_URL}/boards/${boardId}`);
    return response.data;
  },

  getSubjectsByStandard : async (standardId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/standards/${standardId}/subjects`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
},

 getSubjectDetails : async (subjectId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/subjects/${subjectId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
},

  searchSubjects : async (query: string, page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: { query, page, limit }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
},

 

  register: async (userData: any): Promise<void> => {
    return axios.post(`${BASE_URL}/register`, userData);
  },
  
  getResourceWithPricing: async (resourceId: string): Promise<ApiResponse<ResourceWithPricing>> => {
    try {
      const response = await axios.get(`${BASE_URL}/resources/${resourceId}/pricing`);
      return response.data;
    } catch (error) {
      console.error('Error fetching resource pricing:', error);
      throw error;
    }
  },

  getSubjectResources: async (subjectId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/subjects/${subjectId}/resources`);
    return response.data;
  } catch (error) {
    throw error;
  }
},


  verifySubscription: async (subjectId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/subscriptions/verify/${subjectId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
},

//     checkSubscriptionStatus: async (subjectId: string) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/subscriptions/status/${subjectId}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// },

//     getSubjectResources: async (subjectId: string) => {
//   try {
//     const response = await axios.get(`/api/subjects/${subjectId}/resources`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// },

//     createCheckoutSession: async (data: {
//   subjectId: string;
//   standardId?: string;
//   type: 'subject' | 'standard';
// }) => {
//   try {
//     const response = await axios.post('/api/checkout/create-session', data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// },

    verifyPayment: async (sessionId: string) => {
    try {
      // Get the auth token from localStorage or your auth context
      const token = localStorage.getItem('token'); // or however you store your token
      
      const response = await axios.post(
        `${BASE_URL}/verify`, // Updated path
        { sessionId },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  checkSubscriptionStatus: async (subjectId: string): Promise<{
    hasAccess: boolean;
    subscriptionType?: 'subject' | 'standard';
  }> => {
    try {
      const response = await axios.get(`${BASE_URL}/subscriptions/status/${subjectId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
createSubscription: async (resourceId: string) => {
    const response = await axios.post('/subscribe', { resourceId });
    return response.data;
  },

  confirmSubscription: async (data: { sessionId: string }): Promise<ApiResponse<any>> => {
    try {
      const response = await axios.post(
        `${BASE_URL}/subscribe/confirm`,
        data,
        {
          headers: getAuthHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  createCheckoutSession: async (data: {
  subjectId: string;
  type: 'SUBJECT' | 'STANDARD';
}) => {
  try {
    const token = localStorage.getItem('token');
    
    // Debug log
    console.log('Creating checkout session with token:', token ? 'Present' : 'Missing');

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.post(
      `${BASE_URL}/checkout/create-session`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    );
    
    return response.data;
  } catch (error: any) {
    console.error('Create checkout session error:', error.response || error);
    
    if (error.response?.status === 401) {
      // Clear invalid token
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw new Error('Please log in again');
    }
    throw error;
  }
},
}




function handleApiError(error: unknown) {
  throw new Error('Function not implemented.');
}
