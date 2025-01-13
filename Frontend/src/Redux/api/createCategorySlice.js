import {apiSlice} from './apiSlice'
import {CATEGORY_URL} from "../features/constants"


export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createCateGory : builder.mutation({
            query:(newcategory)=>({
                url: CATEGORY_URL,
                method:'POST',
                body:newcategory
            }),

            }),
            updatedCategory: builder.mutation({
                query:({categoryId,updatedCategory})=>({
                    url:`${CATEGORY_URL}/${categoryId}`,
                    method:'PUT',
                    body:updatedCategory

                }),
            }),

            deleteCategory:builder.mutation({
                query:(categoryId)=>({
                    url:`${CATEGORY_URL}/${categoryId}`,
                    method:'DELETE',
                }),

            }),

            fetchCategories:builder.query({
                query:()=>({
                    url:`${CATEGORY_URL}/categories`,
                }),
            }),



    })
})


export const {useCreateCateGoryMutation,
    useUpdatedCategoryMutation,
    useDeleteCategoryMutation,
    useFetchCategoriesQuery,
} = categoryApiSlice