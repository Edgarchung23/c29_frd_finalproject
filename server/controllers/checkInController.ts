import express, { Request, Response } from "express";
import { CheckInService } from "../services/checkInService";
import { LogisticService } from "../services/logisticsService";

export class CheckInController {
  router = express.Router();
  constructor(private checkInService: CheckInService, private logisticService: LogisticService) {
    this.router.get("/checkin", this.list);
    this.router.get("/inventory", this.inventory);

    this.router.get("/precheckin", this.precheckinlist);
    this.router.post("/checkin", this.create);
    this.router.put("/updatestatus",this.update)
  }

  inventory = async (req: Request, res: Response) => {
    // console.log("this is list", req.body);
    let list = await this.checkInService.getInventory();
    res.status(200).json({ data: list });
  }; 
  list = async (req: Request, res: Response) => {
    // console.log("this is list", req.body);
    let list = await this.checkInService.getAll();
    res.status(200).json({ data: list });
  };

  create = async (req: Request, res: Response) => {
    try {
      const {
        // item_image_path,
        logistic_item_id,
        // user_id,
        logistic_id,
        donate_item_id,
        goods_status
      } = req.body;

      console.log( {
        // item_image_path,
        logistic_item_id,
        // user_id,
        logistic_id,
        donate_item_id,
        goods_status
      })
      // Task: Update goods_status of logistic_items table
      await this.logisticService.updateGoods_status(logistic_item_id, goods_status);
      // Call the service method to add check-in
      const result = await this.checkInService.addCheckIn(
        // item_image_path,
        logistic_item_id,
        // user_id,
        logistic_id,
        donate_item_id,
        goods_status
      );

      // if (result) {
        return res.status(201).json({ message: "Check-in added successfully" });
      // } else {
        // return res.status(500).json({ message: "Failed to add check-in" });
      // }
    } catch (error) {
      console.error("Error adding check-in:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  precheckinlist = async (req: Request, res: Response) => {
    try {
      const { 
        user_id, 
        logistic_id, 
        donate_item_id 
    } = req.body;

      const result = await this.checkInService.getPreCheckIn( 
        user_id, 
        logistic_id, 
        donate_item_id );


      if (result) {
        return  res.status(200).json({ data: result });
       } else {
        return res
          .status(500)
          .json({ message: "internal server error,cannot insert new item" });
       }
        
    } catch (error) {
      console.error("Error adding check-in:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  update = async (req: Request, res:Response) => {
    try {
      

    } catch (error) {

    }
  }

}
