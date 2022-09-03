import { gql, DocumentNode } from '@apollo/client';

const getConferenceSpeakers = () : DocumentNode => gql`query GetConferences($id: ID!) {
        conference(id: $id) {
          id
          speakers{
            name
            aboutShort
            image{
              url
            }
          }
        }
      }
      `;

export {
  getConferenceSpeakers,
};
