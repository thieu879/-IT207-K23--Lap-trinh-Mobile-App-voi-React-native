import { Employee, Gender } from "../data/mockData";
import { baseUrl } from "../utils/baseUrl";

export interface CreateEmployeeRequest {
  employeeCode: string;
  employeeName: string;
  phoneNumber: string;
  gender: Gender;
  dateBirth: string;
  positionId: number;
}

export interface UpdateEmployeeRequest extends CreateEmployeeRequest {
  id: number;
}

export const employeeApi = {
  getAll: async (): Promise<Employee[]> => {
    const response = await baseUrl.get("/employees");
    return response.data;
  },

  getById: async (id: number): Promise<Employee> => {
    const response = await baseUrl.get(`/employees/${id}`);
    return response.data;
  },

  create: async (employee: CreateEmployeeRequest): Promise<Employee> => {
    const response = await baseUrl.post("/employees", employee);
    return response.data;
  },

  update: async (id: number, employee: CreateEmployeeRequest): Promise<Employee> => {
    const response = await baseUrl.put(`/employees/${id}`, employee);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await baseUrl.delete(`/employees/${id}`);
  },
};
