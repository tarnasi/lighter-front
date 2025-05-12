import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($mobile: String!, $password: String!) {
    login(mobile: $mobile, password: $password) {
      token
      user {
        id
        mobile
        email
        birthday
        role
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
        role
      }
    }
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      id
      username
      email
      role
    }
  }
`;
