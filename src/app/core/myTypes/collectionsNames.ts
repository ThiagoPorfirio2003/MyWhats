const constCollectionNames = 
{
    USER: 'users',
    PRODUCTS: 'products',
    UNIQUE_USER_NAMES: 'uniqueUserNames'
} as const;

const constSubCollectionNames = 
{
    REVIEWS: 'reviews'
} as const;


export type CollectionName = typeof constCollectionNames[keyof typeof constCollectionNames]
export type SubCollectionNames = typeof constSubCollectionNames[keyof typeof constSubCollectionNames]

