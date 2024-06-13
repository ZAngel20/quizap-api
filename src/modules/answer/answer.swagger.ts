export const SwBodyAnswerCreate = {
  schema: {
    type: 'object',
    properties: {
      idQuestion: { example: '0' },
      text: { example: '"null"' },
    },
  },
};

export const SwOperationAnswerCreate = {
  summary: 'Create an answer',
  description: 'Create an answer.',
};
