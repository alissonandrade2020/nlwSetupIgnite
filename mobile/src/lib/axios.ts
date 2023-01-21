import axios from "axios";

export const api = axios.create({
  // baseURL: 'http://192.168.3.10:3333',
  baseURL: 'https://nlwsetupignite-production.up.railway.app/'
})