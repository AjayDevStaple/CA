import { url } from '../BaseURL';
import axiosApiInstance from '../Interceptor';

const user_login = async (data) => {
    return await axiosApiInstance.post(`${url}api/auth/login`, data)
}


const get_user_list = async (data) => {

    return await axiosApiInstance.get(`${url}api/admin/users`, data)

}

const upload_document = async (data) => {
    return await axiosApiInstance.post(`${url}api/admin/doc`, data)
}

const create_User =  async(data) => {
    return await axiosApiInstance.post(`${url}api/auth/signup` , data)
}

const delete_User =  async(data) => {
    return await axiosApiInstance.delete(`${url}api/admin/user/${data}` , data)
}

// const posts = async (data) => {
//     return await axiosApiInstance.get(`${url}products`, data)
// }
// const postDetail = async (data) => {
//     return await axiosApiInstance.get(`${url}products/`+data)
// }

// const product_categories = async (data) => {
//     return await axiosApiInstance.get(`${url}products/categories/`)
// }

// const categories_products = async (data) => {
//     return await axiosApiInstance.get(`${url}products/category/`+data)
// }

export const _services = {
    user_login,
    get_user_list,
    upload_document,
    create_User,
    delete_User
    // posts,
    // postDetail,
    // product_categories,
    // categories_products
}