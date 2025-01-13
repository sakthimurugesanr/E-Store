 import {apiSlice} from './apiSlice'
 import {SERVER_URL} from "../features/constants"


 export const userApiSlice = apiSlice.injectEndpoints({

    endpoints:(builder)=>({
       login:builder.mutation({
        query:(data)=>({
            url:`${SERVER_URL}/auth`,
            method:'POST',
            body:data
        }),
       }),

       logout: builder.mutation({
        query:()=>({
            url:`${SERVER_URL}/logout`,
            method:'POST'
        }),
       }),

       register : builder.mutation({
        query :(data)=>({
            url : `${SERVER_URL}`,
            method:'POST',
            body:data

        }),

       }),

       profile:builder.mutation({
        query:(data)=>({

            url:`${SERVER_URL}/profile`, 
            method:'PUT',
            body:data,   
        })

       }),


       getAllusers:builder.query({
            query:()=>({
               url:SERVER_URL,  
            }),
            providesTags:['User'],
            keepUnusedDataFor:5,
       }),


    deleteUser:builder.mutation({
        query:userId =>({
        url:`${SERVER_URL}/${userId}`,
        method:'DELETE'
        })
    }),

    getUserDetailes:builder.query({
        query:(id)=>({
            url:`${SERVER_URL}/${id}`,
            keepUnusedDataFor:5,
        })
    }),
    updateUser:builder.mutation({
        query:data=>({
            url:`${SERVER_URL}/${data.userId}`,
            method:'PUT',
            body:data,
        }),
        invalidatesTags:['User'],
    })

    })
 
 })

 export const {useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useProfileMutation,
    useGetAllusersQuery,
    useDeleteUserMutation,
    useGetUserDetailesQuery,
    useUpdateUserMutation,
    
} = userApiSlice
