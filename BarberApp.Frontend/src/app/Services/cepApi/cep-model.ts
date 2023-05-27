export interface CepAdressModel
{
  cep: string,
  logradouro: string,
  complemento: string,
  uf: string,
  bairro: string,
  localidade: string,
  ibge: string,
  gia: string,
  ddd: string,
  siafi: string,

  erro?: boolean
}
