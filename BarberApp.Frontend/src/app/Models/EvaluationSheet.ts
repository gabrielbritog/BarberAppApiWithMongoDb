export interface EvaluationSheet{
  entryTime: string,                      // Horário de entrada
  departureTime: string,                  // Horário de saída
  details: string,                        // Detalhes
  practicePhysicalActivity: boolean,      // Pratica atividade física
  physicalActivity: string,               // Atividade física
  bodyProportions: {
    weight: number,                       // Peso
    height: number,                       // Altura
    bloodPressure: string,                // Pressão arterial
    imc: number,                          // IMC (Índice de Massa Corporal)
    classification: string,               // Classificação
    waist: number,                        // Cintura
    hip: number,                          // Quadril
    abdomen: number                       // Abdômen
  },
  observations: string,                   // Observações
  appraiser: string,                      // Avaliador
  dateOfAssessment: string,               // Data da avaliação
  certificateDelivered: string,           // Certificado entregue
  dateOfReturn: string                    // Data de retorno
}

export interface CustomObject{
  key: string,
  value: string,
}
