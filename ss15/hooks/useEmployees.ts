import { useCallback, useEffect, useState } from "react";
import { Employee } from "../data/mockData";
import { CreateEmployeeRequest, employeeApi } from "../services/employeeService";

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getEmployees = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await employeeApi.getAll();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (e: any) {
      console.error("Lỗi khi tải danh sách nhân viên:", e);
      setError(e.message || "Có lỗi xảy ra khi tải danh sách nhân viên");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  const addEmployee = async (employee: CreateEmployeeRequest) => {
    try {
      setLoading(true);
      setError(null);
      const newEmployee = await employeeApi.create(employee);
      setEmployees((prev) => [...prev, newEmployee]);
      return newEmployee;
    } catch (e: any) {
      console.error("Lỗi khi thêm nhân viên:", e);
      setError(e.message || "Có lỗi xảy ra khi thêm nhân viên");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const updateEmployee = async (id: number, employee: CreateEmployeeRequest) => {
    try {
      setLoading(true);
      setError(null);
      const updatedEmployee = await employeeApi.update(id, employee);
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === id ? updatedEmployee : emp))
      );
      return updatedEmployee;
    } catch (e: any) {
      console.error("Lỗi khi cập nhật nhân viên:", e);
      setError(e.message || "Có lỗi xảy ra khi cập nhật nhân viên");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await employeeApi.delete(id);
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (e: any) {
      console.error("Lỗi khi xóa nhân viên:", e);
      setError(e.message || "Có lỗi xảy ra khi xóa nhân viên");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const getEmployeeById = (id: number): Employee | undefined => {
    return employees.find((emp) => emp.id === id);
  };

  const getEmployeeByIdFromServer = async (id: number): Promise<Employee | null> => {
    try {
      setLoading(true);
      setError(null);
      const employee = await employeeApi.getById(id);
      return employee;
    } catch (e: any) {
      console.error("Lỗi khi tải chi tiết nhân viên:", e);
      setError(e.message || "Có lỗi xảy ra khi tải chi tiết nhân viên");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    employees,
    loading,
    error,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById,
    getEmployeeByIdFromServer,
    refreshEmployees: getEmployees,
  };
};
