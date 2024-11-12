// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.101.2.94:8000/', 
});

export const getMarketplaceItems = async () => {
  const response = await api.get('marketplace/items/');
  return response.data;
};

export const getCategories = async () => {
    const response = await api.get('marketplace/categories/');
    return response.data;
  };
  
  export const getListings = async () => {
    const response = await api.get('marketplace/listings/');
    return response.data;
  };
  
  export const getAuctionListings = async () => {
    const response = await api.get('marketplace/auctions/');
    return response.data;
  };

export default api;