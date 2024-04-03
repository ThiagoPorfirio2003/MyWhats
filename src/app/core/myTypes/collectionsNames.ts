const constCollectionName = 
{
    USER: 'users'
} as const;


export type CollectionName = typeof constCollectionName[keyof typeof constCollectionName]
