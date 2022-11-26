import axios from 'axios';

export interface AddressData {
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  cep: string;
}

export const getAddress = async (zipCode: string): Promise<AddressData> => {
  const response = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);
  return response.data;
};
