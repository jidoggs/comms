const singleData = {
  firstname: 'Jane Doe',
  lastname: 'Jane Doe',
  full_name: 'Jane Doe',
  email: 'janedoe@email.ng',
  title: 'Honourable Minister',
  office: 'Office of the Minister',
  parastatal: 'Ministry of Trade and Investment',
  last_active: '30-01-2024, 4:30pm',
  date_sent: '30-01-2024, 4:30pm',
  date_created: '01-01-2024',
};

export const dummyPersonsPending = new Array(20).fill('o').map((_, idx) => ({
  ...singleData,
  firstname: '',
  lastname: '',
  title: '',
  office: '',
  full_name: '',
  id: idx,
}));
export const dummyPersons = new Array(20)
  .fill('o')
  .map((_, idx) => ({ ...singleData, id: idx }));
