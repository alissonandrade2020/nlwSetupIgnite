import axios from "axios";

export const api = axios.create({
  baseURL: 'https://nlwsetupignite-production.up.railway.app'
})