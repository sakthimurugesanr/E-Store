import { PRODUCT_URL,UPLOAD_URL } from "../features/constants";
import {apiSlice} from './apiSlice';


export const productApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getProducts:builder.query({
            query:({keyword})=>({
                url:`${PRODUCT_URL}`,
                params:{keyword}

            }),

            providesTags: ["Product"],
            keepUnusedDataFor:5
        }),
        getProductById:builder.query({
            query:(productId)=>`${PRODUCT_URL}/${productId}`,
            providesTags:(result,error,productId)=>[
                {type:"Product",id:productId},
            ],
        }),

        
        allProducts:builder.query({
            query:()=>`${PRODUCT_URL}/fetchAllproducts`
    }),

    getProductDetailes :builder.query({
        query:(productId)=>({
          url:`${PRODUCT_URL}/${productId}`,

        }),
        keepUnusedDataFor:5,
            
    }),
    createProduct:builder.mutation({
        query:(productData)=>({
            url:`${PRODUCT_URL}`,
            method:'POST',
            body:productData
        }),
        invalidatesTags:["Product"],
    }),

    updateProduct:builder.mutation({
        query:({productId,formData})=>({
            url:`${PRODUCT_URL}/${productId}`,
            method:'PUT',
            body:formData,

        })
    }),

    uploadProductImage:builder.mutation({
        query:(data)=>({
            url:`${UPLOAD_URL}`,
            method:'POST',
            body:data
        })

    }),
    deleteProduct:builder.mutation({
        query:(productId)=>({
            url:`${PRODUCT_URL}/${productId}`,
            method:'DELETE',
        }),
        providesTags:["Product"]
    }),

    createReview:builder.mutation({

        query:(data)=>({
            url:`${PRODUCT_URL}/${data.productId}/reviews`,
            method:'POST',
            body:data
        })
    }),
    getTopPRoducts:builder.query({
        query:()=>({
            url:`${PRODUCT_URL}/top`,
            keepUnusedDataFor:4,
        })
    }),
    getNewProducts:builder.query({
        query:()=>({
            url:`${PRODUCT_URL}/new`,
            keepUnusedDataFor:4,
        })
    }),
    getFilteredProducts:builder.query({
        query: ({checked,radio})=>({
            url:`${PRODUCT_URL}/filtered-products`,
            method:'POST',
            body:{checked,radio}
        })
    })

}),
}); 

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useAllProductsQuery,
    useGetProductDetailesQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductImageMutation,
    useDeleteProductMutation,
    useCreateReviewMutation,
    useGetTopPRoductsQuery,
    useGetFilteredProductsQuery,
    useGetNewProductsQuery
    
     
}=productApiSlice