import {
  createSelector,
  createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const listAdapter = createEntityAdapter({
  sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? -1 : 1
})

const initialState = listAdapter.getInitialState()

export const listApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getList: builder.query({
      query: () => '/list',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: responseData => {
        const loadedList = responseData.map(item => {
          item.id = item?._id
          return item
        })
        return listAdapter.setAll(initialState, loadedList)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'List', id: 'ITEM' },
            ...result.ids.map(id => ({ type: 'List', id }))
          ]
        } else return [{ type: 'List', id: 'ITEM' }]
      }
    }),
    addNewItem: builder.mutation({
      query: initialItem => ({
        url: '/list',
        method: 'POST',
        body: { ...initialItem }
      }),
      invalidatesTags: [
        { type: 'List', id: 'ITEM' }
      ]
    }),
    updateItem: builder.mutation({
      query: initialItem => ({
        url: '/list',
        method: 'PATCH',
        body: { ...initialItem }
      }),
      invalidatesTags: (result, err, arg) => [
        { type: 'List', id: arg.id }
      ]
    }),
    deleteItem: builder.mutation({
      query: ({ id }) => ({
        url: '/list',
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: (result, err, arg) => [
        { type: 'List', id: arg.id }
      ]
    }),
  }),
})

export const {
  useGetListQuery,
  useAddNewItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation
} = listApiSlice

// return the query result object
export const selectListResult = listApiSlice.endpoints.getList.select()

// creates memoized selector
const selectListData = createSelector(
  selectListResult,
  listResult => listResult.data // normalized state object with ids and entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllItems,
  selectById: selectItemById,
  selectIds: selectItemIds,
} = listAdapter.getSelectors(state => selectListData(state) ?? initialState)