type UseSortable = <T extends string[]>(columns: T) => {}

const useSortable: UseSortable = <T extends string[]>(columns: T) => {
  const sort = ref<Nullable<string>>(null)
  const sortDirection = ref<Nullable<string>>(null)

  const sortColumn = (column: keyof T): void => {
    if (sort.value === column)
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'

    else
      sortDirection.value = 'asc'
  }

  return {
    sort,
    sortDirection,
    sortColumn,
  }
}

export default useSortable
