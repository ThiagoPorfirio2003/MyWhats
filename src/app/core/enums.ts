const constActivateStatus = 
{
    ON: 'on',
    OFF: 'off',
} as const;

const constHTMLInputTypes = 
{
    EMAIL: 'email',
    PASSWORD: 'password',
    CHECKBOX: 'checkbox',
    COLOR: 'color',
    FILE: 'file'
} as const;

export type ActivateStatus = typeof constActivateStatus[keyof typeof constActivateStatus]
export type HTMLInputTypes = typeof constHTMLInputTypes[keyof typeof constHTMLInputTypes]

