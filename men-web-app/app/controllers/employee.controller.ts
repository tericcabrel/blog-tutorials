import { Request, Response, NextFunction } from 'express';

import employeeModel from '../models/employee.model';

class EmployeeController {
  public async create(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { name, email, salary } = req.body;
      const employeData = new employeeModel({
        name,
        email,
        salary,
        created_at: new Date(),
        updated_at: new Date(),
      });
      const employee = await employeData.save();
      res.status(201).json(employee);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async all(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const employees = await employeeModel.find({}).sort('-created_at').exec();

      res.status(200).json(employees);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new EmployeeController();
