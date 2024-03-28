export const singleDummyCorrespondenceData = {
  sent_by: 'Nigerian Breweries',
  recipient: 'Jane Doe',
  subject: 'Executive_Support_Letter.pdf',
  ref_no: '123 4567 890',
  document: 'Export of Brewery Products.pdf',
  comment:
    'Dear HM, I hope this message finds you well. Please find correspondence from the Nigerian Breweries requesting action. ',
  created_at: '30-01-2024',
};

export const dummyCorrespondence = new Array(5)
  .fill('o')
  .map((_, idx) => ({ ...singleDummyCorrespondenceData, id: idx }));
