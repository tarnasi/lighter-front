import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query Me {
    me {
      id
      full_name
      mobile
      email
      birthday
      role
      wholesaler
    }
  }
`;

export const USER_LIST_QUERY = gql`
  query UserList {
    userList {
      id
      full_name
      mobile
      email
      role
      birthday
      wholesaler
    }
  }
`;

export const CATEGORY_LIST_QUERY = gql`
  query CategoryList {
    categoryList {
      id
      name
      slug
      description
      image
    }
  }
`;

export const CATEGORY_BY_ID_QUERY = gql`
  query Category($id: ID!) {
    category(id: $id) {
      id
      name
      slug
      description
      image
      brands {
        id
        name
        slug
        description
        image
      }
    }
  }
`;

export const BRAND_LIST_QUERY = gql`
  query BrandList {
    brandList {
      id
      name
      slug
      description
      image
      category {
        id
        name
        slug
      }
    }
  }
`;

export const BRAND_BY_ID_QUERY = gql`
  query Brand($id: ID!) {
    brand(id: $id) {
      id
      name
      slug
      description
      image
      category {
        id
        name
        slug
      }
    }
  }
`;

export const PRODUCT_LIST_QUERY = gql`
  query ProductList($categoryId: ID, $brandId: ID) {
    productList(categoryId: $categoryId, brandId: $brandId) {
      id
      title
      slug
      images
      description
      price
      discount
      quantity
      is_pack
      created_at
      updated_at
      category {
        id
        name
        slug
        description
        image
      }
      brand {
        id
        name
        slug
        description
        image
      }
    }
  }
`;

export const PRODUCT_BY_ID_QUERY = gql`
  query Product($id: ID!) {
    product(id: $id) {
      id
      title
      slug
      images
      description
      price
      discount
      quantity
      is_pack
      created_at
      updated_at
      category {
        id
        name
        slug
        description
        image
      }
      brand {
        id
        name
        slug
        description
        image
      }
    }
  }
`;

export const BASKET_QUERY = gql`
  query Basket {
    basket {
      id
      user_no
      is_login
      products: []
    }
  }
`;

export const REMOVE_FROM_BASKET_MUTATION = gql``;
