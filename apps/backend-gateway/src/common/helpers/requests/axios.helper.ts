import axios, { AxiosInstance } from 'axios';
import { HttpException } from '@nestjs/common';

export function authAxios(path = ''): AxiosInstance {
  const url = process.env.AUTH_SERVICE_URL || 'http://localhost';
  const port = process.env.AUTH_SERVICE_PORT || 3000;
  try {
    return axios.create({
      baseURL: `${url}:${port}${path}`,
      headers: {
        'Content-Type': 'application/json',
      },
      validateStatus: function (status) {
        return status < 500;
      },
    });
  } catch (err) {
    throw new HttpException(err.message, err.status);
  }
}

export function buAxios(path = ''): AxiosInstance {
  const url = process.env.BU_SERVICE_URL || 'http://localhost';
  const port = process.env.BU_SERVICE_PORT || 3000;
  try {
    return axios.create({
      baseURL: `${url}:${port}${path}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    throw new HttpException(err.message, err.status);
  }
}

export function storageAxios(path = ''): AxiosInstance {
  const url = process.env.STORAGE_SERVICE_URL || 'http://localhost';
  const port = process.env.STORAGE_SERVICE_PORT || 3000;
  try {
    return axios.create({
      baseURL: `${url}:${port}${path}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    throw new HttpException(err.message, err.status);
  }
}
