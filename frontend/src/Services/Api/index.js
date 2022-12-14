import { url } from "../BaseURL";
import axiosApiInstance from "../Interceptor";

const user_login = async (data) => {
  return await axiosApiInstance.post(`${url}api/auth/login`, data);
};

const get_user_list = async (data) => {
  return await axiosApiInstance.get(`${url}api/admin/users`, data);
};

const upload_document = async (data) => {
  return await axiosApiInstance.post(`${url}api/admin/doc`, data);
};

const create_User = async (data) => {
  return await axiosApiInstance.post(`${url}api/auth/signup`, data);
};

const delete_User = async (data) => {
  return await axiosApiInstance.delete(`${url}api/admin/user/${data}`, data);
};

const update_User = async (id, data) => {
  return await axiosApiInstance.put(`${url}api/admin/updateUser/${id}`, data);
};

const list_docs = async (id) => {
  return await axiosApiInstance.get(`${url}api/admin/list-docs/${id}`);
};

const delete_document = async (id) => {
  return await axiosApiInstance.delete(`${url}api/admin/delete_doc/${id}`);
};

const total_doc = async () => {
  return await axiosApiInstance.get(`${url}api/admin/totaldoc`);
};

const download_doc = async (filename) => {
  return await axiosApiInstance.get(`http://127.0.0.1:8081/${filename}`);
};

export const _services = {
  user_login,
  get_user_list,
  upload_document,
  create_User,
  delete_User,
  update_User,
  list_docs,
  delete_document,
  total_doc,
  download_doc,
};
