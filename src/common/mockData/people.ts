const singldata = {
  sent_by: 'Jane Doe',
  email: 'janedoe@email.ng',
  title: 'Honourable Minister',
  office: 'Office of the Minister',
  parastatal: 'Ministry of Trade and Investment',
  last_active: '30-01-2024, 4:30pm',
  created_at: '01-01-2024',
};
export const dummyPeople = new Array(20)
  .fill('o')
  .map((_, idx) => ({ ...singldata, id: idx }));
