require('dotenv').config();
const axios = require('axios');

const data = {
  content: {
    contentEntities: [
      {
        entityLocation: 'https://www.ubeshi.com',
      },
    ],
  },
  distribution: {
    linkedInDistributionTarget: {},
  },
  owner: `urn:li:organization:${process.env.LINKEDIN_ORG_ID}`,
  subject: 'Test',
  text: {
    text: 'Test \n#ubeshi #gpt2',
  },
};
axios.post('https://api.linkedin.com/v2/shares', data, {
  headers: {
    Authorization: `Bearer ${process.env.LINKEDIN_TOKEN}`,
    'Content-Type': 'application/json',
  },
}).catch((e) => {
  console.log(e);
});
