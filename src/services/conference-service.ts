import { gql, DocumentNode } from '@apollo/client';

const getConferenceSpeakers = () : DocumentNode => gql`query GetConferences($id: ID!) {
        conference(id: $id) {
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


const getConferenceLocations = () : DocumentNode => gql`query GetConferences($id: ID!) {
  conference(id: $id) {
    locations{
      address
      city
      image {
        url
      }
      country{
        name
      }
    }
  }
}
`;

export {
  getConferenceSpeakers,
  getConferenceLocations,
};
