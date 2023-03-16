/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */

type Nullable<T> = T | null
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
