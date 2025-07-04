import { gql } from "@apollo/client";

export const USER_ME_QUERY = gql`
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

export const USER_UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: UpdateUserProfileInput!) {
    updateProfile(input: $input) {
      id
      full_name
      email
      mobile
      role
      birthday
      wholesaler
    }
  }
`;

export const CATEGORY_LIST_QUERY = gql`
  query CategoryList(
    $search: String
    $sort: CategorySortInput
    $pagination: CategoryPaginationInput
  ) {
    categoryList(search: $search, sort: $sort, pagination: $pagination) {
      items {
        id
        name
        slug
        description
        image
      }
      total
      page
      pageSize
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
  query BrandList(
    $search: String
    $sort: SortBrandInput
    $pagination: BrandPaginationInput
  ) {
    brandList(search: $search, sort: $sort, pagination: $pagination) {
      items {
        id
        name
        slug
        description
        image
      }
      total
      page
      pageSize
    }
  }
`;

export const BRAND_LIST_BY_CATEGORY_QUERY = gql`
  query BrandByCategorySlug(
    $catSlug: String!
    $pagination: BrandPaginationInput
  ) {
    brandByCategorySlug(catSlug: $catSlug, pagination: $pagination) {
      items {
        id
        name
        slug
        description
        image
        category {
          slug
        }
      }
      total
      page
      pageSize
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
  query ProductList(
    $categoryId: ID
    $brandId: ID
    $search: String
    $sort: SortProductInput
    $pagination: PaginationProductInput
  ) {
    productList(
      categoryId: $categoryId
      brandId: $brandId
      search: $search
      sort: $sort
      pagination: $pagination
    ) {
      items {
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
      total
      page
      pageSize
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

export const PRODUCT_BY_SLUG_QUERY = gql`
  query ProductBySlug($slug: String!) {
    productBySlug(slug: $slug) {
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

export const PRODUCT_LIST_BY_BRAND_QUERY = gql`
  query ProductByBrandSlug(
    $brandSlug: String!
    $pagination: PaginationProductInput
    $sort: SortProductInput
  ) {
    productByBrandSlug(
      brandSlug: $brandSlug
      pagination: $pagination
      sort: $sort
    ) {
      items {
        id
        title
        slug
        images
        price
        discount
        quantity
        created_at
        category {
          id
          name
          slug
        }
        brand {
          id
          name
          slug
        }
      }
      total
      page
      pageSize
    }
  }
`;

export const PRODUCT_LIST_BY_CATEGORY_QUERY = gql`
  query ProductByCategorySlug(
    $catSlug: String!
    $pagination: PaginationProductInput
    $sort: SortProductInput
  ) {
    productByCategorySlug(
      catSlug: $catSlug
      pagination: $pagination
      sort: $sort
    ) {
      items {
        id
        title
        slug
        images
        price
        discount
        quantity
        created_at
        category {
          id
          name
          slug
        }
        brand {
          id
          name
          slug
        }
      }
      total
      page
      pageSize
    }
  }
`;

export const BASKET_QUERY = gql`
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

export const REMOVE_FROM_BASKET_MUTATION = gql`
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

export const MY_ORDERS_QUERY = gql`
  query MyOrders {
    myOrders {
      id
      status
      total_price
      is_wholesaler
      created_at
      items {
        quantity
        price
        product {
          id
          title
          slug
          images
        }
      }
    }
  }
`;

export const GET_ORDER_QUERY = gql`
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      status
      total_price
      is_wholesaler
      created_at
      updated_at
      user {
        id
        full_name
      }
      items {
        quantity
        price
        product {
          id
          title
          slug
          images
        }
      }
    }
  }
`;

export const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
      status
      total_price
      is_wholesaler
      created_at
      items {
        quantity
        price
        product {
          id
          title
        }
      }
    }
  }
`;

export const UPDATE_ORDER_STATUS_MUTATION = gql`
  mutation UpdateOrderStatus($id: ID!, $status: String!) {
    updateOrderStatus(id: $id, status: $status) {
      id
      status
      updated_at
    }
  }
`;

export const CANCEL_ORDER_MUTATION = gql`
  mutation CancelOrder($id: ID!) {
    cancelOrder(id: $id) {
      id
      status
      updated_at
    }
  }
`;
